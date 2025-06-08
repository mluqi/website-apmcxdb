import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

export interface Layanan {
  id: number;
  title: string;
  konten: string;
  image: string | null;
  button_text: string;
  button_link: string;
}

interface LayananContextType {
  layanan: Layanan[];
  loading: boolean;
  fetchLayanan: () => Promise<void>;
  updateLayanan: (id: number, data: FormData) => Promise<boolean>;
}

const LayananContext = createContext<LayananContextType | undefined>(undefined);

export const LayananProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLayanan = async () => {
    setLoading(true);
    try {
      const res = await api.get("/layanan");
      setLayanan(res.data);
    } catch {
      setLayanan([]);
    } finally {
      setLoading(false);
    }
  };

  const updateLayanan = async (id: number, data: FormData) => {
    try {
      await api.put(`/layanan/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchLayanan();
      return true;
    } catch (error) {
      console.error("Failed to update layanan:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchLayanan();
  }, []);

  return (
    <LayananContext.Provider
      value={{ layanan, loading, fetchLayanan, updateLayanan }}
    >
      {children}
    </LayananContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLayanan = () => {
  const ctx = useContext(LayananContext);
  if (!ctx) throw new Error("useLayanan must be used within LayananProvider");
  return ctx;
};
