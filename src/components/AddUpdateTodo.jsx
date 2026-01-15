import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { db } from "../config/firebase";
import { Toast } from "@chakra-ui/react";

const AddUpdateTodo = ({ isOpen, onClose, isUpdate, data }) => {
  const addTodo = async (todo) => {
    try {
      await addDoc(collection(db, "todos"), todo);
      alert("todo added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (todo, id) => {
    try {
      await updateDoc(doc(db, "todos", id), todo);
      alert("todo updated successfully");
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
                initialValues={
                  isUpdate
                    ? {
                        task: data.task,
                        description: data.description,
                      }
                    : {
                        task: "",
                        description: "",
                      }
                }
                onSubmit={(values) => {
                  isUpdate ? updateTodo(values, data.id) : addTodo(values);
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
                    {isUpdate ? "Update" : "Add"} Todo
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
