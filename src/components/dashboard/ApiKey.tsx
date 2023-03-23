import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const ApiKey = ({ apiKey }: { apiKey: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const url = `${window.location.origin}/api/v1/${apiKey}`;

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => setIsCopied(false), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isCopied]);

  return (
    <div className="form-control ">
      <div className="input-group">
        <input
          type="url"
          readOnly
          disabled
          className="input-bordered input w-full"
          value={url}
        />
        <button
          type="button"
          onClick={handleCopyClick}
          className="btn-success btn-square btn"
        >
          {isCopied ? (
            <CheckIcon className="h-6 w-6" />
          ) : (
            <ClipboardIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ApiKey;
