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

export const ErrorVibrateAnimation = (props) => {
  return (
    <>
      {props.showAnimation ? (
        <AnimatePresence>
          <motion.div
            style={{ width: "100%" }}
            initial={{ y: 5, x: 0 }}
            animate={{ y: 2, x: 2 }}
            exit={{ y: 5, x: 0 }}
            transition={{ duration: 0.16, repeat: 1 }}
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
