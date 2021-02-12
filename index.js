// Array with the urls
const urls = [   
        "candlestick_3_soldados_alta.png", 
        "candlestick_3_soldados_baixa.png",
        "candlestick_candle_forca.png",
        "candlestick_doji.png",
        "candlestick_enforcado.png",
        "candlestick_engolfo_alta.png",
        "candlestick_engolfo_baixa.png",
        "candlestick_estrela_cadente.png",
        "candlestick_estrela_da_manha.png",
        "candlestick_estrela_da_noite.png",
        "candlestick_harami.png",
        "candlestick_martelo_invertido.png",
        "candlestick_martelo.png",
        "candlestick_nuvem_negra.png",
        "candlestick_piercing_alta.png"
];

// Array with the answers
const answers = [
    "3 soldados de alta", 
    "3 soldados de baixa",
    "candle de força",
    "doji",
    "enforcado",
    "engolfo de alta",
    "engolfo de baixa",
    "estrela cadente",
    "estrela da manhã",
    "estrela da noite",
    "harami",
    "martelo invertido",
    "martelo",
    "nuvem negra",
    "piercing alta"
];

// Prevent default button
var submit_form = document.getElementById("form");

// Remove the prevent default
submit_form.onsubmit = (e) => {e.preventDefault();};

// Get the div to put the images
let divImageRandom = document.getElementsByClassName("cards-candles");

// Get the div to show if the answer is right or not
let divAnswerResponse = document.getElementsByClassName("response-answer");

// Create a element img
let imageCandlestick = document.createElement('img');

// Create a element img to answer
let imageAnswer = document.createElement('img');

// Create a element H2 to answer
let headerAnswer = document.createElement('H2');

// Variable to have all information
let infoAboutImages = [];

// Declaring the variable responsible to catch the answer
let answerCurrent;

// Variable to set if the theme is dark or white
let toogleDark = true;

// Function to verify if the answer is correct
const answerRight = async () => {
    // Get the answer typed for user
    let takeTheAnswer = document.getElementsByClassName('form_field')[0].value;
    console.log("TaketheAnswer: ", takeTheAnswer);
    if(takeTheAnswer !== null && takeTheAnswer !== '') {
        console.log("I have the answer!", takeTheAnswer);
        // Position of elements
        let pos = 0;
    
        // Identification of movement
        let id;
    
        // Function to make a animation
        function frame() {
            if(pos == 550) {
                for(let i = 0; i <= divAnswerResponse.length; i++) {
                    divAnswerResponse[i].remove();
                }
    
                clearInterval(id);
            } else {
                pos++; 
                for(let i = 0; i < divAnswerResponse.length; i++) {
                    // console.log(i);
                    divAnswerResponse[i].style.top = pos + 'px';
                } 
            }
        }
    
        divAnswerResponse[0].style.display = "block";
        
        // Comparing if the answer is correct
        if(takeTheAnswer.toLowerCase() === answerCurrent.toLowerCase()) {
            let textRightAnswer = document.createTextNode('Parabéns!');
            headerAnswer.appendChild(textRightAnswer);
            
            divAnswerResponse[0].classList.add('right-answer');
            
            imageAnswer.src = './images/bullTrader.png';
            
            divAnswerResponse[0].appendChild(headerAnswer);
            divAnswerResponse[0].appendChild(imageAnswer);
            
            id = setInterval(frame, 1);
            
            // alert("Parabéns!");
        } else {
            let textWrongAnswer = document.createTextNode('Estude Mais!');
            headerAnswer.appendChild(textWrongAnswer);
            
            divAnswerResponse[0].classList.add('wrong-answer');
    
            imageAnswer.src = './images/bearTrader.png';
            
            divAnswerResponse[0].appendChild(headerAnswer);
            divAnswerResponse[0].appendChild(imageAnswer);
            
            id = setInterval(frame, 1);
            
            // alert("Estude Mais!");
        }
    
        // Refresh the page
        setTimeout(() => location.reload(), 2000);
    } 
};

// Function random images
const randomImages = () => {
    console.log("Running RandomImages...");
    return(Math.floor(Math.random() * 15));
};

const main = () => {
    console.log("Running Main...");
    // Generate a randomic number
    const index = randomImages();

    // Generate a image to append in the div
    let currentImage = urls[index];

    // Catch the answer in the array
    answerCurrent = answers[index];

    // Put the image in the src
    imageCandlestick.src = `./images/${currentImage}`;

    // Adding the image in the div
    divImageRandom[0].appendChild(imageCandlestick);
};

// Switch the theme dark to light
const changeTheme = () => {
    let switchElement = document.getElementsByClassName("switch")[0];
    
    console.log("Value ToogleDark: ", toogleDark);
    let elementDark = document.getElementsByClassName("container")[0];

    if(toogleDark) {
        elementDark.classList.toggle("light-mode");
    } 

    toogleDark = !toogleDark;
};

// Running the main function
main();

// Loading the service worker to install and fetch to convert in PWA
if("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("SW Registered!"))
        .catch(err => console.error("SW Not Registerd! Error: ", err));
    });
}

// Trying make a push notification
// This ask to user if would like to receive notifications
// Notification.requestPermission(function(status) {
//     console.log('Notification permission status: ', status);
// });

// Creating a function notification
// function displayNotification() {
//     if(Notification.permission === "granted") {
//         navigator.serviceWorker.getRegistration().then(function(reg) {
//             var options = {
//                 body: "Aqui Você é Um Trader de Verdade!",
//                 icon: "images/bullVsBearWallpaper.png",
//                 vibrate: [100, 50, 100],
//                 data: {
//                     dateOfArrival: Date.now(), 
//                     primaryKey: 1
//                 }
//             };
//             reg.showNotification("Olá Trader!", options);
//         });
//     }
// }