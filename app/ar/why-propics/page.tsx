import { pageSeo } from "../../../lib/seo";
export const metadata = pageSeo("why-propics", "ar");
import { WhyPropicsPage } from "../../components/why-propics-page";


export default function Page() {
  return <WhyPropicsPage locale="ar" />;
}
