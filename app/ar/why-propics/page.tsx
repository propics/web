import type { Metadata } from "next";
import { WhyPropicsPage } from "../../components/why-propics-page";

export const metadata: Metadata = {
  title: "ماهو بروبيكس؟ - بروبكس",
};

export default function Page() {
  return <WhyPropicsPage locale="ar" />;
}
