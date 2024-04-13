import Layout from "../components/layout/Layout";
import { useState } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <Layout search={search} setSearch={setSearch} title="Ecommerce Site">
      <h1>All Home Components will come here.Filter products : {search}</h1>
    </Layout>
  );
}
