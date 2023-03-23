import React from "react";
import Nav from "~/components/common/Nav";
import Footer from "~/components/common/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-base-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-base-100 px-4">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
