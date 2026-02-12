import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | PowerRoute',
  description: 'PowerRoute privacy policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-hero-fg tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-hero-fg/70 mt-2">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-8 text-foreground/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                When you request a quote or create a vendor account, we collect information you
                provide directly: your name, email address, phone number, company name, and details
                about your IT logistics project (job type, facility locations, asset counts, compliance
                requirements).
              </p>
              <p>
                We also collect standard usage data through cookies and analytics tools, including
                pages visited, time on site, and referring URLs. This helps us improve our service
                and marketing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To match you with qualified IT logistics providers based on your project requirements</li>
                <li>To generate cost estimates and facilitate provider introductions</li>
                <li>To communicate about your project status and matched providers</li>
                <li>To process vendor applications and manage vendor accounts</li>
                <li>To improve our platform, matching algorithms, and customer experience</li>
                <li>To send relevant service updates (you can opt out at any time)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Information Sharing</h2>
              <p className="mb-3">
                When we match you with a provider, we share your project details (job type, location,
                timeline, asset requirements) with the matched provider so they can prepare an accurate
                quote. We do not share your information with unrelated third parties for marketing purposes.
              </p>
              <p>
                We may share information with service providers who help us operate our platform
                (hosting, email delivery, payment processing, analytics), but only as necessary
                to provide our service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Data Security</h2>
              <p>
                We use industry-standard security measures to protect your information, including
                encrypted data transmission (TLS/SSL), secure database storage, access controls,
                and regular security reviews. Payment processing is handled by Stripe, a PCI-DSS
                Level 1 certified payment processor.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal retention requirements)</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Withdraw consent for data processing where consent is the basis</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Cookies</h2>
              <p>
                We use cookies for essential site functionality, analytics (Google Analytics / GTM),
                and to remember your preferences. You can manage cookie preferences through your
                browser settings. Disabling cookies may affect some site functionality.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Contact Us</h2>
              <p>
                For privacy-related questions or to exercise your rights, contact us at{' '}
                <a href="mailto:privacy@powerroute.com" className="text-primary underline underline-offset-2">
                  privacy@powerroute.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
