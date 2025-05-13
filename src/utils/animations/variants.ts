export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (custom?: any) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration || 0.6,
      ease: custom?.ease || [0.22, 1, 0.36, 1],
      delay: custom?.delay || 0,
    },
  }),
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: (custom?: any) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom?.stagger || 0.1,
      delayChildren: custom?.delay || 0,
    },
  }),
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom?: any) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration || 0.4,
      ease: custom?.ease || [0.22, 1, 0.36, 1],
    },
  }),
};
