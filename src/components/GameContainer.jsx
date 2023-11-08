import React, { useState, useEffect } from 'react';
import styles from './GameContainer.module.css';
import { selectContinent } from './utils/utils.jsx';

const GameContainer = () => {
    const [selectedContinent, setSelectedContinent] = useState(selectContinent())
    const [appearedContinent, setAppearedContinent] = useState([])
    const [count, setCount] = useState(7)
    const [end, setEnd] = useState(false)

    useEffect(() => {
        generateContinent();
    }, []);

    const generateContinent = () => {
        const continentArray = selectContinent();
        let continent = [];
        let wasContinent = [];
        continentArray.forEach((e) => {
            if (!wasContinent.includes(e.name)) {
                continent.push(e);
                wasContinent.push(e.name);
            }
        });

        console.log("appearedContinent:", appearedContinent);
        console.log("continent:", continent[0].name);
        
        if (!appearedContinent.includes(continent[0].name)) {
            setSelectedContinent(continentArray);
            setAppearedContinent((prevArray) => [...prevArray, wasContinent[0]]);
        } else if (appearedContinent.length < 7)
            generateContinent();
        else if (appearedContinent.length === 7) {
            setEnd(true);
        };
    };

    const randomNumber = () => {
        const randomNumbers = [0, 1];
        const result = [];
        
        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * randomNumbers.length);
            const randomNumber = randomNumbers.splice(randomIndex, 1)[0];
            result.push(randomNumber);
        };

        return result;
    };

    const handleAnswer = (id) => {
        const answer = document.getElementById(id).innerHTML;

        if (answer === selectedContinent[0].correctAnswer) {
            generateContinent();
        }
        else {
            setCount(e => e - 1);
            generateContinent();
        }
    };

    let x = randomNumber();

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
                <button id="1" onClick={() => handleAnswer("1")}>{selectedContinent[x[0]].name}</button> 
                <button id="2" onClick={() => handleAnswer("2")}>{selectedContinent[x[1]].name}</button>
            </div>
            </>}
        </div>
    );
};

export default GameContainer;
