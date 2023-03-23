import { type NextPage } from "next";
import Head from "next/head";
import Hero from "~/components/home/Hero";
import Demo from "~/components/home/Demo";
import Layout from "~/components/common/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Hero />
        <div className="my-16" />
        <Demo />
      </Layout>
    </>
  );
};

export default Home;
