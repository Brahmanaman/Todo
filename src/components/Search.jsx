import { MdSearch } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";

const Search = () => {
  return (
    <>
      <div className="my-4 mx-1 flex items-center justify-between gap-3">
        <div className="relative flex items-center grow">
          <MdSearch className="text-white absolute text-3xl ml-1.5 " />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Todo"
            className="bg-transparent border border-white rounded py-2 px-4 text-white text-xl pl-10 outline-0 w-full"
          />
        </div>
        <MdAddCircle className="text-white text-6xl cursor-pointer" />
      </div>
    </>
  );
};

export default Search;
