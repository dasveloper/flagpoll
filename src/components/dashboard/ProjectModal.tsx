import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api, type RouterOutputs } from "~/utils/api";
import { useRouter } from "next/router";
import { ModalContext } from "~/components/dashboard/ModalContext";
import { useContext } from "react";

type Project = RouterOutputs["project"]["getAll"][0];

type FormValues = {
  name: string;
};

const ProjectModal = ({ project }: { project: Project | null }) => {
  const router = useRouter();
  const context = api.useContext();

  const createProject = api.project.create.useMutation({
    onSuccess: (newProject) => {
      void context.project.getAll.invalidate();
      void router.push(`/dashboard/${newProject.id}`);
    },
  });

  const updateProject = api.project.update.useMutation({
    onSuccess: () => {
      void context.project.getAll.invalidate();
    },
  });

  const { setModal } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(
      z.object({
        name: z.string().max(50, { message: "Max key length 50" }),
      })
    ),
  });

  const hideModal = () => {
    reset();
    void setModal(null);
  };

  const onSubmit = (data: FormValues) => {
    if (project) {
      updateProject.mutate({
        ...project,
        name: data.name,
      });
    } else {
      createProject.mutate({
        name: data.name,
      });
    }

    hideModal();
  };

  return (
    <div
      onClick={(e) => {
        // Only close modal if backdrop clicked not modal body
        if (e.target === e.currentTarget) {
          hideModal();
        }
      }}
      className="modal modal-open"
      id="my-modal"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
        <h3 className="text-lg font-bold">
          {project ? "Update" : "Create"} Project
        </h3>
        <div className="mt-2 flex flex-col gap-y-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Project name</span>
            </label>
            <input
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
              defaultValue={project?.name ?? ""}
              className="input-bordered input input-sm"
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-red-600">
                  {errors.name.message as string}
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="modal-action">
          <button
            type="button"
            onClick={hideModal}
            className="btn-outline btn-sm btn"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary btn-sm btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectModal;
