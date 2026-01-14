import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Todo from "./components/Todo";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todoSnapshot = await getDocs(collection(db, "contacts"));
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
  return (
    <div className="max-w-92.5 mx-auto">
      <Navbar />
      <Search />
      <Todo todos={todos} />
    </div>
  );
};

export default App;
