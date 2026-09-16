import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Service } from "@/types/service";
import { getServices, supabase, isSupabaseConfigured } from "@/lib/supabase";

interface ServicesContextValue {
  services: Service[];
  loading: boolean;
  error: string | null;
  refreshServices: () => Promise<void>;
}

const ServicesContext = createContext<ServicesContextValue>({
  services: [],
  loading: true,
  error: null,
  refreshServices: async () => {},
});

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServicesData = useCallback(async () => {
    try {
      setError(null);
      const data = await getServices();
      setServices(data);
    } catch (err: any) {
      console.error("Failed to load services in ServicesContext:", err);
      setError(err?.message || "Failed to load services from Supabase");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServicesData();

    if (!isSupabaseConfigured) return;

    // Realtime Postgres Subscription for global syncing across all browsers & tabs
    const channel = supabase
      .channel("services-global-sync")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "services",
        },
        (payload) => {
          console.log("[Supabase Realtime] Services table changed:", payload.eventType);
          // Refetch fresh ordered list from Supabase
          fetchServicesData();
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("[Supabase Realtime] Subscribed to services channel");
        }
      });

    // Also re-verify on window focus
    const handleFocus = () => {
      fetchServicesData();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      supabase.removeChannel(channel);
    };
  }, [fetchServicesData]);

  return (
    <ServicesContext.Provider
      value={{
        services,
        loading,
        error,
        refreshServices: fetchServicesData,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextValue => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};
