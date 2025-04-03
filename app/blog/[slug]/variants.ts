export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
        duration: 0.5,
        ease: "easeOut"
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
        }
    }
};