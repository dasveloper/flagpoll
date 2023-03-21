import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { type RouterOutputs } from "~/utils/api";

type Project = RouterOutputs["project"]["getAll"][0];

const ProjectModal = ({ project }: { project: Project }) => {
  const modal = useModal();

  const handleSubmit = () => {
    modal.resolve({ id: project.id, name: "Test Project 5" });
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
        <h3 className="text-lg font-bold">Create Project</h3>
        <p className="py-4">Lorem ipsum</p>
        <div className="modal-action">
          <button
            type="button"
            onClick={() => void modal.hide()}
            className="btn"
          >
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="btn">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NiceModal.create(ProjectModal);
