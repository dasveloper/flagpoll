import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
const ProjectHeader = () => {
  return (
    <div className="border-b border-base-200 pb-3 sm:flex sm:items-center sm:justify-between">
      <div className="flex w-full items-center gap-x-2 pr-2 sm:max-w-xs sm:pr-0">
        <select className="select-bordered select flex-1 py-0" disabled>
          <option disabled selected>
            Select a project
          </option>
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
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
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
