"use client";

import { useState } from "react";
import LegalEntitySidebar from "@/components/LegalEntitySidebar";
import LegalEntityCard from "@/components/LegalEntityCard";
import { LegalEntity } from "@/types/legalEntity";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [entity, setEntity] = useState<LegalEntity | null>(null);

  const handleSave = (data: LegalEntity) => {
    setEntity(data);
    setSidebarOpen(false);
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#E8E6DF", padding: "32px" }}>
      {entity ? (
        <LegalEntityCard entity={entity} onEdit={() => setSidebarOpen(true)} />
      ) : (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            height: "42px",
            padding: "0 20px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#111",
            color: "white",
            fontSize: "13.5px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 150ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#2A2A2A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#111";
          }}
        >
          Add Legal Entity
        </button>
      )}

      <LegalEntitySidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSave={handleSave}
        initialData={entity}
      />
    </main>
  );
}
