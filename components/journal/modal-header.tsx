interface ModalHeaderProps {
    onClose: () => void;
}

export function ModalHeader({ onClose }: ModalHeaderProps) {
    return (
        <div className="relative p-6 border-b">
            <h3 className="text-xl font-semibold">Journal Entry</h3>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close dialog"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <path d="M4 4l8 8m0-8l-8 8" />
                </svg>
            </button>
        </div>
    );
} 