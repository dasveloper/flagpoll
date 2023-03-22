import { type NextPage } from "next";
import Head from "next/head";
import Nav from "~/components/Nav";
import FlagList from "~/components/FlagList";
import ProjectHeader from "~/components/ProjectHeader";

const ProjectPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-base-100">
        <div className="mx-auto max-w-6xl px-4">
          <Nav />
          <div className="my-6" />
          <ProjectHeader />
          <div className="my-6" />
          <FlagList />
        </div>
      </main>
    </>
  );
};

export default ProjectPage;
