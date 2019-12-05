const input = [];
const secretCode = "gif";
const image = document.querySelector("img");
const displayMessage = document.querySelector(".p_message");
const displayWord = document.querySelector(".p_word");

window.addEventListener("keyup", async e => {
	e.preventDefault();
	input.push(e.key);
	input.splice(-secretCode.length - 1, input.length - secretCode.length);
	displayMessage.textContent = "Last three things you typed: " + input.join("");
	if (input.join("").toLocaleLowerCase().includes(secretCode)){
		try {
			const response = await fetch("/giveMeGif");
			const json = await response.json();
			displayWord.textContent = "The random word is " + json.word;
			image.src = json.url;
			image.alt = json.alt;
		} catch (error) {
			console.error(error);
			image.src = "https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif";
			image.alt = "sad baby";
			displayMessage.textContent = "Oh no, we only found you this sad baby";
		}		
	}
});