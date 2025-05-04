const imageFiles = ['assets/cards/front-0.png', 'assets/cards/front-1.png'];
let cardContainer = document.querySelector(".cards");
let startButton = document.getElementById("start");
let quantityInput = document.querySelector(".quantity-value"); 
let speedInput = document.getElementById("speed-value"); 
let rangeDisplay = document.querySelector(".range-val"); 
let animationCheckbox = document.getElementById("animation-toggle"); // Pobranie checkboxa animacji

let interval;
let cardCount = 0;

function createCard() {
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const imgElement = document.createElement("img");
    imgElement.src = imageFiles[randomIndex];
    imgElement.className = "card";

    imgElement.style.position = "absolute";
    imgElement.style.top = "30%";
    imgElement.style.left = "50%";
    imgElement.style.transform = "translate(-50%, -50%)";
    imgElement.style.opacity = "0";


    if (animationCheckbox.checked) {
        imgElement.style.transition = "opacity 0.5s, top 0.5s";
        setTimeout(() => {
            imgElement.style.opacity = "1";
            imgElement.style.top = "40%"; // Przesunięcie o 10% w dół
        }, 50);
    }
    else {
        imgElement.style.opacity = "1";
        imgElement.style.top = "40%";
    }

    cardContainer.appendChild(imgElement);
}

function startDrawingCards() {
    clearInterval(interval);

    let maxCards = parseInt(quantityInput.value);
    let speed = parseInt(speedInput.value);

    if (animationCheckbox.checked) {
        speed += 500;
    }

    cardCount = 0;
    createCard();
    cardCount++;

    interval = setInterval(() => {
        if (cardCount < maxCards) {
            createCard();
            cardCount++;
        } else {
            stopDrawingCards();
            startButton.classList.remove("stop");
            startButton.classList.add("start");
            startButton.textContent = "START";
        }
    }, speed);
}

function stopDrawingCards() {
    clearInterval(interval);
    cardContainer.innerHTML = "";
}

startButton.addEventListener("click", function () {
    if (startButton.classList.contains("start")) {
        startButton.classList.remove("start");
        startButton.classList.add("stop");
        startButton.textContent = "STOP";
        startDrawingCards();
    } else {
        startButton.classList.remove("stop");
        startButton.classList.add("start");
        startButton.textContent = "START";
        stopDrawingCards();
    }
});

speedInput.addEventListener("input", function () {
    rangeDisplay.textContent = "Value: " + speedInput.value + "ms";
});
