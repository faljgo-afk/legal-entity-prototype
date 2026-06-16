export type LegalEntity = {
  legalName: string;
  registrationNumber?: string;
  vatEnabled: boolean;
  memberState?: string;
  memberStateCode?: string;
  vatNumber?: string;
  otherTaxNumber?: string;
  country: string;
  street: string;
  city: string;
  postalCode: string;
  region?: string;
};
