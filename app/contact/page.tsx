import { pageSeo } from "../../lib/seo";
export const metadata = pageSeo("contact", "en");
import { ContactPage } from "../components/simple-pages";
export default function Page() {
  return <ContactPage locale="en" />;
}
