import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Papa from "papaparse";
import { Upload, FileText } from "lucide-react";
import type { TriviaItem } from "@/types/trivia";

interface Props {
  onDataLoaded: (items: TriviaItem[]) => void;
}

const UploadScreen = ({ onDataLoaded }: Props) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as Record<string, string>[];
          if (!data.length || !data[0].Domain || !data[0].Question || !data[0].Answer) {
            setError("CSV must have columns: Domain, Question, Answer");
            return;
          }
          const items: TriviaItem[] = data.map((row, i) => ({
            id: i,
            domain: row.Domain?.trim() ?? "",
            question: row.Question?.trim() ?? "",
            answer: row.Answer?.trim() ?? "",
            isCompleted: false,
          }));
          onDataLoaded(items);
        },
        error: () => setError("Failed to parse CSV file."),
      });
    },
    [onDataLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
            Trivia Game Show
          </h1>
          <p className="text-muted-foreground">Upload your CSV to get started</p>
        </motion.div>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`glass-card flex cursor-pointer flex-col items-center gap-4 p-12 transition-all duration-300 ${
            dragOver ? "gold-border-glow border-primary" : "hover:border-primary/40"
          }`}
        >
          <motion.div
            animate={{ y: dragOver ? -4 : 0 }}
            className="rounded-full bg-primary/10 p-4"
          >
            {dragOver ? (
              <FileText className="h-8 w-8 text-primary" />
            ) : (
              <Upload className="h-8 w-8 text-primary" />
            )}
          </motion.div>
          <div>
            <p className="font-medium text-foreground">
              Drop your CSV here or click to browse
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Columns: Domain, Question, Answer
            </p>
          </div>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
            }}
          />
        </label>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default UploadScreen;
