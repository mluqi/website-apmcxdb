import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

export interface LocationHotspot {
  id: number;
  nama: string;
  lat: number;
  long: number;
  alamat: string;
}

interface LocationHotspotContextType {
  locations: LocationHotspot[];
  loading: boolean;
  fetchLocations: () => Promise<void>;
  addLocation: (data: Omit<LocationHotspot, "id">) => Promise<boolean>;
  updateLocation: (
    id: number,
    data: Omit<LocationHotspot, "id">
  ) => Promise<boolean>;
  deleteLocation: (id: number) => Promise<boolean>;
}

const LocationHotspotContext = createContext<
  LocationHotspotContextType | undefined
>(undefined);

export const LocationHotspotProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [locations, setLocations] = useState<LocationHotspot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await api.get("/lokasi-hotspot");
      setLocations(res.data);
    } catch {
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const addLocation = async (data: Omit<LocationHotspot, "id">) => {
    try {
      await api.post("/lokasi-hotspot", data);
      await fetchLocations();
      return true;
    } catch {
      return false;
    }
  };

  const updateLocation = async (
    id: number,
    data: Omit<LocationHotspot, "id">
  ) => {
    try {
      await api.put(`/lokasi-hotspot/${id}`, data);
      await fetchLocations();
      return true;
    } catch {
      return false;
    }
  };

  const deleteLocation = async (id: number) => {
    try {
      await api.delete(`/lokasi-hotspot/${id}`);
      await fetchLocations();
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <LocationHotspotContext.Provider
      value={{
        locations,
        loading,
        fetchLocations,
        addLocation,
        updateLocation,
        deleteLocation,
      }}
    >
      {children}
    </LocationHotspotContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLocationHotspot = () => {
  const ctx = useContext(LocationHotspotContext);
  if (!ctx)
    throw new Error(
      "useLocationHotspot must be used within LocationHotspotProvider"
    );
  return ctx;
};
