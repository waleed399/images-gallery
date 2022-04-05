import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Search from './components/Search';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [word,setWord] = useState('');

  const HandleSearchSubmit = (e)=>{ 
    e.preventDefault();
    console.log(word);
    fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
    .then((res) =>res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) =>{
      console.log(err);
    })
    setWord('');
  }
  
  return (
    <div>
      <Header title="Images Gallery"/>
      <Search word={word} setWord={setWord} HandleSubmit={HandleSearchSubmit}/>
    </div>
  );
}

export default App;
