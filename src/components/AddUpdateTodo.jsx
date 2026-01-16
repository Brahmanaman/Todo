import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const todoSchemaValidation = Yup.object().shape({
  task: Yup.string().required("Task is required"),
});

const AddUpdateTodo = ({ isOpen, onClose, isUpdate, data }) => {
  const addTodo = async (todo) => {
    try {
      await addDoc(collection(db, "todos"), todo);
      onClose();
      toast.success("todo added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (todo, id) => {
    try {
      await updateDoc(doc(db, "todos", id), todo);
      onClose();
      toast.success("todo updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return createPortal(
    <>
      {isOpen && (
        <div className="h-screen w-full backdrop-blur-xs absolute top-0 left-0 z-40 grid place-items-center">
          <div className="min-h-50 min-w-[80%] md:min-w-[20%] bg-[radial-gradient(at_0%_60%,#440138,#061041_75%)] z-50 relative m-auto rounded-md">
            <div className="flex justify-end p-1">
              <AiOutlineClose
                className="text-2xl cursor-pointer text-white"
                onClick={onClose}
              />
            </div>
            <div className="px-4 py-2">
              <Formik
                validationSchema={todoSchemaValidation}
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
                    <label className="text-white" htmlFor="task">
                      Task
                    </label>
                    <Field
                      name="task"
                      className="border border-white p-1 rounded text-white"
                    />
                    <div className="text-red-500">
                      <ErrorMessage name="task" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-white" htmlFor="description">
                      Description
                    </label>
                    <Field
                      name="description"
                      className="border border-white p-1 rounded text-white"
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
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default AddUpdateTodo;
