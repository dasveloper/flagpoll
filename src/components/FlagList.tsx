import { api, type RouterOutputs } from "~/utils/api";
import NiceModal from "@ebay/nice-modal-react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

type Flag = RouterOutputs["flag"]["getAll"][0];

const FlagList = ({ projectId }: { projectId: string }) => {
  const { data: flags, refetch } = api.flag.getAll.useQuery(
    { projectId },
    {
      enabled: Boolean(projectId),
    }
  );

  const updateFlag = api.flag.update.useMutation({
    onSuccess() {
      void refetch();
    },
  });

  return (
    <div className="w-full rounded-lg border border-base-200">
      {!Boolean(flags?.length) && (
        <div className="px-4 py-12 text-center text-sm">
          <p>No flag found, add a flag to get started</p>
        </div>
      )}

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
            {flags?.map((flag: Flag) => (
              <tr key={flag.id}>
                <td className="w-0 whitespace-nowrap">
                  <label className="sr-only">Toggle status</label>
                  <input
                    type="checkbox"
                    className="toggle-success toggle mt-1.5"
                    checked={flag.status}
                    onChange={(e) => {
                      updateFlag.mutate({
                        ...flag,
                        status: e.target.checked,
                      });
                    }}
                  />
                </td>
                <td className="w-0 whitespace-nowrap font-bold">{flag.key}</td>
                <td className="w-full max-w-[0] truncate">
                  {flag.description}
                </td>
                <td className="w-0 whitespace-nowrap text-right">
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
                          onClick={() =>
                            void NiceModal.show("flag-modal", {
                              flag,
                              projectId,
                            })
                          }
                        >
                          Edit flag
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() =>
                            void NiceModal.show("delete-modal", {
                              itemId: flag.id,
                              type: "flag",
                            })
                          }
                        >
                          Delete flag
                        </button>
                      </li>
                    </ul>
                  </div>
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
