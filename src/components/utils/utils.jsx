import continentData from "../continents.json";

export const selectContinent = () => {

	let random = randomNumber();
	return continentData[random];
};

const randomNumber = () => {
	
	let random = Math.floor(Math.random() * 7);
	return random;
};
