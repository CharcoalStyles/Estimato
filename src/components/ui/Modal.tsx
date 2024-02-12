import { useState, useEffect, PropsWithChildren } from "react";
import PureModal from "react-pure-modal";
import { Text } from "@/components/ui";

type SbAuthProps = {
  isOpen?: boolean;
  onClose?: () => void;
  children: JSX.Element;
};

export function Modal({ isOpen, onClose, children }: SbAuthProps) {
  return (
    <>
      <div
        className="opacity-40 fixed inset-0 bg-black"
        onClick={() => {
          onClose && onClose();
        }}
      />
      <PureModal
        isOpen={isOpen}
        onClose={() => {
          onClose && onClose();
        }}
        className="mx-auto mt-32 px-12 py-8 w-2/5 max-w-xl absolute inset-x-0 bg-black">
        {children}
      </PureModal>
    </>
  );
}
