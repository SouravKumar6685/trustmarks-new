import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Industry } from "@/types/industry";
import { getIndustries, supabase, isSupabaseConfigured } from "@/lib/supabase";

interface IndustriesContextValue {
  industries: Industry[];
  loading: boolean;
  error: string | null;
  refreshIndustries: () => Promise<void>;
}

const IndustriesContext = createContext<IndustriesContextValue>({
  industries: [],
  loading: true,
  error: null,
  refreshIndustries: async () => {},
});

export const IndustriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndustriesData = useCallback(async () => {
    try {
      setError(null);
      const data = await getIndustries();
      setIndustries(data);
    } catch (err: any) {
      console.error("Failed to load industries in IndustriesContext:", err);
      setError(err?.message || "Failed to load industries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIndustriesData();

    if (!isSupabaseConfigured) return;

    // Realtime Postgres Subscription for global syncing across tabs & clients
    const channel = supabase
      .channel("industries-global-sync")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "industries",
        },
        (payload) => {
          console.log("[Supabase Realtime] Industries table changed:", payload.eventType);
          fetchIndustriesData();
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("[Supabase Realtime] Subscribed to industries channel");
        }
      });

    const handleFocus = () => {
      fetchIndustriesData();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      supabase.removeChannel(channel);
    };
  }, [fetchIndustriesData]);

  return (
    <IndustriesContext.Provider
      value={{
        industries,
        loading,
        error,
        refreshIndustries: fetchIndustriesData,
      }}
    >
      {children}
    </IndustriesContext.Provider>
  );
};

export const useIndustries = (): IndustriesContextValue => {
  const context = useContext(IndustriesContext);
  if (!context) {
    throw new Error("useIndustries must be used within an IndustriesProvider");
  }
  return context;
};
