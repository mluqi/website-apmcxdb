import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface KontakData {
  telepon: string;
  email: string;
  alamat: string;
  gmaps: string;
}

interface KontakContextType {
  kontak: KontakData | null;
  loading: boolean;
  fetchKontak: () => Promise<void>;
}

const KontakContext = createContext<KontakContextType | undefined>(undefined);

export const KontakProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [kontak, setKontak] = useState<KontakData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchKontak = async () => {
    setLoading(true);
    try {
      const res = await api.get("/kontak");
      setKontak(res.data);
    } catch {
      setKontak(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKontak();
  }, []);

  return (
    <KontakContext.Provider value={{ kontak, loading, fetchKontak }}>
      {children}
    </KontakContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useKontak = () => {
  const ctx = useContext(KontakContext);
  if (!ctx) throw new Error("useKontak must be used within KontakProvider");
  return ctx;
};
