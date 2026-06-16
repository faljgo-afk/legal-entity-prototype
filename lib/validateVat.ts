export function validateVat(memberStateCode: string, vatNumber: string): boolean {
  const trimmed = vatNumber.trim();
  if (trimmed.length < 8) return false;
  return trimmed.toUpperCase().startsWith(memberStateCode.toUpperCase());
}

export function generateFakeViesData(memberStateCode: string, vatNumber: string) {
  const fakeName = `${memberStateCode.toUpperCase()} COMPANY ${vatNumber.slice(-4).toUpperCase()} S.R.O.`;
  const fakeAddress = `Testovací 1, 110 00 Praha 1`;
  return { name: fakeName, address: fakeAddress };
}
