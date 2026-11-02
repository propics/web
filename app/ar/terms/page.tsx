import { pageSeo } from "../../../lib/seo";
export const metadata = pageSeo("terms", "ar");
import { LegalPage } from "../../components/legal-page";


export default function Page() {
  return <LegalPage locale="ar" kind="terms" />;
}
