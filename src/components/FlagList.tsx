const flags = [
  {
    id: 1,
    status: false,
    key: "homepage",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a eros nibh. Etiam varius, eros vitae interdum congue, nisi ipsum tempor leo, vel gravida quam velit posuere erat.",
  },
  {
    id: 2,
    status: true,
    key: "hero",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a eros nibh. Etiam varius, eros vitae interdum congue, nisi ipsum tempor leo, vel gravida quam velit posuere erat.",
  },
  {
    id: 3,
    status: false,
    key: "footer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a eros nibh. Etiam varius, eros vitae interdum congue, nisi ipsum tempor leo, vel gravida quam velit posuere erat.",
  },
];

const FlagList = () => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-base-200">
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
          {flags.map((flag) => (
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
              <td className="w-full max-w-[0] truncate">{flag.description}</td>
              <td className="w-0 whitespace-nowrap text-right">
                <button className="btn-outline btn-sm btn">edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlagList;
