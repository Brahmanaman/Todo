import { addDoc, collection } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { db } from "../config/firebase";

const AddUpdateTodo = ({ isOpen, onClose }) => {
  const addTodo = async (todo) => {
    try {
      await addDoc(collection(db, "todos"), todo);
    } catch (error) {
      console.log(error);
    }
  };

  return createPortal(
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
            <div className="px-4 py-2">
              <Formik
                initialValues={{
                  task: "",
                  description: "",
                }}
                onSubmit={(values) => {
                  addTodo(values);
                  console.log(values);
                }}
              >
                <Form className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="task">Task</label>
                    <Field
                      name="task"
                      className="border border-gray-950 p-1 rounded"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="description">Description</label>
                    <Field
                      name="description"
                      className="border border-gray-950 p-1 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-orange w-fit py-2 px-4 rounded font-semibold cursor-pointer self-center active:scale-95 hover:bg-orange-500 transition"
                  >
                    Add Todo
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
          <div
            onClick={onClose}
            className="h-screen w-screen backdrop-blur-xs absolute top-0 left-0 z-40"
          />
        </>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default AddUpdateTodo;
