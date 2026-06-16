"use client";

import { useState, useRef, CSSProperties } from "react";
import { LegalEntity } from "@/types/legalEntity";
import VatInput from "./VatInput";

const EU_MEMBER_STATES = [
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DE", name: "Germany" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "ES", name: "Spain" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GR", name: "Greece" },
  { code: "HR", name: "Croatia" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "LV", name: "Latvia" },
  { code: "MT", name: "Malta" },
  { code: "NL", name: "Netherlands" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "SE", name: "Sweden" },
  { code: "SI", name: "Slovenia" },
  { code: "SK", name: "Slovakia" },
];

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia",
  "Bosnia and Herzegovina", "Brazil", "Bulgaria", "Cambodia", "Canada", "Chile", "China",
  "Colombia", "Costa Rica", "Croatia", "Cyprus", "Czechia", "Denmark", "Ecuador", "Egypt",
  "Estonia", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala",
  "Hungary", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan",
  "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Luxembourg",
  "Malaysia", "Malta", "Mexico", "Moldova", "Montenegro", "Morocco", "Netherlands",
  "New Zealand", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Thailand",
  "Tunisia", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Venezuela", "Vietnam",
];

interface Props {
  initialData: LegalEntity | null;
  onSave: (data: LegalEntity) => void;
  onCancel: () => void;
}

