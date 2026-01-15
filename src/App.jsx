import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Todo from "./components/Todo";
import AddUpdateTodo from "./components/AddUpdateTodo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todoSnapshot = await getDocs(collection(db, "todos"));
        const data = todoSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTodos(data);
      } catch (error) {}
    };

    getTodos();
  }, []);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="max-w-92.5 mx-auto">
      <Navbar />
      <Search onOpen={onOpen} />
      <Todo todos={todos} />
      <AddUpdateTodo isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default App;
