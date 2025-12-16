import { motion, AnimatePresence } from "framer-motion";
import styles from "./Toast.module.css";

export default function Toast({ message, open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
