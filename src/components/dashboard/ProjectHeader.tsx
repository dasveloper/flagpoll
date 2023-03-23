import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { api, type RouterOutputs } from "~/utils/api";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { ModalContext } from "~/components/dashboard/ModalContext";
import { useContext } from "react";
import ProjectModal from "~/components/dashboard/ProjectModal";
import FlagModal from "~/components/dashboard/FlagModal";
import DeleteModal from "~/components/dashboard/DeleteModal";

type Project = RouterOutputs["project"]["getAll"][0];

const ProjectHeader = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const { setModal } = useContext(ModalContext);

  const { data: projects } = api.project.getAll.useQuery();

  const currentProject: Project | null = useMemo(
    () => projects?.find((project) => project.id === projectId) ?? null,
    [projects, projectId]
  );

  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex w-full items-center gap-x-2 pr-2 sm:max-w-xs sm:pr-0">
        <select
          className="select-bordered select flex-1 py-0"
          disabled={projects?.length === 0}
          value={projectId}
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
          <button className="btn-ghost btn-square btn-sm btn">
            <EllipsisVerticalIcon className="inline-block h-5 w-5 stroke-current" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <button
                type="button"
                onClick={() =>
                  setModal(<ProjectModal project={currentProject} />)
                }
              >
                Edit project
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setModal(<ProjectModal project={null} />)}
              >
                Create project
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  setModal(<DeleteModal itemId={projectId} type="project" />)
                }
              >
                Delete project
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-4">
        <button
          className="btn-primary btn-block btn"
          onClick={() => setModal(<FlagModal projectId={projectId} />)}
        >
          Create flag
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;
