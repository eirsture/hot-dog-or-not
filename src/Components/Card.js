import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons'


function Card() {
  const [dogImage, setDogImage] = useState();
  const [initialMouseX, setInitialMouseX] = useState();

  const refTest = useRef(null);
  const fetchRandomDog = async () => {
    const result = await axios('https://dog.ceo/api/breeds/image/random');
    if (result.data.status === 'success') {
      setDogImage(result.data.message);
      return result.data.message;
    }
  };

  useEffect(() => {
    fetchRandomDog();
    document.onanimationend = () => {
      refTest.current.classList.remove('right-trigger');
      refTest.current.classList.remove('left-trigger');
    };
  }, []);

  const handleTouchStart = (event) => {
    if (event.nativeEvent instanceof TouchEvent) {
      setInitialMouseX(event.touches[0].clientX);
    } else if (event.nativeEvent instanceof MouseEvent) {
      const mouseX = event.clientX;
      setInitialMouseX(event.clientX);

      document.addEventListener(
        'mouseup',
        (e) => {
          handleTouchEnd(mouseX, e.clientX);
        },
        { once: true }
      );
    }
  };

  const handleTouchEnd = (initial, final) => {
    if (initial - final >= 60) {
      handleLeft();
    } else if (initial - final <= -60) {
      handleRight();
    }
    setInitialMouseX(null);
  };

  const handleLeft = async () => {
    refTest.current.classList.add('left-trigger');
    await fetchRandomDog();
  };

  const handleRight = async () => {
    refTest.current.classList.add('right-trigger');
    const dogList = JSON.parse(sessionStorage.getItem('dogs')) || [];
    dogList.push(dogImage);
    sessionStorage.setItem('dogs', JSON.stringify(dogList));
    await fetchRandomDog();
  };

  return (
    <div
      className='Card'
      ref={refTest}
      onMouseDown={handleTouchStart}
      onTouchStart={handleTouchStart}
      onTouchEnd={(event) =>
        handleTouchEnd(initialMouseX, event.changedTouches[0].clientX)
      }
    >
      <div className='img-wrapper'>
      {!dogImage ? (
        <FontAwesomeIcon className='Loading' icon={faSpinner} size="2x" />
      ) : (
        <img src={dogImage} alt='Dog' />
        
      )}
      </div>
      <div className='Buttons'>
        <FontAwesomeIcon className="Button cross" onClick={handleLeft} icon={faTimes} size="2x" />
        <FontAwesomeIcon className="Button heart" onClick={handleRight} icon={faHeart} size="2x" />
      </div>
    </div>
  );
}

export default Card;
