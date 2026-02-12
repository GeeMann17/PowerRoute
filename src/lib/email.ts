import { Resend } from 'resend'
import { formatPrice } from './pricing'
import type { JobType } from '@/types/database'
import { jobTypeOptions } from '@/types/leads'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@example.com'
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

/**
 * Escape a string for safe insertion into HTML.
 * Prevents HTML injection / XSS in email templates.
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function getJobTypeLabel(jobType: JobType): string {
  return jobTypeOptions.find((jt) => jt.value === jobType)?.label || jobType
}

// ============================================================
// Customer Confirmation Email
// ============================================================

interface LeadConfirmationParams {
  to: string
  name: string
  jobType: JobType
  quoteLow: number
  quoteHigh: number
}

export async function sendLeadConfirmationEmail(params: LeadConfirmationParams) {
  if (!resend) {
    console.log('Resend not configured, skipping confirmation email')
    return
  }

  const { to, name, jobType, quoteLow, quoteHigh } = params

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Your IT Logistics Estimate from PowerRoute`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #e2e8f0; background: #0f172a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e293b; padding: 24px; text-align: center; border-radius: 12px 12px 0 0; border-bottom: 2px solid #3b82f6; }
            .header h1 { margin: 0; font-size: 22px; color: #f8fafc; letter-spacing: -0.5px; }
            .header .subtitle { color: #94a3b8; font-size: 14px; margin-top: 4px; }
            .content { background: #1e293b; padding: 24px; border-radius: 0 0 12px 12px; }
            .quote-box { background: #0f172a; border: 1px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
            .quote-label { margin: 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
            .quote-amount { font-size: 28px; font-weight: 700; color: #3b82f6; margin: 8px 0 0; }
            .detail-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
            .detail-table td { padding: 10px 0; border-bottom: 1px solid #334155; font-size: 14px; }
            .detail-table .label { color: #94a3b8; width: 40%; }
            .detail-table .value { color: #e2e8f0; font-weight: 500; }
            .steps { margin: 20px 0; }
            .step { display: flex; align-items: flex-start; margin-bottom: 12px; }
            .step-num { background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; font-size: 12px; font-weight: 700; line-height: 24px; margin-right: 12px; flex-shrink: 0; }
            .step-text { color: #cbd5e1; font-size: 14px; }
            .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>PowerRoute</h1>
              <div class="subtitle">IT Logistics Estimate</div>
            </div>
            <div class="content">
              <p style="color: #e2e8f0;">Hi ${escapeHtml(name)},</p>
              <p style="color: #cbd5e1;">Thank you for requesting an IT logistics estimate from PowerRoute. Based on the details you provided, here is your preliminary cost range:</p>

              <div class="quote-box">
                <p class="quote-label">Estimated Cost Range</p>
                <p class="quote-amount">${formatPrice(quoteLow)} &ndash; ${formatPrice(quoteHigh)}</p>
              </div>

              <table class="detail-table">
                <tr>
                  <td class="label">Service Type</td>
                  <td class="value">${getJobTypeLabel(jobType)}</td>
                </tr>
              </table>

              <h3 style="color: #f8fafc; font-size: 16px; margin-top: 24px;">What Happens Next</h3>
              <div class="steps">
                <div class="step">
                  <div class="step-num">1</div>
                  <div class="step-text">A PowerRoute logistics coordinator will review your scope within 2 business hours</div>
                </div>
                <div class="step">
                  <div class="step-num">2</div>
                  <div class="step-text">We will match you with certified vendor partners specializing in your job type</div>
                </div>
                <div class="step">
                  <div class="step-num">3</div>
                  <div class="step-text">You will receive a detailed proposal with full chain of custody documentation</div>
                </div>
              </div>

              <p style="color: #94a3b8; font-size: 14px;">Have questions? Call us at <strong style="color: #e2e8f0;">${PHONE_NUMBER}</strong></p>

              <center>
                <a href="tel:${PHONE_NUMBER}" class="cta-button">Call PowerRoute</a>
              </center>
            </div>
            <div class="footer">
              <p>PowerRoute | R2 Certified Partners | NAID AAA | SOC 2 Type II</p>
              <p>This email was sent because you requested an IT logistics estimate.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Confirmation email sent to', to, 'ID:', data?.id)
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
    throw error
  }
}

// ============================================================
// Admin Notification Email
// ============================================================

interface AdminNotificationParams {
  leadId: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  jobType: JobType
  quoteLow: number
  quoteHigh: number
  vendorMatched?: string | null
}

export async function sendAdminNotificationEmail(params: AdminNotificationParams) {
  if (!resend) {
    console.log('Resend not configured, skipping admin notification')
    return
  }

  const { leadId, name, email, phone, company, jobType, quoteLow, quoteHigh, vendorMatched } = params

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Lead: ${escapeHtml(name)} - ${getJobTypeLabel(jobType)} - ${formatPrice(quoteLow)}-${formatPrice(quoteHigh)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e293b; color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .header h1 { margin: 0; font-size: 18px; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 12px 12px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 12px 0; }
            .info-table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
            .info-table .label { font-weight: 600; color: #64748b; width: 140px; }
            .info-table .value { color: #1e293b; }
            .vendor-badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; }
            .no-vendor { display: inline-block; background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; }
            .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New PowerRoute Lead</h1>
            </div>
            <div class="content">
              <table class="info-table">
                <tr><td class="label">Lead ID</td><td class="value">${escapeHtml(leadId)}</td></tr>
                <tr><td class="label">Name</td><td class="value">${escapeHtml(name)}</td></tr>
                <tr><td class="label">Company</td><td class="value">${escapeHtml(company || 'Not provided')}</td></tr>
                <tr><td class="label">Email</td><td class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
                <tr><td class="label">Phone</td><td class="value">${escapeHtml(phone || 'Not provided')}</td></tr>
                <tr><td class="label">Job Type</td><td class="value">${getJobTypeLabel(jobType)}</td></tr>
                <tr><td class="label">Estimate</td><td class="value">${formatPrice(quoteLow)} &ndash; ${formatPrice(quoteHigh)}</td></tr>
                <tr>
                  <td class="label">Vendor Match</td>
                  <td class="value">
                    ${vendorMatched
                      ? `<span class="vendor-badge">${escapeHtml(vendorMatched)}</span>`
                      : '<span class="no-vendor">No match found</span>'
                    }
                  </td>
                </tr>
              </table>

              <center>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/leads/${leadId}" class="cta-button">View Lead Details</a>
              </center>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Admin notification email sent, ID:', data?.id)
  } catch (error) {
    console.error('Failed to send admin notification email:', error)
    throw error
  }
}

// ============================================================
// Vendor Notification Email
// ============================================================

interface VendorNotificationParams {
  vendorEmail: string
  vendorName: string
  leadId: string
  customerName: string
  jobType: JobType
  quoteLow: number
  quoteHigh: number
  originZip: string
  destinationZip?: string | null
}

export async function sendVendorNotificationEmail(params: VendorNotificationParams) {
  if (!resend) {
    console.log('Resend not configured, skipping vendor notification')
    return
  }

  const { vendorEmail, vendorName, customerName, jobType, quoteLow, quoteHigh, originZip, destinationZip } = params

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: vendorEmail,
      subject: `PowerRoute Lead Assignment: ${getJobTypeLabel(jobType)} - ${escapeHtml(originZip)}${destinationZip ? ` to ${escapeHtml(destinationZip)}` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e293b; color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 12px 12px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 12px 0; }
            .info-table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
            .info-table .label { font-weight: 600; color: #64748b; width: 140px; }
            .urgent { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 12px; margin: 16px 0; font-size: 14px; color: #92400e; }
            .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Lead Assignment from PowerRoute</h1>
            </div>
            <div class="content">
              <p>Hi ${escapeHtml(vendorName)},</p>
              <p>A new lead has been assigned to you based on your capabilities and service area.</p>

              <table class="info-table">
                <tr><td class="label">Job Type</td><td class="value">${getJobTypeLabel(jobType)}</td></tr>
                <tr><td class="label">Customer</td><td class="value">${escapeHtml(customerName)}</td></tr>
                <tr><td class="label">Origin ZIP</td><td class="value">${escapeHtml(originZip)}</td></tr>
                ${destinationZip ? `<tr><td class="label">Destination ZIP</td><td class="value">${escapeHtml(destinationZip)}</td></tr>` : ''}
                <tr><td class="label">Estimated Range</td><td class="value">${formatPrice(quoteLow)} &ndash; ${formatPrice(quoteHigh)}</td></tr>
              </table>

              <div class="urgent">
                Please respond to this lead within <strong>4 business hours</strong> to maintain your response time score.
              </div>

              <p>Contact PowerRoute at <strong>${PHONE_NUMBER}</strong> for questions about this assignment.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Vendor notification email sent to', vendorEmail, 'ID:', data?.id)
  } catch (error) {
    console.error('Failed to send vendor notification email:', error)
    throw error
  }
}
