import { pageSeo } from "../../../lib/seo";
export const metadata = pageSeo("blog", "ar");
import { BlogPage } from "../../components/simple-pages";
export default function Page() {
  return <BlogPage locale="ar" />;
}
