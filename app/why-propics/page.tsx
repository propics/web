import type { Metadata } from "next";
import { WhyPropicsPage } from "../components/why-propics-page";

export const metadata: Metadata = {
  title: "What is Propics? - Propics",
};

export default function Page() {
  return <WhyPropicsPage locale="en" />;
}
