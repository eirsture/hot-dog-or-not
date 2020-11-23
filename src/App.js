import React, { useState } from 'react';
import Card from './Components/Card';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotdog, faDog } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [renderCard, setRenderCard] = useState(true);

  const clearStorage = () => {
    sessionStorage.removeItem('dogs');
  }

  const renderContent = () => {
    if (renderCard) {
      return <Card className='Card'/>
    } else {
      const dogList = JSON.parse(sessionStorage.getItem('dogs')) || [];

      return (<div onClick={clearStorage} className="imageList">{dogList.map((dog, i) => {
        return <img alt="dog" key={i} src={dog} />
      })}</div>);
    }
  }

  

  return (
    <div className='App'>
      <div className='Header'>
      <FontAwesomeIcon className="Button cross" icon={faHotdog} size="lg" onClick={() => setRenderCard(false)} />
      <FontAwesomeIcon className="Button heart" icon={faDog} size="lg" onClick={() => setRenderCard(true)}/>
      </div>
      {renderContent()}
    </div>
  );
}

export default App;
