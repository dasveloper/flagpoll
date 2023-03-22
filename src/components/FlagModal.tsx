import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api, type RouterOutputs } from "~/utils/api";

type Flag = RouterOutputs["flag"]["getAll"][0];

type FormValues = {
  key: string;
  description: string;
};

const FlagModal = ({
  flag,
  projectId,
}: {
  flag: Flag | undefined;
  projectId: string;
}) => {
  const context = api.useContext();

  const createFlag = api.flag.create.useMutation({
    onSuccess: () => {
      void context.flag.getAll.invalidate();
    },
  });

  const updateFlag = api.flag.update.useMutation({
    onSuccess: () => {
      void context.flag.getAll.invalidate();
    },
  });

  const modal = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(
      z.object({
        key: z
          .string()
          .max(50, { message: "Max key length 50" })
          .regex(new RegExp(/^[A-Za-z0-9\-._]*$/), {
            message:
              "Key must only include letters, numbers, dashes, underscores, and periods.",
          }),
        description: z
          .string()
          .max(250, { message: "Max description length 50" }),
      })
    ),
  });

  const hideModal = () => {
    reset();
    void modal.hide();
  };

  const onSubmit = (data: FormValues) => {
    if (flag) {
      updateFlag.mutate({
        ...flag,
        key: data.key,
        description: data.description,
      });
    } else {
      createFlag.mutate({
        projectId,
        key: data.key,
        description: data.description,
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
      className={`modal ${modal.visible ? "modal-open" : ""}`}
      id="my-modal"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
        <h3 className="text-lg font-bold">{flag ? "Update" : "Create"} Flag</h3>
        <div className="gap-y-8">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Flag key</span>
            </label>
            <input
              {...register("key")}
              aria-invalid={errors.key ? "true" : "false"}
              defaultValue={flag?.key ?? ""}
              className="input-bordered input input-sm"
            />
            {errors.key && (
              <label className="label">
                <span className="label-text-alt text-red-600">
                  {errors.key.message as string}
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Flag description</span>
            </label>
            <input
              {...register("description")}
              aria-invalid={errors.description ? "true" : "false"}
              defaultValue={flag?.description ?? ""}
              className="input-bordered input input-sm"
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-red-600">
                  {errors.description.message as string}
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

export default NiceModal.create(FlagModal);
