// Resources:
// random quote API by https://github.com/lukePeavey/quotable
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// https://www.w3schools.com/js/js_htmldom_css.asp

async function getQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  const newQuote = { content: data.content, author: data.author };
  document.getElementById("text").innerHTML = newQuote.content;
  document.getElementById("author").innerHTML = `- ${newQuote.author}`;
}

function setColors() {
  const COLORS = [
    "52B788",
    "0353A4",
    "023E7D",
    "8338EC",
    "001845",
    "001233",
    "33415C",
    "DC2F02",
    "9D0208",
    "353535",
  ];

  let randomIndex = Math.floor(Math.random() * 10);
  let lastRandom = randomIndex;
  while (lastRandom === randomIndex) {
    randomIndex = Math.floor(Math.random() * 10);
  }
  let newColor = `#${COLORS[randomIndex]}`;

  document.body.style.backgroundColor = newColor;
  document.getElementById("text").style.color = newColor;
  document.getElementById("author").style.color = newColor;
  document.getElementById("logo").style.color = newColor;
  document.getElementById("new-quote").style.backgroundColor = newColor;
}

function updateStuff() {
    setColors();
    getQuote();
}

window.onload = function () {
  updateStuff();
};

document.getElementById("new-quote").addEventListener("click", updateStuff);
