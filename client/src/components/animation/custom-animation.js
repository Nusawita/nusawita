import { motion, AnimatePresence } from "framer-motion";

export const ErrorBlinkingAnimation = (props) => {
  return (
    <>
      {props.showAnimation ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, repeat: 1 }}
            onAnimationComplete={props.onAnimationComplete}
          >
            {props.children}
          </motion.div>
        </AnimatePresence>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};
