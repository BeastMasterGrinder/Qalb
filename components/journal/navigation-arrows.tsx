import * as motion from "motion/react-client"

interface NavigationArrowsProps {
    onNext: () => void;
    onPrevious: () => void;
    isFirst: boolean;
    isLast: boolean;
}

export function NavigationArrows({ onNext, onPrevious, isFirst, isLast }: NavigationArrowsProps) {
    const handleClick = (e: React.MouseEvent, handler: () => void) => {
        e.stopPropagation(); // Stop event from bubbling up to the backdrop
        handler();
    };

    return (
        <>
            <motion.button
                onClick={(e) => handleClick(e, onPrevious)}
                disabled={isFirst}
                className={`fixed left-4 md:left-8 top-1/2 p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg z-[60]
                    ${isFirst ? 'opacity-50 cursor-not-allowed hover:bg-blue-500' : ''}
                    transform active:scale-95`}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous entry"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                </svg>
            </motion.button>

            <motion.button
                onClick={(e) => handleClick(e, onNext)}
                disabled={isLast}
                className={`fixed right-4 md:right-8 top-1/2 p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg z-[60]
                    ${isLast ? 'opacity-50 cursor-not-allowed hover:bg-blue-500' : ''}
                    transform active:scale-95`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next entry"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                </svg>
            </motion.button>
        </>
    );
} 