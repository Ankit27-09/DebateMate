import Features from "@/components/landing/features";
import Image from "next/image";

export default function FeaturesPage() {
  return (
    <div className="bg-muted">
      <div className="container pt-24 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Features</h1>
          <p className="text-xl text-muted-foreground">
            Discover how DebateMate can transform your debate skills with our
            comprehensive feature set.
          </p>
        </div>
      </div>

      <Features />

      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              How It Works
            </h2>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <div className="relative aspect-video bg-background rounded-lg flex items-center justify-center">
                    <Image
                      src="https://picsum.photos/seed/HOW_IT_WORKS_1/800/400"
                      alt="Feature 1"
                      fill
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-medium mb-4">
                    Record Your Practice
                  </h3>
                  <p className="text-muted-foreground">
                    Upload a video or audio recording of your debate practice,
                    or use our built-in recorder to capture your performance in
                    real-time.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="md:w-1/2">
                  <div className="relative aspect-video bg-background rounded-lg flex items-center justify-center">
                    <Image
                      src="https://picsum.photos/seed/HOW_IT_WORKS_2/800/400"
                      alt="Feature 1"
                      fill
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-medium mb-4">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI analyzes your content, delivery, body
                    language, and argumentation structure to identify strengths
                    and areas for improvement.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <div className="relative aspect-video bg-background rounded-lg flex items-center justify-center">
                    <Image
                      src="https://picsum.photos/seed/HOW_IT_WORKS_3/800/400"
                      alt="Feature 1"
                      fill
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-medium mb-4">
                    Personalized Feedback
                  </h3>
                  <p className="text-muted-foreground">
                    Receive detailed feedback with specific suggestions for
                    improvement, tailored to your skill level and debate goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
