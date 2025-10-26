import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useModalStore } from "../store/modal.store";
import { Button } from "./Button";

interface ModalProps {
  identifier: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  cta?: React.ReactNode[];
}

export const Modal = (props: ModalProps) => {
  const modal = useModalStore();
  const [show, setShow] = useState(modal.isOpen(props.identifier));

  useEffect(() => {
    if (modal.isOpen(props.identifier)) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200); // wait for animation
      return () => clearTimeout(timer);
    }
  }, [modal.isOpen(props.identifier)]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
      transition-opacity duration-200 
      ${modal.isOpen(props.identifier) ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}>
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[] relative transform transition-all duration-200
        ${modal.isOpen(props.identifier) ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
        <div className="flex justify-between items-center p-6">
          <div>
            <h2 className="text-xl font-bold">{props.title}</h2>
            {props.subtitle && <h4 className="text-s">{props.subtitle}</h4>}
          </div>
          <button
            onClick={() => modal.closeModal(props.identifier)}
            className="text-gray-400 hover:text-gray-700">
            <Icon icon="uil:times" width={20} height={20} />
          </button>
        </div>

        <hr className="border-t border-neutral-40" />
        <div className="w-full h-full max-h-[80vh] overflow-y-auto">
          {props.children}
        </div>

        <hr className="border-t border-neutral-40" />
        <div className="flex justify-end items-center space-x-3 p-6">
          {
            props.cta && (
              props.cta.map((action, index) => (
                <div key={index}>
                  {action}
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
};
