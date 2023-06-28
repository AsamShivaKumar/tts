import { useState } from "react";
import "./app.css";

function App() {

  const apiKey = process.env.REACT_APP_VOICE_KEY;
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [url, setUrl] = useState("");

  function translateText() {
    if(text === "") return;
    fetch(`https://api.mymemory.translated.net/get?q={text}&langpair=en|fr`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
    setTranslatedText(text.substring(0, 100));
  }

  function getSpeech(){
    if(translatedText === "") return;
    fetch(`https://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${translatedText}&r=0&c=mp3&f=44khz_16bit_stereo`)
    .then(res => res.blob())
    .then(blob => {
      // play the audio
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play();

      // download the audio
      const url = window.URL.createObjectURL(new Blob([blob]));
      setUrl(url);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="App">
         <div className="mainDiv">
            <p>Enter your English text here</p>
            <input type="text" placeholder="type here...." value={text} onChange={(evt) => setText(evt.target.value)}/>
            <button onClick={translateText}>Translate to hindi</button>
            {translatedText !== "" && <p>Translated text: {translatedText}</p>}
            <div>
              <i className="fi fi-ss-play-circle" onClick={getSpeech}></i>
              <a download="audio.mp3" href={url}><i className="fi fi-ss-download"></i></a>
            </div>
         </div>
    </div>
  );
}

export default App;
