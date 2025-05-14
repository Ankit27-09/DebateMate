"use client"

import { useState, useEffect, useCallback } from "react"
import { Star } from "lucide-react"
import {Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription} from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Debate Team Captain, Stanford University",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "DebateMate transformed our team's performance. The AI opponent provides realistic practice scenarios, and the detailed feedback helped us identify and fix weaknesses in our arguments.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "High School Debate Coach",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "I've been coaching debate for 15 years, and DebateMate is the most innovative tool I've seen. My students have shown remarkable improvement in their critical thinking and rebuttal skills.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Law Student",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As a law student, articulating clear arguments is essential. DebateMate helped me refine my reasoning and anticipate counterarguments, which has been invaluable in moot court competitions.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Okafor",
    role: "Public Speaking Coach",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The personalized roadmap feature is exceptional. It identified specific areas where my clients needed improvement and provided targeted exercises that yielded noticeable results.",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>();
  const [emblaThumbsApi, setEmblaThumbsApi] = useState<CarouselApi>();

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);

      const autoplayPlugin = emblaMainApi.plugins().autoplay;
      if (autoplayPlugin) {
        autoplayPlugin.stop();
        autoplayPlugin.play();
      }
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    const autoplayPlugin = emblaMainApi.plugins().autoplay;
    if (autoplayPlugin) {
      autoplayPlugin.stop();
      autoplayPlugin.play();
    }
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    const autoplayPlugin = emblaMainApi.plugins().autoplay;
    if (autoplayPlugin) {
      autoplayPlugin.play();
    }
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <section
      id={"hero-section"}
      className="grid-cols-1 px-0 py-0 md:px-0 md:py-0 lg:px-0 lg:py-0"
    >
      <Carousel
        className="h-full w-full"
        opts={{ align: "center", loop: true,  active: true }}
        plugins={[Autoplay({ delay: 2000, playOnInit: false })]}
        setApi={setEmblaMainApi}
      >
        <CarouselContent className="mb-4 h-full w-full items-stretch">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="relative flex h-full w-full items-center basis-1/2"
            >
              <TestimonialCard {...testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        opts={{ align: "center", containScroll: "keepSnaps", dragFree: true }}
        setApi={setEmblaThumbsApi}
      >
        <CarouselContent className="w-full container max-w-md mx-auto">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "group relative h-full w-full transform-gpu transition-all hover:cursor-pointer basis-1/4 flex items-center",
                selectedIndex == index
                  ? "grayscale-0"
                  : "grayscale-100",
              )}
              onClick={() => onThumbClick(index)}
            >
              <Avatar className="size-10">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${testimonial.name}&size=64&background=random`} alt={testimonial.name} />
              </Avatar>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
  </section>
  )
}

const TestimonialCard = (testimonial : typeof testimonials[0]) =>(
  <Card  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
    <CardHeader className="flex items-center gap-4 mb-6">
        <Avatar className="size-12">
        <AvatarImage
          src={`https://ui-avatars.com/api/?name=${testimonial.name}&size=64&background=random`}
          alt={testimonial.name}
        />
        </Avatar>
      <div>
        <CardTitle className="font-bold text-lg text-gray-900">{testimonial.name}</CardTitle>
        <CardDescription className="text-gray-600 text-sm">{testimonial.role}</CardDescription>
      </div>
    </CardHeader>

    <CardContent className="text-gray-700 mb-6 italic">{testimonial.content}</CardContent>

    <CardFooter className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </CardFooter>
  </Card>
)
