"use client";

import AdminDashboardOverview from "@/components/modules/Dashboard/Admin/AdminDashboardOverview";
import { getMetaData } from "@/services/meta/meta.service";
import React, { useEffect, useState } from "react";
import AdminDashboardLoading from "./loading";

const AdminDashboardPage = () => {
  const [metaData, setMetaData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getMetaData();
      if (data) {
        setMetaData(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Dashboard page fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <AdminDashboardLoading />;
  }

  if (error || !metaData) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
        <p className="text-xl font-semibold text-muted-foreground animate-pulse">
          Failed to load dashboard data
        </p>
        <p className="text-sm text-destructive opacity-50">
          Please check your connection or try logging in again.
        </p>
        <button
          onClick={fetchData}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <AdminDashboardOverview data={metaData} />
    </div>
  );
};

export default AdminDashboardPage;