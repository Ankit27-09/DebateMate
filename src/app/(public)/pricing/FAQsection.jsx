import FAQSection from "@/components/landing/faq-section";

const pricingFAQData = [
  {
    id: "pricing-1",
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit toward your next billing cycle.",
    icon: "FaExchangeAlt",
  },
  {
    id: "pricing-2",
    question: "Is there a free trial?",
    answer:
      "Yes, all plans come with a 14-day free trial. No credit card required to start.",
    icon: "FaClock",
  },
  {
    id: "pricing-3",
    question: "Do you offer discounts for educational institutions?",
    answer:
      "Yes, we offer special pricing for schools and universities. Contact our sales team for more information.",
    icon: "FaGraduationCap",
  },
  {
    id: "pricing-4",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    icon: "FaCreditCard",
  },
  {
    id: "pricing-5",
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
    icon: "FaRegCalendarTimes",
  },
];

const PricingFAQSection = () => {
  return (
    <FAQSection
      title="Pricing Questions"
      subtitle="Common questions about our pricing plans and billing."
      faqData={pricingFAQData}
    />
  );
};

export default PricingFAQSection;
