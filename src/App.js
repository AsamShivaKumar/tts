import { useState } from "react";

function App() {

  const apiKey = process.env.REACT_APP_VOICE_KEY;
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [url, setUrl] = useState(null);
  const [translating, setTranslating] = useState(false);

  // translate("Hello world", "en", "hi").then(res => console.log(res));

  function translateText() {
    if(text === "") return;
    // console.log(`http://localhost:4000/translate?text={text}`);
    setTranslating(true);
    fetch(`https://tts-backend.onrender.com/translate?text=${text}`)
    .then(res => res.json())
    .then(data => {
      setTranslatedText(data.output)
      setTranslating(false);
    })
    .catch(err => console.log(err));    
  }

  function getSpeech(){
    if(translatedText === "") return;
    fetch(`https://api.voicerss.org/?key=${apiKey}&hl=hi-in&src=${translatedText}&r=0&c=mp3&f=44khz_16bit_stereo`)
    .then(res => res.blob())
    .then(blob => {
      // play the audio
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play();

      // download the audio
      const Url = window.URL.createObjectURL(new Blob([blob]));
      setUrl(Url);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="App">
         <div className="mainDiv">
            <p>Enter your English text here</p>
            <input type="text" placeholder="type here...." value={text} onChange={(evt) => setText(evt.target.value)}/>
            <button onClick={translateText}>Translate to hindi</button>
            {translating && <p>Translating ...</p>}
            {translatedText !== "" && !translating && <p>Translated text: {translatedText}</p>}
            <div>
              <i className="fi fi-ss-play-circle" onClick={getSpeech}></i>
              {url && <a download="audio.mp3" href={url}><i className="fi fi-ss-download"></i></a>}
            </div>
         </div>
    </div>
  );
}

export default App;
