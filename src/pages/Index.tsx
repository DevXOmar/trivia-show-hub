import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import UploadScreen from "@/components/UploadScreen";
import DomainsView from "@/components/DomainsView";
import QuestionsView from "@/components/QuestionsView";
import QuestionModal from "@/components/QuestionModal";
import type { TriviaItem } from "@/types/trivia";

type View = "upload" | "domains" | "questions";

const Index = () => {
  const [items, setItems] = useState<TriviaItem[]>([]);
  const [view, setView] = useState<View>("upload");
  const [activeDomain, setActiveDomain] = useState<string>("");
  const [activeQuestion, setActiveQuestion] = useState<TriviaItem | null>(null);

  const handleDataLoaded = useCallback((data: TriviaItem[]) => {
    setItems(data);
    setView("domains");
  }, []);

  const handleSelectDomain = useCallback((domain: string) => {
    setActiveDomain(domain);
    setView("questions");
  }, []);

  const handleReset = useCallback(() => {
    setItems((prev) => prev.map((i) => ({ ...i, isCompleted: false })));
  }, []);

  const handleMarkCompleted = useCallback((id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isCompleted: true } : i))
    );
    setActiveQuestion(null);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {view === "upload" && (
          <UploadScreen key="upload" onDataLoaded={handleDataLoaded} />
        )}
        {view === "domains" && (
          <DomainsView
            key="domains"
            items={items}
            onSelectDomain={handleSelectDomain}
            onReset={handleReset}
          />
        )}
        {view === "questions" && (
          <QuestionsView
            key="questions"
            domain={activeDomain}
            items={items.filter((i) => i.domain === activeDomain)}
            onBack={() => setView("domains")}
            onSelectQuestion={setActiveQuestion}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeQuestion && (
          <QuestionModal
            key="modal"
            item={activeQuestion}
            onClose={() => setActiveQuestion(null)}
            onMarkCompleted={handleMarkCompleted}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
