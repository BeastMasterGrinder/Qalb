'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { NavigationArrows } from "./navigation-arrows";
import { JournalContent } from "./journal-content";
import { ModalHeader } from "./modal-header";

interface JournalModalProps {
    isOpen: boolean;
    onClose: () => void;
    sentence: string;
    sentiment: string;
    onNext: () => void;
    onPrevious: () => void;
    direction: 1 | -1;
    isFirst: boolean;
    isLast: boolean;
}

export function JournalModal({ 
    isOpen, 
    onClose, 
    sentence, 
    sentiment,
    onNext,
    onPrevious,
    direction,
    isFirst,
    isLast 
}: JournalModalProps) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        if (isOpen) {
            ref.current.showModal();
        }
        return () => ref.current?.close();
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    
                    <motion.dialog
                        ref={ref}
                        className="fixed !m-0 !p-0 bg-transparent w-full h-full flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative bg-background border rounded-lg shadow-lg w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw] max-w-2xl max-h-[90vh] overflow-hidden"
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ 
                                scale: 1, 
                                y: 0,
                                transition: { 
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 300
                                }
                            }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            
                            <NavigationArrows 
                                onNext={onNext}
                                onPrevious={onPrevious}
                                isFirst={isFirst}
                                isLast={isLast}
                            />
                
                            <ModalHeader onClose={onClose} />
                            
                            <AnimatePresence mode="wait" custom={direction}>
                                <JournalContent 
                                    sentence={sentence}
                                    sentiment={sentiment}
                                    direction={direction}
                                />
                            </AnimatePresence>
                        </motion.div>
                    </motion.dialog>
                </>
            )}
        </AnimatePresence>
    );
}