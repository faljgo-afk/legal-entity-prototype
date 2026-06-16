import { LegalEntity } from "@/types/legalEntity";

const EU_STATE_NAMES: Record<string, string> = {
  AT: "Austria", BE: "Belgium", BG: "Bulgaria", CY: "Cyprus", CZ: "Czechia",
  DE: "Germany", DK: "Denmark", EE: "Estonia", ES: "Spain", FI: "Finland",
  FR: "France", GR: "Greece", HR: "Croatia", HU: "Hungary", IE: "Ireland",
  IT: "Italy", LT: "Lithuania", LU: "Luxembourg", LV: "Latvia", MT: "Malta",
  NL: "Netherlands", PL: "Poland", PT: "Portugal", RO: "Romania", SE: "Sweden",
  SI: "Slovenia", SK: "Slovakia",
};

interface Props {
  entity: LegalEntity;
  onEdit: () => void;
}

export default function LegalEntityCard({ entity, onEdit }: Props) {
  const vatLine =
    entity.vatEnabled && entity.memberStateCode
      ? [
          `${entity.memberStateCode} – ${EU_STATE_NAMES[entity.memberStateCode] ?? entity.memberState}`,
          entity.vatNumber,
        ]
          .filter(Boolean)
          .join(" · ")
      : null;

  const addressParts = [entity.street, entity.city];
  if (entity.region) addressParts.push(entity.region);
  addressParts.push(entity.postalCode);
  const addressLine = addressParts.join(", ");

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "16px 20px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
        width: "440px",
        maxWidth: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "1px" }}>🏢</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#111",
              marginBottom: vatLine || addressLine ? "5px" : 0,
            }}
          >
            {entity.legalName}
          </div>
          {vatLine && (
            <div style={{ fontSize: "12.5px", color: "#666", marginBottom: "3px" }}>
              {vatLine}
            </div>
          )}
          {addressLine && (
            <div style={{ fontSize: "12.5px", color: "#666" }}>{addressLine}</div>
          )}
        </div>
        <button
          onClick={onEdit}
          style={{
            flexShrink: 0,
            height: "30px",
            padding: "0 12px",
            borderRadius: "8px",
            border: "1px solid #E8E8E8",
            backgroundColor: "white",
            color: "#777",
            fontSize: "12px",
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
          Edit
        </button>
      </div>
    </div>
  );
}
