import { pageSeo } from "../../../lib/seo";
export const metadata = pageSeo("about-us", "ar");
import { AboutPage } from "../../components/about-page";
export default function AboutAr() {
  return <AboutPage locale="ar" />;
}
