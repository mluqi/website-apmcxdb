import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

export interface AboutData {
  id: number;
  konten: string;
  image?: string | null;
}

interface AboutContextType {
  about: AboutData | null;
  loading: boolean;
  fetchAbout: () => Promise<void>;
  editAbout: (data: FormData) => Promise<boolean>;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export const AboutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAbout = async () => {
    setLoading(true);
    try {
      const res = await api.get("/about");
      setAbout(res.data);
    } catch {
      setAbout(null);
    } finally {
      setLoading(false);
    }
  };

  const editAbout = async (data: FormData) => {
    try {
      await api.put("/about", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchAbout();
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <AboutContext.Provider value={{ about, loading, fetchAbout, editAbout }}>
      {children}
    </AboutContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAbout = () => {
  const ctx = useContext(AboutContext);
  if (!ctx) throw new Error("useAbout must be used within AboutProvider");
  return ctx;
};