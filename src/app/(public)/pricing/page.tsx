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
import PricingFAQSection from "./FAQsection";

export default function PricingPage() {
	return (
		<div>
			<PricingCards />
			<div className="container w-full mx-auto px-8 sm:px-0">
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

			<PricingFAQSection />
		</div>
	);
}
