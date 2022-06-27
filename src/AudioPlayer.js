import { GiSpeaker } from 'react-icons/gi';

const AudioPlayer = ({url}) =>{

  const audio = new Audio(
    url
  );

  const start = () => {
    if(url){
      audio.play();
    }
  };

  return(
    <button className="m-2 rounded-md border border-1 shadow-md hover:text-white hover:bg-blue-500" onClick={start}>
    <GiSpeaker className="w-8 h-8"/>
</button>
  );
}

export default AudioPlayer;
