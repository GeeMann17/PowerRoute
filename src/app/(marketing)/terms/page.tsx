import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | PowerRoute',
  description: 'PowerRoute terms of service — the agreement governing use of our IT logistics matching platform.',
}

export default function TermsPage() {
  return (
    <div className="bg-background">
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-hero-fg tracking-tight">
            Terms of Service
          </h1>
          <p className="text-hero-fg/70 mt-2">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-8 text-foreground/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Overview</h2>
              <p>
                PowerRoute (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) operates an IT logistics matching platform
                that connects businesses with pre-vetted IT logistics providers. By using our
                website and services, you agree to these Terms of Service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Service Description</h2>
              <p className="mb-3">
                PowerRoute is a matching service. We connect you with independent IT logistics
                providers based on your project requirements. We do not directly provide logistics
                services, and we are not a party to any agreement between you and a matched provider.
              </p>
              <p>
                Cost estimates provided through our platform are approximate and for informational
                purposes only. Final pricing is determined by the matched provider based on a
                detailed scope review.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">3. For Customers</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>There is no cost to you for using PowerRoute&apos;s matching service</li>
                <li>You are not obligated to hire any matched provider</li>
                <li>You agree to provide accurate project information so we can make quality matches</li>
                <li>Your contract for logistics services is directly with the provider, not with PowerRoute</li>
                <li>PowerRoute does not guarantee any specific outcome from provider engagements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">4. For Vendors</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Vendor accounts require approval before accessing the lead marketplace</li>
                <li>You agree to maintain current certifications as represented in your profile</li>
                <li>Lead purchases are non-refundable unless the lead information is materially inaccurate</li>
                <li>You agree to respond to matched leads within 4 business hours</li>
                <li>PowerRoute reserves the right to suspend or terminate vendor accounts for cause</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Payment Terms</h2>
              <p>
                Lead purchases are processed through Stripe. By purchasing a lead, you authorize
                the charge to your payment method on file. All payments are in US Dollars. Refund
                requests must be submitted within 7 business days of purchase and are subject to
                review.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Intellectual Property</h2>
              <p>
                All content on this website — including text, graphics, logos, and software — is
                the property of PowerRoute or its licensors and is protected by intellectual
                property laws. You may not copy, reproduce, or distribute our content without
                written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
              <p>
                PowerRoute provides a matching service and is not liable for the actions,
                performance, or failures of matched providers. Our total liability for any claim
                arising from use of our platform is limited to the amount you paid to PowerRoute
                in the 12 months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">8. Changes to These Terms</h2>
              <p>
                We may update these terms from time to time. Continued use of our platform after
                changes constitutes acceptance of the updated terms. We will notify registered
                users of material changes via email.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">9. Contact</h2>
              <p>
                For questions about these terms, contact us at{' '}
                <a href="mailto:legal@powerroute.com" className="text-primary underline underline-offset-2">
                  legal@powerroute.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
