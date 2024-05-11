import Layout from "../components/layout/Layout";
import { MenteeMenu } from "../components/layout/MenteeMenu";

export default function MenteeConfigurePage() {
  return (
    <Layout title=" Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <MenteeMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start">
          <h1 className="font-bold text-xl">Mentee Profile Configure</h1>
        </div>
      </div>
    </Layout>
  );
}
