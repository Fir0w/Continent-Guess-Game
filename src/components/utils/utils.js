import continentData from "../continents.json";

export const selectTwoContinents = () => {

	let random = randomNumber(0, 7);
	let selectedContinents = [continentData[random[0]], continentData[random[1]]];

	return selectedContinents;
};

export const randomNumber = (min, max) => {
	
	let randomOne = Math.floor(Math.random() * (max - min) + min);
	let randomTwo = randomOne;
	while (randomOne === randomTwo) {
		randomTwo = Math.floor(Math.random() * (max - min) + min);
	};

	const randomReturn = [randomOne, randomTwo];

	return randomReturn;
};