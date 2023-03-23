import { useState } from "react";

const Demo = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [showHero, setShowHero] = useState(true);
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const objString = `{
    "header": ${showHeader.toString()},
    "hero": ${showHero.toString()},
    "newsletter": ${showNewsletter.toString()},
    "footer": ${showFooter.toString()},
  }`;

  return (
    <div className="flex flex-col items-center justify-evenly gap-8 md:flex-row">
      <div className="mockup-phone m-0">
        <div className="camera"></div>
        <div className="display">
          <div className="phone-1 artboard artboard-demo">
            {showHeader && (
              <div className="flex w-full flex-1 items-center justify-center bg-cyan-500 text-white">
                <span className="text-lg text-white">Header</span>
              </div>
            )}
            {showHero && (
              <div className="flex w-full flex-1 items-center justify-center bg-rose-500 text-white">
                <span className="text-lg text-white">Hero image</span>
              </div>
            )}
            {showNewsletter && (
              <div className="flex w-full flex-1 items-center justify-center bg-emerald-500 text-white">
                <span className="text-lg text-white">Newsletter section</span>
              </div>
            )}
            {showFooter && (
              <div className="flex w-full flex-1 items-center justify-center bg-violet-500 text-white">
                <span className="text-lg text-white">Footer</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <div className="flex flex-col items-center justify-center gap-y-8 rounded-xl border border-neutral-300 p-12">
          <label className="label cursor-pointer gap-x-4">
            <input
              type="checkbox"
              className="toggle-success toggle"
              checked={showHeader}
              onChange={() => setShowHeader((prev) => !prev)}
            />
            <span className="label-text">Header</span>
          </label>
          <label className="label cursor-pointer gap-x-4">
            <input
              type="checkbox"
              className="toggle-success toggle "
              checked={showHero}
              onChange={() => setShowHero((prev) => !prev)}
            />
            <span className="label-text">Hero image</span>
          </label>
          <label className="label cursor-pointer gap-x-4">
            <input
              type="checkbox"
              className="toggle-success toggle "
              checked={showNewsletter}
              onChange={() => setShowNewsletter((prev) => !prev)}
            />
            <span className="label-text">Newsletter section</span>
          </label>
          <label className="label cursor-pointer gap-x-4">
            <input
              type="checkbox"
              className="toggle-success toggle "
              checked={showFooter}
              onChange={() => setShowFooter((prev) => !prev)}
            />
            <span className="label-text">Footer</span>
          </label>
        </div>
        <div className="mockup-code">
          <pre>
            <code>{objString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Demo;
