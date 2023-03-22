import { api } from "~/utils/api";
import NiceModal from "@ebay/nice-modal-react";

const FlagList = ({ projectId }: { projectId: string }) => {
  const { data: flags } = api.flag.getAll.useQuery(
    { projectId },
    {
      enabled: Boolean(projectId),
    }
  );

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-base-200">
      {Boolean(flags?.length) && (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Status</th>
              <th>Key</th>
              <th>Description</th>
              <th>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {flags?.map((flag) => (
              <tr key={flag.id}>
                <td className="w-0 whitespace-nowrap">
                  <label className="sr-only">Toggle status</label>
                  <input
                    type="checkbox"
                    className="toggle-success toggle mt-1.5"
                    checked={flag.status}
                  />
                </td>
                <td className="w-0 whitespace-nowrap font-bold">{flag.key}</td>
                <td className="w-full max-w-[0] truncate">
                  {flag.description}
                </td>
                <td className="w-0 whitespace-nowrap text-right">
                  <button
                    className="btn-outline btn-sm btn"
                    onClick={() =>
                      void NiceModal.show("flag-modal", {
                        flag,
                        projectId,
                      })
                    }
                  >
                    edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FlagList;
