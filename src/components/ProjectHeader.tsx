import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { api, type RouterOutputs } from "~/utils/api";
import { useMemo } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useRouter } from "next/router";

type Project = RouterOutputs["project"]["getAll"][0];

const ProjectHeader = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const { data: projects, refetch: refetchProjects } =
    api.project.getAll.useQuery();

  const currentProject: Project | null = useMemo(
    () => projects?.find((project) => project.id === projectId) ?? null,
    [projects, projectId]
  );

  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      void refetchProjects();
    },
  });

  const updateProject = api.project.update.useMutation({
    onSuccess: () => {
      void refetchProjects();
    },
  });

  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex w-full items-center gap-x-2 pr-2 sm:max-w-xs sm:pr-0">
        <select
          className="select-bordered select flex-1 py-0"
          disabled={projects?.length === 0}
          value={currentProject?.id}
          defaultValue="0"
          onChange={(e) => {
            void router.push(`/dashboard/${e.target.value}`);
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
          <button className="btn-ghost btn-sm btn-square btn">
            <EllipsisVerticalIcon className="inline-block h-5 w-5 stroke-current" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <button
                type="button"
                disabled={currentProject == null}
                onClick={() =>
                  void NiceModal.show("project-modal", {
                    project: currentProject,
                  }).then((updatedProject) => {
                    updateProject.mutate(updatedProject);
                  })
                }
              >
                Edit project
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  void NiceModal.show("project-modal").then((newProject) => {
                    createProject.mutate(newProject);
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
