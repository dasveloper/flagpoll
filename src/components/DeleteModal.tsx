import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const DeleteModal = ({
  itemId,
  type,
}: {
  itemId: string;
  type: "project" | "flag";
}) => {
  const router = useRouter();
  const context = api.useContext();

  const deleteProject = api.project.delete.useMutation({
    onSuccess: () => {
      void context.project.getAll.invalidate();
      void router.push(`/dashboard`);
    },
  });

  const deleteFlag = api.flag.delete.useMutation({
    onSuccess: () => {
      void context.flag.getAll.invalidate();
    },
  });

  const modal = useModal();

  const handleDelete = () => {
    if (type === "project") {
      deleteProject.mutate({
        id: itemId,
      });
    } else if (type === "flag") {
      deleteFlag.mutate({
        id: itemId,
      });
    }

    void modal.hide();
  };

  return (
    <div
      onClick={(e) => {
        // Only close modal if backdrop clicked not modal body
        if (e.target === e.currentTarget) {
          void modal.hide();
        }
      }}
      className={`modal ${modal.visible ? "modal-open" : ""}`}
      id="my-modal"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">
          Delete {type === "project" ? "Project" : "Flag"}
        </h3>
        <p className="py-4">Are you sure you want to delete this {type}?</p>
        <div className="modal-action">
          <button
            type="button"
            onClick={modal.hide}
            className="btn-outline btn-sm btn"
          >
            Cancel
          </button>
          <button onClick={handleDelete} className="btn-primary btn-sm btn">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NiceModal.create(DeleteModal);
