"use client";

import { useEffect } from "react";
import LegalEntityForm from "./LegalEntityForm";
import { LegalEntity } from "@/types/legalEntity";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: LegalEntity) => void;
  initialData: LegalEntity | null;
  isLocked: boolean;
}

export default function LegalEntitySidebar({ open, onClose, onSave, initialData, isLocked }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "rgba(0,0,0,0.2)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 250ms ease-out",
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 50,
          width: "min(600px, 46vw)",
          height: "100%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: open ? "transform 250ms ease-out" : "transform 200ms ease-in",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid #F0F0F0",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#111" }}>
            Legal Entity
          </span>
          <button
            onClick={onClose}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "#999",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 150ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F5F5F5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            ✕
          </button>
        </div>

        {/* Locked disclaimer */}
        {isLocked && (
          <div
            style={{
              flexShrink: 0,
              margin: "16px 20px 0",
              backgroundColor: "#FFF7ED",
              border: "1px solid #FED7AA",
              borderRadius: "10px",
              padding: "12px 14px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "16px", flexShrink: 0 }}>🔒</span>
            <p style={{ fontSize: "12.5px", color: "#92400E", margin: 0, lineHeight: "1.5" }}>
              This entity is linked to orders and cannot be edited. Register a new account or contact support.
            </p>
          </div>
        )}

        {/* Form takes the remaining height */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <LegalEntityForm
            key={open ? "open" : "closed"}
            initialData={initialData}
            onSave={onSave}
            onCancel={onClose}
            isLocked={isLocked}
          />
        </div>
      </div>
    </>
  );
}
