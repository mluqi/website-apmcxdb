import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

export interface LandingContent {
  id: number;
  section: string;
  key_name: string;
  value: string;
  type: "text" | "image";
  sort_order: number;
}

interface PublicContextType {
  landingContent: LandingContent[];
  loading: boolean;
  fetchLandingContent: () => Promise<void>;
  updateLandingContent: (id: number, data: FormData) => Promise<boolean>;
}

const PublicContext = createContext<PublicContextType | undefined>(undefined);

export const PublicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [landingContent, setLandingContent] = useState<LandingContent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLandingContent = async () => {
    setLoading(true);
    try {
      const res = await api.get("/landing-content");
      setLandingContent(res.data);
    } catch {
      setLandingContent([]);
    } finally {
      setLoading(false);
    }
  };

  const updateLandingContent = async (id: number, data: FormData) => {
    try {
      await api.put(`/landing-content/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchLandingContent();
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchLandingContent();
  }, []);

  return (
    <PublicContext.Provider
      value={{
        landingContent,
        loading,
        fetchLandingContent,
        updateLandingContent,
      }}
    >
      {children}
    </PublicContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePublic = () => {
  const ctx = useContext(PublicContext);
  if (!ctx) throw new Error("usePublic must be used within PublicProvider");
  return ctx;
};
