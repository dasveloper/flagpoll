import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="light">
      <Head />
      <body>
        <div id="modal-root" className="relative z-[9999]"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
