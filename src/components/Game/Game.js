import React, { useState, useEffect } from "react";

import GamePreview from "./GamePreview";

import { useLocation, Redirect, useHistory } from "react-router-dom";

import clickSound from "../../sounds/sound_clicking.mp3";
import goodSound from "../../sounds/sound_success.mp3";
import badSound from "../../sounds/sound_failure.mp3";

import items from "./Items";

const levels = {
  easy: { pairs: 4, itemWidth: "25%" },
  medium: { pairs: 6, itemWidth: "25%" },
  difficult: { pairs: 8, itemWidth: "25%" },
  pro: { pairs: 10, itemWidth: "20%" },
  impossible: { pairs: 15, itemWidth: "16.667%" },
};

const Game = () => {
  let history = useHistory();
  const [readyToStart, setReadyToStart] = useState(false);
  const [secondsToStart, setSecondsToStart] = useState(5);
  const [error, setError] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState({
    gameStart: null,
    gameEnd: null,
  });

  let location = useLocation();

  let level = location.state && location.state.level;

  const [firstItem, setFirstItem] = useState(null);
  const [secondItem, setSecondItem] = useState(null);
  const [matched, setMatched] = useState([]);

  const getRandomImg = () => {
    let random = Math.floor(Math.random() * items.length);
    return items.splice(random, 1)[0];
  };

  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    if (level) {
      function generateBoxes() {
        const boxes = [];

        for (let i = 0; i < levels[level].pairs; i++) {
          const img = getRandomImg();
          boxes.push(img, img);
        }

        boxes.sort(() => Math.random() - 0.5);

        return boxes;
      }
      setBoxes(generateBoxes());
    }
  }, [level]);

  const playSound = (sound) => {
    const melody = new Audio(sound);
    melody.currentTime = 0;
    melody.play();
  };

  const flipBox = (index) => {
    if (error) {
      return;
    }

    if (!gameStarted) {
      return;
    }

    if (matched.filter((x) => x === index)[0] === index) {
      return;
    }

    if (firstItem === null) {
      playSound(clickSound);
      setFirstItem(index);
    }

    if (firstItem !== null && index !== firstItem) {
      const secondItem = index;
      setSecondItem(secondItem);
      if (boxes[firstItem] === boxes[secondItem]) {
        const updatedMatches = [...matched, firstItem, secondItem];
        setMatched(updatedMatches);
        setFirstItem(null);
        setSecondItem(null);

        playSound(goodSound);

        if (boxes.length === updatedMatches.length) {
          setTime({ ...time, gameEnd: new Date() });
        }
      } else {
        playSound(badSound);
        setError(true);

        setMistakes(mistakes + 1);

        setTimeout(() => {
          setError(false);
          setFirstItem(null);
          setSecondItem(null);
        }, 1500);
      }
    }
  };

  useEffect(() => {
    if (time.gameEnd) {
      history.push({
        pathname: "/results",
        state: { time, mistakes },
      });
    }
    // eslint-disable-next-line
  }, [time]);

  useEffect(() => {
    if (readyToStart) {
      if (secondsToStart > 0) {
        setTimeout(() => {
          setSecondsToStart(secondsToStart - 1);
        }, 1000);
      } else {
        setTime({ ...time, gameStart: new Date() });
      }
    }
    // eslint-disable-next-line
  }, [readyToStart, secondsToStart]);

  if (location.state === undefined) {
    return <Redirect to="/menu" />;
  }

  const gameStarted = secondsToStart === 0;

  let Boxes = boxes.map((box, index) => (
    <div
      className={`flip-card ${!gameStarted ? "show-all" : ""} ${
        index === firstItem || index === secondItem ? "active" : ""
      } ${matched.filter((x) => x === index)[0] === index ? "matched" : ""}`}
      key={index}
      style={{ width: levels[level].itemWidth }}
      onClick={() => flipBox(index)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front"></div>
        <div className="flip-card-back">
          <img src={box} alt="img" />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="Game">
      <GamePreview
        readyToStart={readyToStart}
        setReadyToStart={setReadyToStart}
      />
      <div className="boxes">{Boxes}</div>
      {secondsToStart > 0 && <div className="timer">{secondsToStart}s</div>}
    </div>
  );
};

export default Game;
