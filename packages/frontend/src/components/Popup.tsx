import { motion } from "motion/react";

type PopupProps = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  hasButtons?: boolean;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
};

const Popup = ({
  children,
  title,
  onClose,
  hasButtons,
  primaryAction,
  secondaryAction,
}: PopupProps) => {
  return (
    <>
      <motion.button
        initial={{ opacity: 0, backdropFilter: "blur(0)" }}
        animate={{ opacity: 1, dur: 300, backdropFilter: "blur(8px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0)" }}
        onClick={onClose}
        className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-neutral-500/50"
      ></motion.button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100, dur: 300 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-4 w-full max-w-96 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex items-center justify-center p-2 text-red-500 rounded-full cursor-pointer bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <span className="text-xl font-bold">{title}</span>
          <div>{children}</div>
          {hasButtons && (
            <div className="flex justify-end gap-4 items-center">
              {secondaryAction && (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className="bg-tertiary/90 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-tertiary transition-colors duration-300"
                >
                  {secondaryAction?.label}
                </button>
              )}
              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="bg-secondary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary transition-colors duration-300"
                >
                  {primaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Popup;
