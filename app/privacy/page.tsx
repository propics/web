import { pageSeo } from "../../lib/seo";
export const metadata = pageSeo("privacy", "en");
import { LegalPage } from "../components/legal-page";


export default function Page() {
  return <LegalPage locale="en" kind="privacy" />;
}
