'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const lanternVariants = {
    initial: {
        y: -20,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeOut" as const,
        }
    },
    exit: {
        y: -20,
        opacity: 0,
        transition: {
            duration: 0.5,
        }
    },
    swing: {
        rotate: [0, 2, -2, 2, -2, 0],
        transition: {
            duration: 4,
            ease: "easeInOut" as const,
            repeat: Infinity,
        }
    }
};

const glowVariants = {
    initial: {
        opacity: 0,
        scale: 0.8,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
            ease: "easeOut" as const,
        }
    },
    swing: {
        rotate: [0, 2, -2, 2, -2, 0],
        transition: {
            duration: 4,
            ease: "easeInOut" as const,
            repeat: Infinity,
        }
    },
    pulse: {
        opacity: [0.4, 0.6, 0.4],
        scale: [0.95, 1.05, 0.95],
        transition: {
            duration: 3,
            ease: "easeInOut" as const,
            repeat: Infinity,
        }
    }
};

export default function ThemeLanterns() {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentLantern = theme === 'dark' ? '/images/lanterns/hanging_lantern_dark_mode.png' : '/images/lanterns/hanging_lantern_light_mode.png';
    const showGlow = theme === 'dark';

    return (
        <div className="fixed top-[-1%] left-0 w-full h-0 z-0 pointer-events-none">
            {/* Container for lanterns */}
            <div className="relative w-full max-w-7xl mx-auto z-0">
                {/* Left Lantern - Hidden on mobile */}
                <motion.div
                    className="absolute left-[-5%] hidden md:block"
                    initial="initial"
                    animate={["animate", "swing"]}
                    exit="exit"
                    variants={lanternVariants}
                >
                    {showGlow && (
                        <motion.div
                            className="absolute top-[30%] left-[20%] -translate-x-1/2 w-40 h-40 rounded-full bg-amber-300/70 blur-xl"
                            initial="initial"
                            animate={["animate", "swing", "pulse"]}
                            variants={glowVariants}
                        />
                    )}
                    <Image
                        src={currentLantern}
                        alt="Decorative lantern"
                        width={200}
                        height={200}
                        className="transition-opacity duration-300 relative z-0"
                    />
                </motion.div>

                {/* Right Lantern - Hidden on mobile */}
                <motion.div
                    className="absolute right-[10%] hidden md:block"
                    initial="initial"
                    animate={["animate", "swing"]}
                    exit="exit"
                    variants={lanternVariants}
                >
                    {showGlow && (
                        <motion.div
                            className="absolute top-[10%]  -translate-x-1/2 w-24 h-24 rounded-full bg-amber-500/80 blur-xl"
                            initial="initial"
                            animate={["animate", "swing", "pulse"]}
                            variants={glowVariants}
                        />
                    )}
                    <Image
                        src={currentLantern}
                        alt="Decorative lantern"
                        width={100}
                        height={150}
                        className="transition-opacity duration-300 relative z-0"
                    />
                </motion.div>

                {/* Center Lantern - Shown only on mobile */}
                <motion.div
                    className="absolute left-[30%] -translate-x-1/2 md:hidden"
                    initial="initial"
                    animate={["animate", "swing"]}
                    exit="exit"
                    variants={lanternVariants}
                >
                    {showGlow && (
                        <motion.div
                            className="absolute top-[10%] -translate-x-1/2 w-20 h-20 rounded-full bg-amber-500/50 blur-xl"
                            initial="initial"
                            animate={["animate", "swing", "pulse"]}
                            variants={glowVariants}
                        />
                    )}
                    <Image
                        src={currentLantern}
                        alt="Decorative lantern"
                        width={80}
                        height={120}
                        className="transition-opacity duration-300 relative z-0"
                    />
                </motion.div>
            </div>
        </div>
    );
} 