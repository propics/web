import { pageSeo } from "../../../lib/seo";
export const metadata = pageSeo("book-demo", "ar");
import { BookDemoPage } from "../../components/book-demo-page";
export default function BookDemoAr() {
  return <BookDemoPage locale="ar" />;
}
