import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { db } from "./config/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Todo from "./components/Todo";
import AddUpdateTodo from "./components/AddUpdateTodo";
import toggleModal from "./hooks/toggleModal";
import { ToastContainer, Zoom } from "react-toastify";

const App = () => {
  const [todos, setTodos] = useState([]);
  const { onOpen, onClose, isOpen } = toggleModal();

  useEffect(() => {
    const getTodos = async () => {
      try {
        await onSnapshot(collection(db, "todos"), (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setTodos(data);
        });
      } catch (error) {}
    };

    getTodos();
  }, []);

  const filterContacts = async (e) => {
    const value = e.target.value.trim();
    if (value !== "") {
      const filteredTodos = todos.filter((todo) => {
        return todo.task.toLowerCase().includes(value.toLowerCase());
      });
      setTodos(filteredTodos);
    } else {
      try {
        await onSnapshot(collection(db, "todos"), (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setTodos(data);
        });
      } catch (error) {}
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme="dark"
        transition={Zoom}
      />
      <div className="max-w-92.5 mx-auto bg-[radial-gradient(at_50%_50%,#440138,#061041_75%)] py-2 backdrop-blur-xs">
        <Navbar />
        <Search onOpen={onOpen} filterContacts={filterContacts} />
        <Todo todos={todos} />
        <AddUpdateTodo isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
};

export default App;
