import { type NextPage } from "next";
import FlagList from "~/components/dashboard/FlagList";
import ProjectHeader from "~/components/dashboard/ProjectHeader";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "~/components/dashboard/Loader";
import Layout from "~/components/common/Layout";
import ApiKey from "~/components/dashboard/ApiKey";

const ProjectPage: NextPage = () => {
  const router = useRouter();

  const { projectId } = router.query as { projectId: string };

  const { data: project, isLoading: projectLoading } =
    api.project.getById.useQuery(
      { id: projectId },
      {
        enabled: Boolean(projectId),
      }
    );

  useEffect(() => {
    // Redirect if project not found
    if (!project && !projectLoading) {
      void router.push("/dashboard");
    }
  }, [projectLoading, project, router]);

  if (projectLoading || !project) return <Loader />;

  return (
    <Layout>
      <div className="my-6" />
      <ProjectHeader projectId={projectId} />
      <div className="my-6" />
      <ApiKey apiKey={project.apiKey} />
      <div className="my-6" />
      <FlagList projectId={projectId} />
    </Layout>
  );
};

export default ProjectPage;
