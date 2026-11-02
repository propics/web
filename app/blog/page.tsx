import { pageSeo } from "../../lib/seo";
export const metadata = pageSeo("blog", "en");
import { BlogPage } from "../components/simple-pages";
export default function Page() {
  return <BlogPage locale="en" />;
}
