import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "~/components/Loader";
import NiceModal from "@ebay/nice-modal-react";
import Layout from "~/components/Layout";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const { data: projects, isLoading: projectsLoading } =
    api.project.getAll.useQuery();

  useEffect(() => {
    // Redirect to first project if exists
    if (projects?.[0]) {
      void router.push(`/dashboard/${projects[0].id}`);
    }
  }, [projects, router]);

  if (projectsLoading || projects?.[0]) return <Loader />;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="relative mt-4 block w-full rounded-lg border border-base-200 p-12 text-center">
          <h3 className="text-xl font-bold md:text-3xl">No projects found</h3>
          <p className="mt-2 text-gray-400 md:text-lg">
            Get started by creating a new project.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="btn-primary btn"
              onClick={() => void NiceModal.show("project-modal")}
            >
              New Project
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
