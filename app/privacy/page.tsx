import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "../components/legal-page";

export const metadata: Metadata = legalMetadata("privacy", "en");

export default function Page() {
  return <LegalPage locale="en" kind="privacy" />;
}
