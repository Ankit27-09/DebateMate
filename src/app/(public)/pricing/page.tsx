import PricingCards from "@/components/landing/pricing-cards";

export default function PricingPage() {
  return (
    <div className="pt-20">
      <PricingCards />
      <div className="container">
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Compare Plans</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-4 text-left">Feature</th>
                  <th className="py-4 px-4 text-center">Student</th>
                  <th className="py-4 px-4 text-center">Educator</th>
                  <th className="py-4 px-4 text-center">Institution</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Practice Sessions</td>
                  <td className="py-3 px-4 text-center">10/month</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">AI Feedback Quality</td>
                  <td className="py-3 px-4 text-center">Basic</td>
                  <td className="py-3 px-4 text-center">Advanced</td>
                  <td className="py-3 px-4 text-center">Enterprise</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Team Management</td>
                  <td className="py-3 px-4 text-center">-</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Analytics Dashboard</td>
                  <td className="py-3 px-4 text-center">Basic</td>
                  <td className="py-3 px-4 text-center">Advanced</td>
                  <td className="py-3 px-4 text-center">Enterprise</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Support</td>
                  <td className="py-3 px-4 text-center">Email</td>
                  <td className="py-3 px-4 text-center">Priority</td>
                  <td className="py-3 px-4 text-center">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-medium mb-2">
                  Can I switch plans later?
                </h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. If
                  you upgrade, you&apos;ll be charged the prorated difference.
                  If you downgrade, you&apos;ll receive credit toward your next
                  billing cycle.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-medium mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-muted-foreground">
                  Yes, all plans come with a 14-day free trial. No credit card
                  required to start.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-medium mb-2">
                  Do you offer discounts for educational institutions?
                </h3>
                <p className="text-muted-foreground">
                  Yes, we offer special pricing for schools and universities.
                  Contact our sales team for more information.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-medium mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers
                  for annual plans.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-medium mb-2">
                  Can I cancel my subscription?
                </h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You&apos;ll
                  continue to have access until the end of your current billing
                  period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
