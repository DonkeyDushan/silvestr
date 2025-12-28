import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { dataset2024, dataset2025 } from "data";
import { generatePages, PageType } from "utils";

const DATASETS: Record<string, any> = {
  "2024": dataset2024,
  "2025": dataset2025,
};

interface PageContextType {
  datasetId: string;
  pageIndex: number;
  pages: PageType[];
  currentPage: PageType;
  handlePageChange: (index: number) => void;
  dataset: any;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { datasetId = "2025" } = useParams<{ datasetId: string }>();
  const [searchParams] = useSearchParams();
  const pageIndex = parseInt(searchParams.get("p") || "0", 10);

  const dataset = DATASETS[datasetId] || dataset2025;

  useEffect(() => {
    if (DATASETS[datasetId]) {
      localStorage.setItem("lastDataset", datasetId);
    }
  }, [datasetId]);

  const pages = useMemo(() => generatePages(dataset), [dataset]);

  const currentPage = pages[pageIndex] || pages[0];

  const handlePageChange = useCallback(
    (index: number) => {
      if (index >= 0 && index < pages.length) {
        navigate(`/${datasetId}?p=${index}`);
      }
    },
    [datasetId, navigate, pages.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePageChange(pageIndex - 1);
      } else if (e.key === "ArrowRight") {
        handlePageChange(pageIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageIndex, handlePageChange]);

  const value = {
    datasetId,
    pageIndex,
    pages,
    currentPage,
    handlePageChange,
    dataset,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};
