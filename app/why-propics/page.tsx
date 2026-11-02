import { pageSeo } from "../../lib/seo";
export const metadata = pageSeo("why-propics", "en");
import { WhyPropicsPage } from "../components/why-propics-page";


export default function Page() {
  return <WhyPropicsPage locale="en" />;
}
