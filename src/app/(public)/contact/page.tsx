"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";

const formSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	subject: z.string().min(1, { message: "Please select a subject." }),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoaded] = useState(true);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	async function onSubmit(values: FormValues) {
		setIsSubmitting(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			toast.success("Message sent!", {
				description: "We'll get back to you as soon as possible."
			});

			form.reset();
		} catch (err) {
			toast.error("Error", {
				description: "There was a problem sending your message. Please try again."
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="min-h-screen bg-accent pt-32 pb-20 flex flex-col items-center justify-center">
			<div className="w-full max-w-5xl px-4">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-foreground tracking-tight"
					style={{ letterSpacing: "-0.02em" }}
					id="contact-heading"
				>
					Contact Us
				</motion.h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
						transition={{ duration: 0.6 }}
						className="flex flex-col justify-center h-full"
					>
						<Card className="w-full h-full shadow-lg border-0 bg-background/90">
							<CardHeader className="pb-2">
								<CardTitle className="text-2xl font-bold text-foreground mb-2">
									Send us a message
								</CardTitle>
							</CardHeader>
							<Separator className="mb-4" />
							<CardContent>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-5"
										aria-labelledby="contact-heading"
									>
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input
															placeholder="Your name"
															className="rounded-xl p-4"
															aria-required="true"
															aria-label="Name"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder="your.email@example.com"
														className="rounded-xl p-4"
														aria-required="true"
														aria-label="Email"
														type="email"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="subject"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Subject</FormLabel>
												<Select
													onValueChange={field?.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="rounded-xl p-4">
															<SelectValue placeholder="Select a subject" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="general">General Inquiry</SelectItem>
														<SelectItem value="support">Technical Support</SelectItem>
														<SelectItem value="feedback">Feedback</SelectItem>
														<SelectItem value="partnership">Partnership</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="message"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Message</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Your message here..."
														className="rounded-xl p-4 min-h-[120px]"
														aria-required="true"
														aria-label="Message"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										type="submit"
										className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-5 font-semibold text-lg focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
										disabled={isSubmitting}
										aria-busy={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<svg
													className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													/>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													/>
												</svg>
												Sending...
											</>
										) : (
											"Send Message"
										)}
									</Button>
								</form>
							</Form>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex flex-col justify-center h-full"
					>
						<Card className="w-full h-full shadow-lg border-0 bg-background/90">
							<CardHeader className="pb-2">
								<CardTitle className="text-2xl font-bold text-foreground mb-2">
									Contact Information
								</CardTitle>
							</CardHeader>
							<Separator className="mb-4" />
							<CardContent>
								<div className="space-y-7">
									<div className="flex items-start gap-4">
										<MapPin className="h-6 w-6 text-indigo-600 mt-1" aria-hidden="true" />
										<div>
											<h3 className="font-semibold text-foreground">Address</h3>
											<p className="text-muted-foreground mt-1">
												123 Debate Street<br />San Francisco, CA 94103<br />United States
											</p>
										</div>
									</div>

									<div className="flex items-start gap-4">
										<Phone className="h-6 w-6 text-indigo-600 mt-1" aria-hidden="true" />
										<div>
											<h3 className="font-semibold text-foreground">Phone</h3>
											<p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
										</div>
									</div>

									<div className="flex items-start gap-4">
										<Mail className="h-6 w-6 text-indigo-600 mt-1" aria-hidden="true" />
										<div>
											<h3 className="font-semibold text-foreground">Email</h3>
											<p className="text-muted-foreground mt-1">info@debatemate.com</p>
										</div>
									</div>
								</div>

								<div className="mt-10">
									<h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
									<div className="space-y-1 text-muted-foreground text-sm">
										<p>Monday - Friday: 9:00 AM - 6:00 PM</p>
										<p>Saturday: 10:00 AM - 4:00 PM</p>
										<p>Sunday: Closed</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
			<Toaster richColors />
		</main>
	);
}
