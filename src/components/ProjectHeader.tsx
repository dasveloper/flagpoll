import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { api, type RouterOutputs } from "~/utils/api";
import { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";

type Project = RouterOutputs["project"]["getAll"][0];

const ProjectHeader = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { data: sessionData } = useSession();

  const { data: projects, refetch: refetchProjects } =
    api.project.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedProject(selectedProject ?? data[0] ?? null);
      },
    });

  const createTopic = api.project.create.useMutation({
    onSuccess: (d) => {
      setSelectedProject(d);
      void refetchProjects();
    },
  });

  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex w-full items-center gap-x-2 pr-2 sm:max-w-xs sm:pr-0">
        <select
          className="select-bordered select flex-1 py-0"
          disabled={projects?.length === 0}
          value={selectedProject?.id ?? 0}
          onChange={(e) => {
            const targetProject = projects?.find(
              (project: Project) => project.id === e.target.value
            );
            if (targetProject) {
              setSelectedProject(targetProject);
            }
          }}
        >
          <option disabled value="0">
            Select a project
          </option>
          {projects?.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        <div className="dropdown-end dropdown">
          <button className="btn-ghost btn-square btn-sm btn">
            <EllipsisVerticalIcon className="inline-block h-5 w-5 stroke-current" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Edit project</a>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  void NiceModal.show("project-modal").then((newProject) => {
                    createTopic.mutate(newProject);
                  })
                }
              >
                Create project
              </button>
            </li>
            <li>
              <a>Delete project</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-4">
        <button className="btn-primary btn-block btn">Create flag</button>
      </div>
    </div>
  );
};

export default ProjectHeader;
