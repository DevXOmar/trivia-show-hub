import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";
import type { TriviaItem } from "@/types/trivia";

interface Props {
  domain: string;
  items: TriviaItem[];
  onBack: () => void;
  onSelectQuestion: (item: TriviaItem) => void;
  onReset: () => void;
}

const QuestionsView = ({ domain, items, onBack, onSelectQuestion, onReset }: Props) => {
  const sorted = [...items].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6 md:p-10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-primary">{domain}</h1>
              <p className="text-sm text-muted-foreground">{items.length} questions</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              whileHover={{ scale: item.isCompleted ? 1 : 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectQuestion(item)}
              className={`glass-card group relative p-5 text-left transition-all duration-300 ${
                item.isCompleted
                  ? "opacity-50"
                  : "hover:gold-glow hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-foreground line-clamp-3">
                  {item.question}
                </p>
                {item.isCompleted && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionsView;
