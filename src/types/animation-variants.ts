export interface AnimationConfig {
  duration?: number;
  ease?: number[];
  delay?: number;
  stagger?: number;
}

export interface MotionVariants {
  hidden: object;
  visible: (custom?: AnimationConfig) => object;
}
