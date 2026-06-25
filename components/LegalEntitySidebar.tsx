"use client";

import { useEffect, useRef } from "react";
import LegalEntityForm, { LegalEntityFormHandle } from "./LegalEntityForm";
import { LegalEntity } from "@/types/legalEntity";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: LegalEntity) => void;
  initialData: LegalEntity | null;
  isLocked: boolean;
}

export default function LegalEntitySidebar({ open, onClose, onSave, initialData, isLocked }: Props) {
  const formRef = useRef<LegalEntityFormHandle>(null);

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

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {!isLocked && (
              <button
                onClick={() => formRef.current?.fillTestData()}
                style={{
                  height: "28px",
                  padding: "0 10px",
                  borderRadius: "7px",
                  border: "1px solid #E8E8E8",
                  backgroundColor: "white",
                  color: "#888",
                  fontSize: "11.5px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "border-color 150ms, color 150ms",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#CCC";
                  e.currentTarget.style.color = "#333";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E8E8E8";
                  e.currentTarget.style.color = "#888";
                }}
              >
                Fill with test data
              </button>
            )}
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
              This entity is linked to existing orders and cannot be edited.
            </p>
          </div>
        )}

        {/* Form takes the remaining height */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <LegalEntityForm
            key={open ? "open" : "closed"}
            ref={formRef}
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
