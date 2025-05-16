import Features from "@/components/landing/features";
import Image from "next/image";

export default function FeaturesPage() {
  return (
    <div className="bg-muted flex flex-col justify-center items-center">
      <div className="container px-4 pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Our Features</h1>
          <p className="text-lg sm:text-xl text-muted-foreground px-2">
            Discover how DebateMate can transform your debate skills with our
            comprehensive feature set.
          </p>
        </div>
      </div>
      <Features />

      <section className="py-12 sm:py-16 md:py-20 bg-muted w-full flex flex-col justify-center items-center">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
              How It Works
            </h2>

            <div className="space-y-8 sm:space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video bg-background rounded-lg flex items-center justify-center shadow-md">
                    <Image
                      src="https://picsum.photos/seed/HOW_IT_WORKS_1/800/400"
                      alt="Record Your Practice"
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <h3 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-4">
                    Record Your Practice
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Upload a video or audio recording of your debate practice,
                    or use our built-in recorder to capture your performance in
                    real-time.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video bg-background rounded-lg flex items-center justify-center shadow-md">
                    <Image
                      src="https://picsum.photos/seed/HOW_IT_WORKS_2/800/400"
                      alt="AI Analysis"
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <h3 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-4">
                    AI Analysis
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Our advanced AI analyzes your content, delivery, body
                    language, and argumentation structure to identify strengths
                    and areas for improvement.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video bg-background rounded-lg flex items-center justify-center shadow-md">
                    <Image
                      src="https://picsum.photos/seed/HOW_IT_WORKS_3/800/400"
                      alt="Personalized Feedback"
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <h3 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-4">
                    Personalized Feedback
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
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