const DefinitionView = ({meaningList}) =>{
  return(
    meaningList.map((meanings)=>(
      meanings.map((defn,index)=>(
      <div key={index} className = "mt-4">
        <p className = "m-6 text-xl md:text-3xl">&#8226; {defn.definition}</p>
      </div>
    ))
  ))
  );
}

export default DefinitionView;
