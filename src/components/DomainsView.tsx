import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { TriviaItem } from "@/types/trivia";

interface Props {
  items: TriviaItem[];
  onSelectDomain: (domain: string) => void;
  onReset: () => void;
}

const DomainsView = ({ items, onSelectDomain, onReset }: Props) => {
  const domains = [...new Set(items.map((i) => i.domain))];

  const getStats = (domain: string) => {
    const domainItems = items.filter((i) => i.domain === domain);
    const completed = domainItems.filter((i) => i.isCompleted).length;
    return { total: domainItems.length, completed };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6 md:p-10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Game Domains</h1>
            <p className="mt-1 text-muted-foreground">Select a category to begin</p>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, i) => {
            const { total, completed } = getStats(domain);
            const allDone = completed === total;
            return (
              <motion.button
                key={domain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectDomain(domain)}
                className={`glass-card group relative overflow-hidden p-6 text-left transition-all duration-300 hover:gold-glow hover:border-primary/50 ${
                  allDone ? "opacity-60" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <h2 className="relative text-lg font-semibold text-foreground">{domain}</h2>
                <div className="relative mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${(completed / total) * 100}%` }}
                      transition={{ delay: i * 0.07 + 0.3, duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {completed}/{total}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default DomainsView;
