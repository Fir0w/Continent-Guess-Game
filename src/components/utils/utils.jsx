import continentData from "../continents.json";

export const selectContinent = () => {

	let random = randomNumber();
	let selectedContinents = [];
	let i = 0;
	let prevRandom;
	while (i < 2) {
		if (random !== prevRandom) {
			selectedContinents.push(continentData[random]);
			prevRandom = random;
			i++;
		} else random = randomNumber();
	};

	return selectedContinents;
};

const randomNumber = () => {
	
	let random = Math.floor(Math.random() * 7);
	return random;
};
