import PricingCards from "@/components/landing/pricing-cards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { XIcon, CheckIcon } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="bg-muted">
      <PricingCards />
      <div className="container">
        <div className="mt-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Compare our pricing plans
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Find the plan that fits your needs and budget.
            </p>
          </div>
          <div className="overflow-x-auto mt-8 container max-w-5xl mx-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Features</TableHead>
                  <TableHead>Starter</TableHead>
                  <TableHead>Pro</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Enterprise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Users</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Storage</TableCell>
                  <TableCell>5 GB</TableCell>
                  <TableCell>50 GB</TableCell>
                  <TableCell>100 GB</TableCell>
                  <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Analytics</TableCell>
                  <TableCell>Basic</TableCell>
                  <TableCell>Advanced</TableCell>
                  <TableCell>Advanced</TableCell>
                  <TableCell>Advanced</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Custom Branding</TableCell>
                  <TableCell>
                    <XIcon className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    <CheckIcon className="w-4 h-4 fill-primary" />
                  </TableCell>
                  <TableCell>
                    <CheckIcon className="w-4 h-4 fill-primary" />
                  </TableCell>
                  <TableCell>
                    <CheckIcon className="w-4 h-4 fill-primary" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dedicated Support</TableCell>
                  <TableCell>
                    <XIcon className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    <XIcon className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    <CheckIcon className="w-4 h-4 fill-primary" />
                  </TableCell>
                  <TableCell>
                    <CheckIcon className="w-4 h-4 fill-primary" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SLA Uptime Guarantee</TableCell>
                  <TableCell>
                    <XIcon className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    <XIcon className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    <XIcon className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    <CheckIcon className="w-4 h-4 fill-primary" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <section className="py-20 bg-muted">
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
