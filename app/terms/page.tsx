import { pageSeo } from "../../lib/seo";
export const metadata = pageSeo("terms", "en");
import { LegalPage } from "../components/legal-page";


export default function Page() {
  return <LegalPage locale="en" kind="terms" />;
}
