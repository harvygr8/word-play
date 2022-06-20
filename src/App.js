import {useState , useEffect} from 'react';
import SearchBar from './SearchBar';
import DefinitionView from './DefinitionView';
import ExampleView from './ExampleView';
import AudioPlayer from './AudioPlayer';

function App() {


  const [search , setSearch] = useState(null);
  const [phonetic , setPhonetic] = useState(null);
  const [audioUrl , setAudioUrl] = useState(null);
  const [apidata , setApidata] = useState([]);
  const [examples , setExamples] = useState([]);
  const [canShowExample , setCanShowExample] = useState(false);
  const [meanings , setMeanings] = useState([]);
  const [related , setRelated] = useState([]);
  const [definitions , setDefinitions] = useState([]);


  const fetchWordDetails=(searchQuery)=>{
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+searchQuery)
    .then((res)=>res.json())
    .then((data)=>{
      setApidata(data);
    })
    .catch(error=>console.log(error));
  }



  const iterateOverMeanings= (apiData) =>{
    apiData.map((meanings)=>{
      console.log(meanings.definitions);
      setMeanings(data=>
        [...data,meanings.definitions]);
    });
  }

  const iterateOverDefinitons = (definitions) =>{
    definitions.map((meanings)=>{
      meanings.map((mn)=>{
        setDefinitions(data=>
          [...data,mn.definition]);
          // console.log(mn.definition);
      })
    });
  }

  const iterateOverExamples = (definitions) =>{
    definitions.map((meanings)=>{
      meanings.map((mn)=>{
        setExamples(data=>
          [...data,mn.example]);
          // console.log(mn.definition);
      })
    });
  }

  const iterateOverRelated = (definitions) =>{
    definitions.map((meanings)=>{
      setDefinitions(data=>
        [...data,meanings.synonyms]);
    });
  }

  const checkExampleArr=(examples)=>{
    let count=0;
    for(let s of examples){
      if(typeof s == 'undefined'){
        count++;
      }
    }
    if(count!==examples.length){
      //console.log("YES!");
      setCanShowExample(true);
    }
  }

  //executes everytime search query is updated , since setSearch is async and its messy to use callback with setState , lets use useEffect
    useEffect(() => {
      setApidata([]);
      setMeanings([]);
      setExamples([]);
      setDefinitions([]);
      setAudioUrl(null);
      setCanShowExample(false);

      if(search!==null){
        console.log(search);
        fetchWordDetails(search);
      };
    },[search]);

  useEffect(() => {
    if(apidata.length>0){
      console.log(apidata[0].meanings);
      setPhonetic(apidata[0].phonetic);
      console.log(apidata[0].phonetics[0].audio);
      setAudioUrl(apidata[0].phonetics[0].audio)
      iterateOverMeanings(apidata[0].meanings);
   };
   },[apidata]);

   useEffect(() => {
     if(meanings.length>0){
      console.log(meanings);
      iterateOverDefinitons(meanings);
      iterateOverExamples(meanings);
    };
  },[meanings]);

  useEffect(() => {
     console.log(examples);
     checkExampleArr(examples);
 },[examples]);

 useEffect(()=>{
   console.log("CAN SHOW EX:"+ canShowExample);
 },[canShowExample])

  useEffect(() => {
    if(definitions.length>0){
     console.log(definitions);
   };
 },[definitions]);


   useEffect(() => {
     if(phonetic!==null){
      console.log(phonetic);
      //iterateOverDefinitons(meanings);
    };
  },[phonetic]);





/* get data from search bar component*/
  const getSearchTerm = (searchTerm) =>{
    setSearch(searchTerm);
  }


  return (
    <div className="App">
      <div className="mt-12 md:mt-24 flex flex-col items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
      <h1 className="text-4xl">WordPlay </h1>
      </div>

      <div className="flex flex-col items-center">

        <div className = "SearchBar mt-6">
          <SearchBar getSearchTerm={getSearchTerm}/>
        </div>

        {meanings.length==0 &&
          <div className="mt-28 md:mt-48 flex flex-col items-center">

          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h1 className="text-md md:text-4xl">Nothing here for now, try searching for a word.</h1>
          </div>

        }

          {meanings.length>0 &&
          <div className = "max-h-fit md:max-h-fit bg-white w-11/12 md:w-8/12 mt-8 md:mt-12 border border-1 shadow-lg rounded-md mb-12">
            <div className="m-4 flex flex-row justify-between">

              <div className="flex flex-row items-center">
                <h1 className="text-2xl md:text-4xl">{search}</h1>
                <h1 className="ml-4 text-2xl md:text-4xl text-blue-500">{phonetic}</h1>
              </div>

              {audioUrl &&
              <div className="flex flex-row justify-items-center">
                <AudioPlayer url={audioUrl}/>
              </div>
              }

            </div>
            <hr/>
            <h2 className="m-4 text-2xl rounded-md text-blue-500"> Definitions </h2>
            <DefinitionView meaningList = {meanings}/>
            {canShowExample==true &&
              <div className="mt-2">
                <h2 className="m-4 text-2xl text-blue-500"> Sentence Examples</h2>
                <ExampleView meaningList = {meanings}/>
              </div>
            }
          </div>
        }


        </div>
      </div>
  );
}

export default App;
