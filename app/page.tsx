"use client";

import { useState } from "react";
import LegalEntitySidebar from "@/components/LegalEntitySidebar";
import LegalEntityCard from "@/components/LegalEntityCard";
import { LegalEntity } from "@/types/legalEntity";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [entity, setEntity] = useState<LegalEntity | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const handleSave = (data: LegalEntity) => {
    setEntity(data);
    setSidebarOpen(false);
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#E8E6DF", padding: "48px 32px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "560px", flex: 1 }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "20px 24px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#BABABA", fontWeight: 500, marginBottom: "16px" }}>
            Legal Entity
          </div>
          {entity ? (
            <LegalEntityCard entity={entity} onEdit={() => setSidebarOpen(true)} isLocked={isLocked} />
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                height: "42px",
                padding: "0 20px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#FF622B",
                color: "white",
                fontSize: "13.5px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 150ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E5551F"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FF622B"; }}
            >
              Add Legal Entity
            </button>
          )}
        </div>

        {entity && (
          <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => setIsLocked((v) => !v)}
              style={{
                height: "34px",
                padding: "0 14px",
                borderRadius: "8px",
                border: `1px solid ${isLocked ? "#FECACA" : "#E8E8E8"}`,
                backgroundColor: isLocked ? "#FEF2F2" : "white",
                color: isLocked ? "#DC2626" : "#777",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 150ms",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isLocked ? "#FCA5A5" : "#CCC";
                e.currentTarget.style.color = isLocked ? "#B91C1C" : "#333";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isLocked ? "#FECACA" : "#E8E8E8";
                e.currentTarget.style.color = isLocked ? "#DC2626" : "#777";
              }}
            >
              <span>{isLocked ? "🔒" : "🔓"}</span>
              {isLocked ? "Unlock Entity" : "Lock Entity"}
            </button>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", paddingBottom: "8px" }}>
        <button
          onClick={() => { setEntity(null); setIsLocked(false); setSidebarOpen(false); }}
          style={{
            height: "34px",
            padding: "0 16px",
            borderRadius: "8px",
            border: "1px solid #D8D6CF",
            backgroundColor: "transparent",
            color: "#999",
            fontSize: "12px",
            cursor: "pointer",
            transition: "border-color 150ms, color 150ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#BBB"; e.currentTarget.style.color = "#555"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D8D6CF"; e.currentTarget.style.color = "#999"; }}
        >
          Reset prototype
        </button>
      </div>

      <LegalEntitySidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSave={handleSave}
        initialData={entity}
        isLocked={isLocked}
      />
    </main>
  );
}
