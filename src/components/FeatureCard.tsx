import { motion } from "framer-motion"

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
    variants: any
    gradient: string
  }
  
export default  function FeatureCard({ icon, title, description, variants, gradient }: FeatureCardProps) {
    return (
      <motion.div
        variants={variants}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all"
      >
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    )
  }
  