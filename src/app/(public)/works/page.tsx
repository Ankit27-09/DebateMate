import React from 'react'
import {
  motion,
} from "framer-motion";

function HowItWorksPage() {

    return (
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-4">
                Simple Process
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                How DebateMate Works
              </h2>
              <p className="text-xl text-gray-600">
                Our platform makes it easy to practice, learn, and improve your
                debate skills
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Choose a Topic",
                  description:
                    "Select from our library of debate topics or create your own custom topic.",
                },
                {
                  step: "02",
                  title: "Debate the AI",
                  description:
                    "Engage in a real-time debate with our advanced AI opponent that adapts to your style.",
                },
                {
                  step: "03",
                  title: "Get Feedback",
                  description:
                    "Receive detailed analysis and personalized tips to improve your performance.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-2xl p-8 shadow-lg"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mt-6 mb-4 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
    )
}

export default HowItWorksPage
