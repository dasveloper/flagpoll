import React from "react";
import { createPortal } from "react-dom";
import {
  createContext,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";

const ModalContext = createContext<{
  modal: ReactNode | null;
  setModal: Dispatch<SetStateAction<ReactNode | null>>;
}>({
  modal: null,
  setModal: () => null,
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = React.useState<ReactNode | null>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {modal
        ? createPortal(
            modal,
            document.getElementById("modal-root") as HTMLElement
          )
        : null}
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
