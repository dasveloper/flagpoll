import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlagSchema } from "~/utils/schemas";
import { api } from "~/utils/api";
import { ModalContext } from "~/components/dashboard/ModalContext";
import { useContext } from "react";
import React from "react";
import { type Flag } from "@prisma/client";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

type FormValues = {
  key: string;
  description: string | null;
  percentage: number;
};

const FlagModal = ({ flag, projectId }: { flag?: Flag; projectId: string }) => {
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

  const { setModal } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FlagSchema),
  });

  const hideModal = () => {
    reset();
    setModal(null);
  };

  const onSubmit = (data: FormValues) => {
    if (flag) {
      updateFlag.mutate({
        ...flag,
        key: data.key,
        description: data.description,
        percentage: data.percentage,
      });
    } else {
      createFlag.mutate({
        projectId,
        key: data.key,
        description: data.description,
        percentage: data.percentage,
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
        <h3 className="text-lg font-bold">{flag ? "Update" : "Create"} Flag</h3>
        <div className="mt-2 flex flex-col gap-y-2">
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
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-x-1">
                Flag percentage{" "}
                <div
                  className="tooltip tooltip-right"
                  data-tip="The percentage of users this feature is turned on for."
                >
                  <InformationCircleIcon className="h-4 w-4" />
                </div>
              </span>
            </label>

            <input
              {...register("percentage", {
                valueAsNumber: true,
              })}
              aria-invalid={errors.percentage ? "true" : "false"}
              defaultValue={(flag?.percentage as number) ?? 100}
              type="range"
              min={0}
              max={100}
              className="range range-success"
            />

            {errors.percentage && (
              <label className="label">
                <span className="label-text-alt text-red-600">
                  {errors.percentage.message as string}
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

export default FlagModal;
