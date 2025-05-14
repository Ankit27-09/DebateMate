import { CaseStudy } from "@/components/landing/case-study";
import { TestimonialMarquee } from "@/components/landing/testimonials";

const caseStudies = [
  {
    title: "Westfield High School Debate Team",
    description: "National Champions 2023",
    content: (
      <>
        <p className="mb-4">
          The Westfield High School debate team went from regional competitors
          to national champions in just one season after implementing DebateMate
          into their training regimen.
        </p>
        <p className="mb-4">
          &quot;The personalized feedback and structured learning paths helped
          our students identify and overcome their weaknesses quickly. The
          real-time analysis during practice sessions was a game-changer.&quot;
          - Coach David Thompson
        </p>
        <p className="font-medium">Results:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Won 3 national tournaments</li>
          <li>Improved speaker scores by an average of 27%</li>
          <li>8 team members received college debate scholarships</li>
        </ul>
      </>
    ),
  },
  {
    title: "University of Cambridge Debate Society",
    description: "World Universities Debating Championship Finalists",
    content: (
      <>
        {" "}
        <p className="mb-4">
          The Cambridge Debate Society integrated DebateMate into their training
          program to prepare for the World Universities Debating Championship.
        </p>
        <p className="mb-4">
          &quot;DebateMate&apos;s AI analysis helped us refine our argumentation
          and delivery in ways that traditional coaching couldn&apos;t. The
          ability to get instant feedback on practice rounds was
          invaluable.&quot; - Team Captain
        </p>
        <p className="font-medium">Results:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Reached the finals of the World Championships</li>
          <li>Improved team coordination and response strategies</li>
          <li>Developed more effective rebuttal techniques</li>
        </ul>
      </>
    ),
  },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-muted">
      <div className="container pt-24 pb-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
          <p className="text-xl text-muted-foreground">
            Hear from students, educators, and institutions who have transformed
            their debate skills with DebateMate.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        {caseStudies.map((caseStudy) => (
          <CaseStudy key={caseStudy.title} {...caseStudy} />
        ))}
      </div>

      <section
        id="testimonials"
        className="relative z-10 h-[600px] w-full overflow-hidden rounded-lg border bg-background py-10"
      >
        <h2 className="mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
          And many more such stories
        </h2>
        <TestimonialMarquee />
      </section>
    </div>
  );
}
