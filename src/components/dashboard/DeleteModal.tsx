import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ModalContext } from "~/components/dashboard/ModalContext";
import { useContext } from "react";

const DeleteModal = ({
  itemId,
  type,
}: {
  itemId: string;
  type: "project" | "flag";
}) => {
  const router = useRouter();
  const context = api.useContext();
  const { setModal } = useContext(ModalContext);

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

  const hideModal = () => {
    setModal(null);
  };

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
      <div className="modal-box">
        <h3 className="text-lg font-bold">
          Delete {type === "project" ? "Project" : "Flag"}
        </h3>
        <p className="py-4">Are you sure you want to delete this {type}?</p>
        <div className="modal-action">
          <button
            type="button"
            onClick={hideModal}
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

export default DeleteModal;
