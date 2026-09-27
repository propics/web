import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "../../components/legal-page";

export const metadata: Metadata = legalMetadata("privacy", "ar");

export default function Page() {
  return <LegalPage locale="ar" kind="privacy" />;
}
