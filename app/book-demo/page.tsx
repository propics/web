import { pageSeo } from "../../lib/seo";
export const metadata = pageSeo("book-demo", "en");
import { BookDemoPage } from "../components/book-demo-page";
export default function BookDemo() {
  return <BookDemoPage locale="en" />;
}
