const ExampleView = ({meaningList}) =>{
  return(
    meaningList.map((meanings)=>(
      meanings.map((defn,index)=>(
      <div key={index} className = "mt-2">
      {defn.example  &&
        <p className = "m-2 ml-4 text-lg md:text-lg">&#8226; {defn.example}</p>
      }
      </div>
    ))
  ))
  );
}

export default ExampleView;
