import React, { useState, useEffect } from 'react';
import Card from './Components/Card';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotdog, faDog, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [renderCard, setRenderCard] = useState(true);
  const [likedDogs, setLikedDogs] = useState([])

  useEffect(() => {
    const dogList = JSON.parse(sessionStorage.getItem('dogs')) || [];
    setLikedDogs(dogList);
  }, [renderCard]);

  const clearStorage = () => {
    sessionStorage.removeItem('dogs');
  }

  const renderContent = (dogList) => {
    if (renderCard) {
      return <Card className='Card'/>
    } else {
      if (dogList.length === 0) {
        return (<div className="infoText">
                  <h3>Could not find any dogs you have liked</h3>
                  <div><FontAwesomeIcon className="red" icon={faHeartBroken} size="5x"/></div></div>)
      } else {
      return (<div onClick={clearStorage} className="imageList">{dogList.map((dog, i) => {
        return <img alt="dog" key={i} src={dog} />
      })}</div>);
    }}
  }

  const selected = (bool) => bool ? "highlight" : "faded"

  return (
    <div className='App'>
      <div className='Header'>
      <FontAwesomeIcon className={`Button cyan ${selected(!renderCard)}`} icon={faHotdog} size="2x" onClick={() => setRenderCard(false)} />
      <FontAwesomeIcon className={`Button red ${selected(renderCard)}`} icon={faDog} size="2x" onClick={() => setRenderCard(true)}/>
      </div>
      {renderContent(likedDogs)}
    </div>
  );
}

export default App;
