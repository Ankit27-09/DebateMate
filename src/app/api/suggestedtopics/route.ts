import { NextResponse } from 'next/server';

export async function GET() {
  // This would ideally come from a database or external API
  // For now, we'll hardcode some interesting debate topics
  const topics = [
    {
      title: "Social Media and Mental Health",
      description: "Debate whether social media has a net positive or negative impact on mental health."
    },
    {
      title: "Universal Basic Income",
      description: "Should governments provide a universal basic income to all citizens?"
    },
    {
      title: "Remote Work vs. Office Work",
      description: "Is remote work better than traditional office work for productivity and well-being?"
    },
    {
      title: "Artificial Intelligence Regulations",
      description: "Should AI development be strictly regulated by governments?"
    },
    {
      title: "Climate Change Solutions",
      description: "Are individual actions or policy changes more effective in combating climate change?"
    },
    {
      title: "Educational Reform",
      description: "Should traditional education systems be reformed to focus less on standardized testing?"
    },
    {
      title: "Digital Privacy",
      description: "Should people sacrifice some privacy for better services and security?"
    },
    {
      title: "Space Exploration Funding",
      description: "Should nations prioritize space exploration over solving problems on Earth?"
    },
    {
      title: "Mandatory Vaccination",
      description: "Should vaccinations be mandatory for public school attendance?"
    },
    {
      title: "Nuclear Energy",
      description: "Is nuclear energy a good solution for climate change?"
    }
  ];

  return NextResponse.json({ topics });
}