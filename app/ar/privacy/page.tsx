import { pageSeo } from "../../../lib/seo";
export const metadata = pageSeo("privacy", "ar");
import { LegalPage } from "../../components/legal-page";


export default function Page() {
  return <LegalPage locale="ar" kind="privacy" />;
}
