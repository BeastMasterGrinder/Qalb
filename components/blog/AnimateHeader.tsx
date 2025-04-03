import * as motion from "motion/react-client";

export default function AnimatedHeader() {
return (
    <div className="mb-8">
    <motion.h1 
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        Blog
    </motion.h1>
    <motion.p 
        className="text-xl text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
    >
        Explore our latest articles, updates, and insights
    </motion.p>
    </div>
);
}