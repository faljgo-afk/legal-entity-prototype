"use client";

import { useState, useEffect, useRef } from "react";
import { validateVat, generateFakeViesData } from "@/lib/validateVat";

type VatStatus = "idle" | "checking" | "verified" | "not-found";

interface ViesData {
  name: string;
  address: string;
}

interface Props {
  memberStateCode: string;
  value: string;
  onChange: (value: string) => void;
  onUseName?: (name: string) => void;
  legalName?: string;
}

export default function VatInput({ memberStateCode, value, onChange, onUseName, legalName }: Props) {
  const [status, setStatus] = useState<VatStatus>("idle");
  const [viesData, setViesData] = useState<ViesData | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const trimmed = value.trim();
    if (trimmed.length < 8) {
      setStatus("idle");
      setViesData(null);
      return;
    }

    setStatus("checking");
    timerRef.current = setTimeout(() => {
      const valid = validateVat(memberStateCode, trimmed);
      if (valid) {
        setStatus("verified");
        setViesData(generateFakeViesData(memberStateCode, trimmed));
      } else {
        setStatus("not-found");
        setViesData(null);
      }
    }, 800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, memberStateCode]);

  const borderColor = {
    idle: "#EBEBEB",
    checking: "#E0A800",
    verified: "#16A34A",
    "not-found": "#DC2626",
  }[status];

  const bgColor = {
    idle: "#FAFAFA",
    checking: "#FFFBEB",
    verified: "#F0FDF4",
    "not-found": "#FEF2F2",
  }[status];

  const nameMatches =
    legalName && viesData && legalName.trim() === viesData.name.trim();

  return (
    <div>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. DE123456789"
          style={{
            width: "100%",
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: "9px",
            padding: "0 36px 0 12px",
            height: "38px",
            fontSize: "13.5px",
            color: "#111",
            outline: "none",
          }}
          onFocus={(e) => {
            if (status === "idle") {
              e.target.style.borderColor = "#111";
              e.target.style.boxShadow = "0 0 0 3px rgba(17,17,17,0.05)";
            }
          }}
          onBlur={(e) => {
            if (status === "idle") {
              e.target.style.borderColor = "#EBEBEB";
              e.target.style.boxShadow = "none";
            }
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {status === "checking" && (
            <div
              style={{
                width: "14px",
                height: "14px",
                border: "2px solid #E0A800",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.6s linear infinite",
              }}
            />
          )}
          {status === "verified" && (
            <span style={{ color: "#16A34A", fontSize: "14px", fontWeight: 600 }}>✓</span>
          )}
          {status === "not-found" && (
            <span style={{ color: "#DC2626", fontSize: "13px", fontWeight: 600 }}>✕</span>
          )}
        </div>
      </div>

      {status === "verified" && viesData && (
        <div
          style={{
            marginTop: "8px",
            backgroundColor: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: "11px",
            padding: "12px 14px",
            animation: "viesCardIn 150ms ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span style={{ fontSize: "18px", flexShrink: 0 }}>🏢</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "13px", color: "#111" }}>
                {viesData.name}
              </div>
              <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>
                {viesData.address}
              </div>
              {!nameMatches && onUseName && (
                <button
                  type="button"
                  onClick={() => onUseName(viesData.name)}
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#16A34A",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontWeight: 500,
                  }}
                >
                  ↑ Use as Legal Name
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {status === "not-found" && (
        <div
          style={{
            marginTop: "8px",
            backgroundColor: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "11px",
            padding: "12px 14px",
            animation: "viesCardIn 150ms ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span>
            <div style={{ fontSize: "12.5px", color: "#DC2626", paddingTop: "1px" }}>
              VAT number not found in VIES. Check the number and member state.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
