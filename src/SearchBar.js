import {useState} from 'react';

const SearchBar = ({getSearchTerm}) =>{

  const [word , setWord] = useState("fantastic");

  const handleChange = (e) =>{
    setWord(e.target.value);
  };

  return(
    <div className="flex flex-row items-center">
      <input type="text" name={word} placeholder = "Enter a Word..." className = "bg-white rounded-md shadow-lg border border-1 p-2 w-72 h-10" onChange = {handleChange}/>
      <button onClick={()=>getSearchTerm(word)}className ="bg-white ml-2 rounded-md border border-1 shadow-md p-2 hover:text-white hover:bg-black">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
