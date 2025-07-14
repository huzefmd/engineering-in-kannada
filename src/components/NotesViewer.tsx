import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X, Loader2 } from "lucide-react";

interface NotesViewerProps {
  url: string;
  onClose: () => void;
}

export function NotesViewer({ url, onClose }: NotesViewerProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const rawUrl = url
          .replace("github.com", "raw.githubusercontent.com")
          .replace("/blob/", "/");

        const response = await fetch(rawUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError("Failed to load notes. Please try again later.");
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchContent();
    }
  }, [url]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-white dark:bg-gray-900 p-8 text-black dark:text-white">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
        <div className="text-center p-8 bg-red-500/10 rounded-xl border border-red-500/20 text-white dark:text-red-400">
          <p>{error}</p>
          <button
            onClick={onClose}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-dark dark:text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative h-[85vh] w-[95vw] max-w-5xl overflow-y-auto rounded-lg bg-white dark:bg-black/60 p-6 dark:text-white text-black scrollbar-thin">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-gray-200 dark:bg-white/10 p-2 hover:bg-gray-300 dark:hover:bg-white/20"
        >
          <X className="h-5 w-5 text-black dark:text-white" />
        </button>
        <div className=" prose dark:prose-invert max-w-none [&_*]:text-black dark:[&_*]:text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
