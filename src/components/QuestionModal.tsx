import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { TriviaItem } from "@/types/trivia";

interface Props {
  item: TriviaItem;
  onClose: () => void;
  onMarkCompleted: (id: number) => void;
}

const QuestionModal = ({ item, onClose, onMarkCompleted }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card gold-glow relative z-10 w-full max-w-xl border-primary/30 p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
          {item.domain}
        </p>

        <motion.div layout>
          <p className="text-xl font-semibold text-foreground leading-relaxed">
            {item.question}
          </p>

          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-6 rounded-lg bg-primary/10 border border-primary/20 p-5">
                  <p className="text-lg text-foreground">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex gap-3">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              Reveal Answer
            </button>
          ) : !item.isCompleted ? (
            <button
              onClick={() => onMarkCompleted(item.id)}
              className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              Mark as Completed & Close
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Close
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionModal;
