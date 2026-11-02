import { pageSeo } from "../../../lib/seo";
export const metadata = pageSeo("features", "ar");
import { FeaturesPage } from "../../components/features-page";
export default function FeaturesAr() {
  return <FeaturesPage locale="ar" />;
}
