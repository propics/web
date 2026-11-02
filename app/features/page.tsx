import { pageSeo } from "../../lib/seo";
export const metadata = pageSeo("features", "en");
import { FeaturesPage } from "../components/features-page";
export default function Features() {
  return <FeaturesPage locale="en" />;
}
