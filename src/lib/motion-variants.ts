export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay
    }
  })
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay
    }
  })
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay
    }
  })
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay
    }
  })
};

export const hoverScale = {
  initial: {},
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
};

export const hoverTilt = {
  initial: {},
  hover: {
    rotate: 5,
    transition: {
      duration: 0.3
    }
  }
}; 