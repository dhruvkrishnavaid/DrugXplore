import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const Bottombar = () => {
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <div className="fixed justify-evenly bottom-0 md:hidden flex gap-4 w-full h-16 bg-white border-t border-gray-200">
      <div className="z-20 justify-evenly bottom-0 md:hidden flex gap-4 w-full h-16 bg-white border-t border-gray-200">
        <Link
          to="/app"
          onClick={() => setIsGenerateOpen(false)}
          className={`h-full w-min flex flex-col items-center justify-center transition-all duration-300 ${
            isActive("/app") && "text-primary font-extrabold"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
          </svg>
          Dashboard
        </Link>
        <Link
          to="/app/explore"
          onClick={() => setIsGenerateOpen(false)}
          className={`h-full w-min flex flex-col items-center justify-center transition-all duration-300 ${
            isActive("/app/explore") && "text-primary font-extrabold"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8.887 6.748c-.163 0 -.337 .016 -.506 .057c-.172 .041 -.582 .165 -.838 .562l-.014 .02l-.607 1.05c-.307 .205 -.534 .46 -.693 .717l-.014 .02l-2.572 4.65a4.009 4.009 0 0 0 -.274 .494l-.006 .01a3.99 3.99 0 0 0 -.363 1.672a4 4 0 0 0 8 0v-1h2v1a4 4 0 1 0 7.635 -1.67l-.004 -.012a4.008 4.008 0 0 0 -.274 -.494l-2.572 -4.65l-.014 -.02a2.337 2.337 0 0 0 -.693 -.716l-.607 -1.051l-.014 -.02c-.256 -.397 -.667 -.52 -.838 -.562a2.225 2.225 0 0 0 -.664 -.051a2.06 2.06 0 0 0 -.68 .156c-.184 .081 -.638 .327 -.754 .889l-.007 .037l-.14 1.1c-.22 .283 -.374 .64 -.374 1.064v1h-2v-1c0 -.424 -.154 -.781 -.373 -1.064l-.14 -1.1l-.008 -.037c-.116 -.562 -.57 -.808 -.754 -.889a2.06 2.06 0 0 0 -.68 -.156a2.374 2.374 0 0 0 -.158 -.006zm-1.887 7.252a2 2 0 1 1 -1.838 1.209l.19 -.342c.36 -.523 .964 -.867 1.648 -.867zm10 0c.684 0 1.288 .344 1.648 .867l.19 .342a2 2 0 1 1 -1.838 -1.209z" />
          </svg>
          Explore
        </Link>
        <Link
          to="/app/saved"
          onClick={() => setIsGenerateOpen(false)}
          className={`h-full w-min flex flex-col items-center justify-center transition-all duration-300 ${
            isActive("/app/saved") && "text-primary font-extrabold"
          }`}
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
            <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
            <path d="M12 12l8 -4.5" />
            <path d="M12 12l0 9" />
            <path d="M12 12l-8 -4.5" />
            <path d="M16 5.25l-8 4.5" />
          </svg>
          Saved
        </Link>
        <button
          onClick={() => setIsGenerateOpen(!isGenerateOpen)}
          className={`h-full cursor-pointer w-min flex flex-col items-center justify-center transition-all duration-300 ${
            (isGenerateOpen ||
              isActive("/app/generate/ayurveda") ||
              isActive("/app/generate/discovery") ||
              isActive("/app/generate/existing")) &&
            "text-primary font-extrabold"
          }`}
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
            className={`transform transition-transform duration-300 ${
              isGenerateOpen && "rotate-360"
            }`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
          </svg>
          <span>Generate</span>
        </button>
      </div>
      <AnimatePresence>
        {isGenerateOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0)" }}
              animate={{
                opacity: 100,
                backdropFilter: "blur(8px)",
                dur: 300,
              }}
              exit={{ opacity: 0, backdropFilter: "blur(0)" }}
              onClick={() => setIsGenerateOpen(!isGenerateOpen)}
              className="fixed z-10 bottom-16 left-0 w-full h-full bg-neutral-500/50"
            ></motion.div>
            <motion.div
              initial={{ y: 75, opacity: 0 }}
              animate={{ y: 0, opacity: 100, dur: 300 }}
              exit={{ y: 75, opacity: 0 }}
              className="fixed z-10 bottom-16 left-0 w-full rounded-t-3xl bg-white border-t border-gray-200"
            >
              <button
                type="button"
                onClick={() => setIsGenerateOpen(false)}
                className="absolute flex items-center justify-center p-2 text-red-500 rounded-full cursor-pointer right-4 top-4 bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300"
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
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
              <Link
                to="/app/generate/ayurveda"
                onClick={() => setIsGenerateOpen(false)}
                className={`h-16 w-full flex gap-2 items-center justify-center transition-all duration-300 ${
                  isActive("/app/generate/ayurveda") &&
                  "text-primary font-extrabold"
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 3a7 7 0 0 1 6.95 6.155a6.97 6.97 0 0 1 5.05 -2.155h3a1 1 0 0 1 1 1v1a7 7 0 0 1 -7 7h-2v4a1 1 0 0 1 -2 0v-7h-2a7 7 0 0 1 -7 -7v-2a1 1 0 0 1 1 -1z" />
                </svg>
                Ayurveda
              </Link>
              <Link
                to="/app/generate/discovery"
                onClick={() => setIsGenerateOpen(false)}
                className={`h-16 w-full flex gap-2 items-center justify-center transition-all duration-300 ${
                  isActive("/app/generate/discovery") &&
                  "text-primary font-extrabold"
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 3a7 7 0 0 1 6.95 6.155a6.97 6.97 0 0 1 5.05 -2.155h3a1 1 0 0 1 1 1v1a7 7 0 0 1 -7 7h-2v4a1 1 0 0 1 -2 0v-7h-2a7 7 0 0 1 -7 -7v-2a1 1 0 0 1 1 -1z" />
                </svg>
                Discovery
              </Link>
              <Link
                to="/app/generate/existing"
                onClick={() => setIsGenerateOpen(false)}
                className={`h-16 w-full flex gap-2 items-center justify-center transition-all duration-300 ${
                  isActive("/app/generate/existing") &&
                  "text-primary font-extrabold"
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20.207 3.793a5.95 5.95 0 0 1 0 8.414l-8 8a5.95 5.95 0 0 1 -8.414 -8.414l8 -8a5.95 5.95 0 0 1 8.414 0m-7 1.414l-4.294 4.293l5.586 5.586l4.294 -4.292a3.95 3.95 0 1 0 -5.586 -5.586" />
                </svg>
                Existing
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bottombar;
