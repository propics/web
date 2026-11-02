import { pageSeo } from "../../lib/seo";
export const metadata = pageSeo("about-us", "en");
import { AboutPage } from "../components/about-page";
export default function About() {
  return <AboutPage locale="en" />;
}
