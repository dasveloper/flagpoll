import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="navbar border-b border-base-200">
      <div className="flex-1">
        <Link href="/" className="cursor-pointer">
          <Image
            className="h-6 w-auto"
            width="307"
            height="39"
            alt="Flagpoll logo"
            src="/logo.png"
          />
        </Link>
      </div>
      <div className="flex-none">
        {!sessionData?.user && (
          <button
            type="button"
            onClick={() => void signIn()}
            className="btn-primary btn-sm btn"
          >
            Sign in
          </button>
        )}
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
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button type="button" onClick={() => void signOut()}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
