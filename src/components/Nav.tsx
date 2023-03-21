import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Nav = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="container navbar mx-auto">
      <div className="flex-1">
        <a className="cursor-pointer text-xl normal-case">FLAGPOLL</a>
      </div>
      <div className="flex-none">
        {sessionData?.user && (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <Image
                  width="420"
                  height="420"
                  alt="User profile"
                  src={sessionData.user.image ?? ""}
                />
              </div>
            </label>
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
        )}
      </div>
    </nav>
  );
};

export default Nav;
