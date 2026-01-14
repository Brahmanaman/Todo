import { LuListTodo } from "react-icons/lu";

const Todo = ({ todos }) => {
  return (
    <>
      {todos.length > 0 ? (
        <div className="my-4 mx-1 flex flex-col gap-3">
          {todos.map((contact) => {
            return (
              <div
                key={contact.id}
                className="bg-yellow flex items-center justify-between rounded p-2"
              >
                <LuListTodo className="text-orange text-5xl" />
                <div className="flex flex-col items-start justify-center ">
                  <h5 className="text-black font-semibold text-2xl">
                    {contact.name}
                  </h5>
                  <p className="text-black -mt-1">{contact.email}</p>
                </div>
                <img
                  className="cursor-pointer"
                  src="./images/edit.png"
                  alt="edit"
                />
                <img
                  className="cursor-pointer"
                  src="./images/delete.png"
                  alt="delete"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="my-4 mx-1 flex justify-center items-center h-95">
          <div className="flex items-center gap-3">
            <img src="./images/noContact.png" alt="no contact" />
            <h1 className="text-white text-3xl">No Contact Found</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
