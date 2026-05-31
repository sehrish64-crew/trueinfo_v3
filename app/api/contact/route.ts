import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/mysql'
import { sendEmail } from '@/app/api/send-email/route'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const conn = await pool.getConnection()
    try {
      await conn.execute(
        'INSERT INTO contact_submissions (name, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [name, email, subject, message, 'new']
      )
    } finally {
      conn.release()
    }

    // Send confirmation email to user
    try {
      const userConfirmationEmail = `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #3b82f6;">✅ We Received Your Message</h2>
          <p>Hello ${name},</p>
          <p>Thank you for contacting us! We have successfully received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Your Message:</h3>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 8px 0;"><strong>Message:</strong></p>
            <p style="margin: 8px 0; color: #666; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">Our team typically responds within 24 hours. We appreciate your patience!</p>
          <p>Best Regards,<br/><strong>TrueInfoProvider Support Team</strong></p>
        </div>
      `
      
      await sendEmail(
        email,
        `We Received Your Message - ${subject}`,
        userConfirmationEmail
      )
      console.log('📧 Confirmation email sent to user:', email)
    } catch (userEmailError) {
      console.error('⚠️ Failed to send user confirmation email:', userEmailError)
    }

    // Send notification to admin
    try {
      const adminNotificationEmail = `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #2563eb; border-radius: 10px; background: #eff6ff;">
          <h2 style="color: #2563eb;">📧 New Contact Form Submission</h2>
          <p>A new contact form has been submitted.</p>
          
          <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #bfdbfe; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Submission Details:</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 8px 0;"><strong>Message:</strong></p>
            <p style="margin: 8px 0; color: #666; white-space: pre-wrap; padding: 10px; background: #f9f9f9; border-radius: 4px;">${message}</p>
          </div>
          
          <p style="margin-top: 20px; color: #1e40af; font-weight: bold;">⚠️ Action Required:</p>
          <p style="margin: 8px 0; color: #666;">Please review and respond to this inquiry as soon as possible.</p>
        </div>
      `
      
      const adminEmail = process.env.ADMIN_PAYMENT_EMAIL || 'trueinfoprovider.com@gmail.com'
      await sendEmail(
        adminEmail,
        `📧 New Contact Form Submission - ${subject}`,
        adminNotificationEmail
      )
      console.log('📧 Admin notification sent for contact form:', adminEmail)
    } catch (adminEmailError) {
      console.error('⚠️ Failed to send admin notification:', adminEmailError)
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

