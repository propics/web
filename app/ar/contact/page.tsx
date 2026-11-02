import { pageSeo } from "../../../lib/seo";
export const metadata = pageSeo("contact", "ar");
import { ContactPage } from "../../components/simple-pages";
export default function Page() {
  return <ContactPage locale="ar" />;
}
