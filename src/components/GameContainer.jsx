import React, { useState, useEffect } from 'react';
import styles from './GameContainer.module.css';
import { selectTwoContinents, randomNumber } from './utils/utils.js';

const GameContainer = () => {
    const [selectedContinent, setSelectedContinent] = useState(selectTwoContinents());
    const [appearedContinent, setAppearedContinent] = useState([]);
    const [radomizeAnswer, setRadomizeAnswer] = useState(randomNumber(0, 2))
    const [count, setCount] = useState(7);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        generateContinent();
    }, []);

    const generateContinent = () => {
        const continentArray = selectTwoContinents();
        let continent = [];
        let wasContinent = [];
        continentArray.forEach((e) => {
            if (!wasContinent.includes(e.name)) {
                continent.push(e);
                wasContinent.push(e.name);
            };
        });
        
        if (!appearedContinent.includes(continent[0].name)) {
            setSelectedContinent(continentArray);
            setAppearedContinent((prevArray) => [...prevArray, wasContinent[0]]);
        } else if (appearedContinent.length < 7)
            generateContinent();
        else if (appearedContinent.length === 7) {
            setEnd(true);
        };

        setRadomizeAnswer(randomNumber(0, 2))
    };

    const handleAnswer = (answer) => {

        if (answer === selectedContinent[0].correctAnswer) {
            generateContinent();
        } else {
            setCount(e => e - 1);
            generateContinent();
        };
    };

    const reloadGame = () => {
        setEnd(false);
        setAppearedContinent([]);
        setCount(7);
    };

    return (
        <div className={styles.gameContainer}>
            <h1>Guess Game</h1>
            {end ? 
            <>
            <div className={styles.img}>
                <h3>{`you guessed ${count}/7 correct`}</h3>
            </div>
            <button onClick={reloadGame}>Retry</button>
            </> : 
            <>
            <div className={styles.img}>
                <img src={selectedContinent[0].img} width="300" height="300" alt=""></img>
            </div>
            <h3>Guess the continent</h3>
            <div className={styles.guess}>
                <button onClick={() => handleAnswer(selectedContinent[radomizeAnswer[0]].name)}>{selectedContinent[radomizeAnswer[0]].name}</button> 
                <button onClick={() => handleAnswer(selectedContinent[radomizeAnswer[1]].name)}>{selectedContinent[radomizeAnswer[1]].name}</button>
            </div>
            </>}
        </div>
    );
};

export default GameContainer;