export default function LegalEntityForm({ initialData, onSave, onCancel }: Props) {
  const [legalName, setLegalName] = useState(initialData?.legalName ?? "");
  const [registrationNumber, setRegistrationNumber] = useState(initialData?.registrationNumber ?? "");
  const [vatEnabled, setVatEnabled] = useState(initialData?.vatEnabled ?? false);
  const [memberStateCode, setMemberStateCode] = useState(initialData?.memberStateCode ?? "DE");
  const [vatNumber, setVatNumber] = useState(initialData?.vatNumber ?? "");
  const [otherTaxNumber, setOtherTaxNumber] = useState(initialData?.otherTaxNumber ?? "");
  const [country, setCountry] = useState(initialData?.country ?? "");
  const [street, setStreet] = useState(initialData?.street ?? "");
  const [city, setCity] = useState(initialData?.city ?? "");
  const [postalCode, setPostalCode] = useState(initialData?.postalCode ?? "");
  const [region, setRegion] = useState(initialData?.region ?? "");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [legalNameFlash, setLegalNameFlash] = useState(false);

  const legalNameRef = useRef<HTMLInputElement>(null);

  const handleUseName = (name: string) => {
    setLegalName(name);
    setErrors((p) => ({ ...p, legalName: false }));
    setLegalNameFlash(true);
    setTimeout(() => setLegalNameFlash(false), 1000);
    setTimeout(() => legalNameRef.current?.focus(), 50);
  };

  const handleSave = () => {
    const newErrors: Record<string, boolean> = {};
    if (!legalName.trim()) newErrors.legalName = true;
    if (!country) newErrors.country = true;
    if (!street.trim()) newErrors.street = true;
    if (!city.trim()) newErrors.city = true;
    if (!postalCode.trim()) newErrors.postalCode = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const memberState = EU_MEMBER_STATES.find((s) => s.code === memberStateCode);

    onSave({
      legalName: legalName.trim(),
      registrationNumber: registrationNumber.trim() || undefined,
      vatEnabled,
      memberState: vatEnabled ? memberState?.name : undefined,
      memberStateCode: vatEnabled ? memberStateCode : undefined,
      vatNumber: vatEnabled && vatNumber.trim() ? vatNumber.trim() : undefined,
      otherTaxNumber: otherTaxNumber.trim() || undefined,
      country,
      street: street.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      region: region.trim() || undefined,
    });
  };

  const fieldBase: CSSProperties = {
    width: "100%",
    backgroundColor: "#FAFAFA",
    border: "1px solid #EBEBEB",
    borderRadius: "9px",
    padding: "0 12px",
    height: "38px",
    fontSize: "13.5px",
    color: "#111",
    outline: "none",
  };

  const fieldError: CSSProperties = { ...fieldBase, borderColor: "#DC2626" };

  const selectBase: CSSProperties = {
    ...fieldBase,
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: "32px",
  };

  const selectError: CSSProperties = { ...selectBase, borderColor: "#DC2626" };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#111";
    e.target.style.boxShadow = "0 0 0 3px rgba(17,17,17,0.05)";
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = errors[e.target.name] ? "#DC2626" : "#EBEBEB";
    e.target.style.boxShadow = "none";
  };

  const sectionLabel: CSSProperties = {
    fontSize: "10.5px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#BABABA",
    marginBottom: "14px",
    fontWeight: 500,
  };

  const fieldLabel: CSSProperties = {
    fontSize: "12px",
    fontWeight: 500,
    color: "#666",
    display: "block",
    marginBottom: "5px",
  };

  const optionalTag: CSSProperties = {
    fontSize: "11px",
    color: "#C0C0C0",
  };

  const errorMsg: CSSProperties = {
    fontSize: "11px",
    color: "#DC2626",
    marginTop: "4px",
  };

  const divider = (
    <div style={{ height: "1px", backgroundColor: "#F0F0F0", margin: "4px 0" }} />
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>

        {/* ── Company ── */}
        <section style={{ marginBottom: "20px" }}>
          <div style={sectionLabel}>Company</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <label style={fieldLabel}>Legal Name</label>
              </div>
              <input
                ref={legalNameRef}
                type="text"
                value={legalName}
                onChange={(e) => {
                  setLegalName(e.target.value);
                  setErrors((p) => ({ ...p, legalName: false }));
                }}
                placeholder="Acme Inc."
                style={{
                  ...(errors.legalName ? fieldError : fieldBase),
                  animation: legalNameFlash ? "flashGreen 1s ease-out forwards" : undefined,
                }}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {errors.legalName && <div style={errorMsg}>Required</div>}
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <label style={fieldLabel}>Registration Number</label>
                <span style={optionalTag}>Optional</span>
              </div>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="Chamber of commerce or official company ID"
                style={fieldBase}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>
        </section>

        {divider}

        {/* ── Tax ── */}
        <section style={{ marginTop: "20px", marginBottom: "20px" }}>
          <div style={sectionLabel}>Tax</div>

          {/* EU VAT card */}
          <div
            style={{
              border: "1px solid #EBEBEB",
              borderRadius: "11px",
              overflow: "hidden",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                backgroundColor: "#FAFAFA",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#333" }}>
                EU VAT Number
              </span>
              {/* Toggle */}
              <button
                type="button"
                onClick={() => setVatEnabled((v) => !v)}
                style={{
                  width: "36px",
                  height: "20px",
                  borderRadius: "10px",
                  backgroundColor: vatEnabled ? "#111" : "#E0E0E0",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background-color 200ms",
                  padding: 0,
                  flexShrink: 0,
                }}
                aria-label={vatEnabled ? "Disable EU VAT" : "Enable EU VAT"}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "3px",
                    left: vatEnabled ? "19px" : "3px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    transition: "left 200ms",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                />
              </button>
            </div>

            {vatEnabled && (
              <div style={{ padding: "16px 14px", borderTop: "1px solid #F0F0F0" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={fieldLabel}>Member State</label>
                    <select
                      value={memberStateCode}
                      onChange={(e) => setMemberStateCode(e.target.value)}
                      style={selectBase}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    >
                      {EU_MEMBER_STATES.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.code} – {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={fieldLabel}>VAT Number</label>
                    <VatInput
                      memberStateCode={memberStateCode}
                      value={vatNumber}
                      onChange={setVatNumber}
                      onUseName={handleUseName}
                      legalName={legalName}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Tax Number */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <label style={fieldLabel}>Other Tax Number</label>
              <span style={optionalTag}>Optional</span>
            </div>
            <input
              type="text"
              value={otherTaxNumber}
              onChange={(e) => setOtherTaxNumber(e.target.value)}
              placeholder="Not validated — stored as-is on your invoices"
              style={fieldBase}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        </section>

        {divider}

        {/* ── Billing Address ── */}
        <section style={{ marginTop: "20px", paddingBottom: "4px" }}>
          <div style={sectionLabel}>Billing Address</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={fieldLabel}>Country</label>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setErrors((p) => ({ ...p, country: false }));
                }}
                style={errors.country ? selectError : selectBase}
                onFocus={onFocus}
                onBlur={onBlur}
              >
                <option value="">Select country…</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.country && <div style={errorMsg}>Required</div>}
            </div>

            <div>
              <label style={fieldLabel}>Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                  setErrors((p) => ({ ...p, street: false }));
                }}
                placeholder="123 Main St"
                style={errors.street ? fieldError : fieldBase}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {errors.street && <div style={errorMsg}>Required</div>}
            </div>

            {/* City + Postal Code side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={fieldLabel}>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setErrors((p) => ({ ...p, city: false }));
                  }}
                  placeholder="San Francisco"
                  style={errors.city ? fieldError : fieldBase}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                {errors.city && <div style={errorMsg}>Required</div>}
              </div>
              <div>
                <label style={fieldLabel}>Postal Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    setErrors((p) => ({ ...p, postalCode: false }));
                  }}
                  placeholder="94117"
                  style={errors.postalCode ? fieldError : fieldBase}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                {errors.postalCode && <div style={errorMsg}>Required</div>}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <label style={fieldLabel}>State / Region</label>
                <span style={optionalTag}>Optional</span>
              </div>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="California"
                style={fieldBase}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "14px 20px",
          borderTop: "1px solid #F0F0F0",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            height: "42px",
            borderRadius: "10px",
            border: "1px solid #E8E8E8",
            backgroundColor: "white",
            color: "#777",
            fontSize: "13.5px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "border-color 150ms, color 150ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#CCC";
            e.currentTarget.style.color = "#333";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E8E8E8";
            e.currentTarget.style.color = "#777";
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          style={{
            flex: 2,
            height: "42px",
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
          Save Entity
        </button>
      </div>
    </div>
  );
}
