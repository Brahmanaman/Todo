import { LuListTodo } from "react-icons/lu";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState } from "react";
import AddUpdateTodo from "./AddUpdateTodo";
import { toast } from "react-toastify";

const Todo = ({ todos }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      toast.success("todo deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {todos.length > 0 ? (
        <>
          <div className="py-4 px-1 flex flex-col gap-3 max-h-[75vh] overflow-y-auto ">
            {todos.map((todo) => {
              return (
                <div
                  key={todo.id}
                  className="bg-white/5 backdrop-blur-3xl border border-white/20 flex items-center justify-between rounded p-2"
                >
                  <div className="flex gap-2">
                    <LuListTodo className="text-orange text-5xl" />
                    <div className="flex flex-col items-start justify-center ">
                      <h5 className="text-white font-semibold text-2xl">
                        {todo.task.length > 15
                          ? todo.task.substring(0, 16) + "..."
                          : todo.task}
                      </h5>
                      <p className="text-white -mt-1">
                        {todo.description.length > 15
                          ? todo.description.substring(0, 25) + "..."
                          : todo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <img
                      onClick={() => setEditingTodo(todo)}
                      className="cursor-pointer"
                      src="./images/edit.png"
                      alt="edit"
                    />
                    <img
                      onClick={() => deleteTodo(todo.id)}
                      className="cursor-pointer"
                      src="./images/delete.png"
                      alt="delete"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="my-4 mx-1 flex justify-center items-center h-95">
          <div className="flex items-center gap-3">
            <img src="./images/noContact.png" alt="no contact" />
            <h1 className="text-white text-3xl">No Contact Found</h1>
          </div>
        </div>
      )}
      <AddUpdateTodo
        isUpdate
        data={editingTodo}
        isOpen={editingTodo !== null}
        onClose={() => setEditingTodo(null)}
      />
    </>
  );
};

export default Todo;
