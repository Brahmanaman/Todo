import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const AddUpdateTodo = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="min-h-50 max-w-[80%] bg-white z-50 relative m-auto">
            <div className="flex justify-end p-1">
              <AiOutlineClose
                className="text-2xl cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>
          <div
            onClick={onClose}
            className="h-screen w-screen backdrop-blur-xs absolute top-0 left-0 z-40"
          />
        </>
      )}
    </>
  );
};

export default AddUpdateTodo;
