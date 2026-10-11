import { TrialPage } from "../../components/simple-pages";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  return <TrialPage locale="ar" initialType={type} />;
}
