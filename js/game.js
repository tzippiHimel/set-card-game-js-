let arrCardChoose = [];
let arrIdChoose = [];
let twelveCards = [];
let img = [];
const arrCards = [];
const arrColor = ['red', 'green', 'purple'];
const arrShape = ['ovel', 'wave', 'diamend'];
const arrNamber = [1, 2, 3];
const arrFilling = ['full', 'striped', 'empty'];
let points = 0;
let isHint = false;
let gameOver = false;
const currentUser = (JSON.parse(localStorage.getItem("currentUser")));
const usersArr = (JSON.parse(localStorage.getItem('user')));
const delay = ms => new Promise(res => setTimeout(res, ms));

const nav = document.createElement('nav');
nav.id = "nav";
document.body.appendChild(nav);

const timer = document.createElement('div');
timer.id = "timer";
nav.appendChild(timer);

const instructions = document.createElement('button')
nav.appendChild(instructions);
instructions.innerHTML = "instructions"
instructions.addEventListener('click', () => {
    window.location.href = "../html/instructions.html"
})

const point = document.createElement('div');
point.id = 'point';
document.body.appendChild(point);
point.innerHTML = points + " points";

const thumb = document.createElement('h1');
thumb.id= "thumb";
document.body.appendChild(thumb);

const board = document.createElement('div');
board.setAttribute('id', 'board');
document.body.appendChild(board);

const btnAddThreeCards = document.createElement('button');
btnAddThreeCards.setAttribute('id', 'btnAddThreeCards')
nav.appendChild(btnAddThreeCards);
btnAddThreeCards.innerHTML = "add three cards"
btnAddThreeCards.addEventListener('click', AddThreeCards)

const newGame = document.createElement('button');
nav.appendChild(newGame);
newGame.addEventListener('click', () => {
    window.location.href = "../html/game.html";

})
newGame.innerHTML = "new game";

const btnlogout = document.createElement('button');
btnlogout.setAttribute('id', 'btnlogout')
nav.appendChild(btnlogout);
btnlogout.addEventListener('click', () => {
    window.location.href = "../html/login.html";
    localStorage.removeItem('currentUser');
})
btnlogout.innerHTML = "log out";

window.onload = function () {
    buildCardsArr()
    showCards();
}
//פנקציה שמערבבת את כל הכרטיסים
function shuffle(arrCards) {

    for (let i = arrCards.length - 1; i > 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1));
        let temp = arrCards[i];
        arrCards[i] = arrCards[randomNumber];
        arrCards[randomNumber] = temp;
    }

}

//טיימר
let countdown = 90;
document.addEventListener("DOMContentLoaded", function () {
     // 1.5 minutes in seconds
    let timerDisplay = document.getElementById("timer");
    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    function updateTimer() {
        timerDisplay.textContent = formatTime(countdown);
        countdown--;
        if (countdown < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
            showGameOver()
        }
    }
    let timerInterval = setInterval(updateTimer, 1000);
});

//לולאה שמכניסה את כל הקלפים לתוך מערך
function buildCardsArr() {
    let t = 1;
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            for (let k = 0; k < 3; k++)
                for (let s = 0; s < 3; s++) {
                    arrCards[t - 1] = new Cards(arrColor[i], arrShape[j], arrNamber[k], arrFilling[s], `../img/cards/${t}.png`, false);
                    t++;
                }
}

//פונקציה שמוסיפה 3 קלפים
function AddThreeCards() {
    if (twelveCards.length < 13) {
        for (let i = 0; i < 3; i++) {
            img[i + 12] = document.createElement('img');
            twelveCards[i + 12] = arrCards[0];
            img[i + 12].setAttribute('src', twelveCards[i + 12].img);
            twelveCards[i + 12] = arrCards[0];
            board.appendChild(img[i + 12]);
            img[i + 12].setAttribute('id', `img1${i + 12}`);
            arrCards.shift();
            img[i + 12].addEventListener('click', () => { cardChooce(twelveCards[i + 12], `img1${i + 12}`) });
        }
    }
}

// פונקציה שמניחה את כרטיסים
function showCards() {
    shuffle(arrCards)
    for (let i = 0; i < 12; i++) {
        img[i] = document.createElement('img');
        twelveCards[i] = arrCards[0];
        img[i].setAttribute('src', twelveCards[i].img);
        twelveCards[i] = arrCards[0];
        board.appendChild(img[i]);
        img[i].setAttribute('id', `img1${i}`);
        img[i].addEventListener('click', () => { cardChooce(twelveCards[i], `img1${i}`) });
        arrCards.shift();
    }
}




//פונקציה שמכניסה את הכרטיסים שבחר למער
const cardChooce = async (card, tagId) => {
    if (gameOver) {
        return;
    }
    const tag = document.getElementById(tagId);
    if (card.flag === false) {
        card.flag = true;
        arrCardChoose.push(card)
        arrIdChoose.push(tag)
        tag.style.opacity = "0.5";
        await delay(300);
    }
    else {
        card.flag = false;
        tag.style.opacity = "1";
        let index = arrCardChoose.indexOf(card);
        arrCardChoose.splice(index, 1);
        arrIdChoose.splice(index, 1);
    }
    if (arrCardChoose.length == 3) {

        let isgood = isSet(arrCardChoose[0], arrCardChoose[1], arrCardChoose[2]);
        if (isgood) {

            thumbs(isgood);
            if (twelveCards.length < 13)
                replaceCard(arrCardChoose);
            else {
                removeCard(arrCardChoose);
            }
            addPoints()
        }
        else
            thumbs(isgood);
        arrIdChoose.forEach((element) => element.style.opacity = "1")
        arrCardChoose.forEach((element) => element.flag = false)
        arrIdChoose = [];
        arrCardChoose = [];
    }
}
//פונקציה שבודקת האם זה סט או לא
function
    isSet(card1, card2, card3) {
    const feature = ['color', 'shape', 'number', 'filling'];
    for (let i = 0; i < 4; i++) {

        if ((card1[feature[i]] === card2[feature[i]] && card2[feature[i]] === card3[feature[i]]) || (card1[feature[i]] !== card2[feature[i]] && card1[feature[i]] !== card3[feature[i]] && card3[feature[i]] !== card2[feature[i]]))
            continue;
        else
            return false;
    }
    return true;
}
//פונקציה שמסירה את הקלפים ושמה קלפים חדשים
function replaceCard(arrCardChoose) {
    for (let i = 0; i < 3; i++) {
        let index = twelveCards.indexOf(arrCardChoose[i]);
        twelveCards[index] = arrCards[0];
        img[index].setAttribute('src', arrCards[0].img);
        arrCards.shift();
    }
}
//פונקציה שמסירה
function removeCard() {
    for (let i = 0; i < 3; i++) {
        let index = twelveCards.indexOf(arrCardChoose[i]);
        twelveCards[index] = twelveCards[12];
        img[index].setAttribute('src', twelveCards[12].img);
        arrIdChoose.splice(12 + i, 1);
        const element = document.getElementById(`img1${i + 12}`);
        element.remove();
        twelveCards.splice(12, 1);
    }
}

// פונקציה מוסיפה נקודות לשחקן 
function addPoints() {
    if (!isHint)
        points += 10;
    else {
        points += 5;
        isHint = false;
    }
    point.innerHTML = points + " points";
}
//פונקציה רמז
document.addEventListener("DOMContentLoaded", function () {
    const Hint = document.createElement('button');
    nav.appendChild(Hint);
    Hint.innerHTML = "Hint"
    function hintSet() {
        for (let x = 0; x < twelveCards.length; x++) {
            for (let y = 1; y < twelveCards.length; y++) {
                for (let z = 2; z < twelveCards.length; z++) {
                    if (isSet(twelveCards[x], twelveCards[y], twelveCards[z]) && (x != y && y != z && x != z)) {
                        let Sound = new Audio("../audio/click.mp3");
                        Sound.play();
                        const element1 = document.getElementById(`img1${z}`);
                        let animationInterval = setInterval(function () {
                            if (element1.style.boxShadow === "") {
                                element1.style.boxShadow = "0 0 70px red";
                                element1.style.borderRadius = "23px";
                            } else {
                                element1.style.boxShadow = "";
                                element1.style.borderRadius = "";
                            }
                        }, 500);
                        setTimeout(function () {
                            clearInterval(animationInterval);
                            element1.style.boxShadow = "";
                            element1.style.borderRadius = "";
                        }, 4000);
                        isHint = true;
                        return
                    }
                }
            }
        }
    }
    Hint.addEventListener('click', hintSet)
});
//פונקציה הצלחה/כישלון
function thumbs(isgood) {
    if (isgood) {
        let Sound = new Audio("../audio/interface-1-126517.mp3");
        Sound.play();
        thumb.innerHTML = "👍";
        countdown = 90
    }
    else {

        let Sound = new Audio("../audio/bad.mp3");
        Sound.play();
        thumb.innerHTML = "👎";
    }
    setTimeout(function () {
        thumb.innerHTML = "";
    }, 700)
}


//פונקציה משחק נגמר
function showGameOver() {
    gameOver = true;
    let sayGameOver = document.createElement("div");
    sayGameOver.className = "sayGameOver";
    sayGameOver.id = "sayGameOver";

    let sayGameOverChildimg = document.createElement("img");
    sayGameOver.append(sayGameOverChildimg);


    let sayGameOverChild = document.createElement("p");
    sayGameOverChild.innerText = `you got ${points} points`;
    sayGameOver.append(sayGameOverChild);

    let gameOverElement = document.createElement("div");
    gameOverElement.id = "gameOverElement";
    gameOverElement.append(sayGameOver);

    let sayGameOverChild1 = document.createElement("p")
    sayGameOver.append(sayGameOverChild1);

    if (currentUser.finalScore >= points) {
        sayGameOverChildimg.src = "../img/game_over(1).gif";
        let Sound = new Audio("../audio/level-win-6416.mp3");
        Sound.play();
        sayGameOverChild1.innerText = `Your record is: ${currentUser.finalScore}`
    }
    else {
        sayGameOver.id = "sayGameWin";
        sayGameOverChildimg.src = "../img/win.png";
        let Sound = new Audio("../audio/game_win.mp3");
        Sound.play();
        currentUser.finalScore = points
        sayGameOverChild1.innerText = `You broke a record: ${currentUser.finalScore}`
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        usersArr.forEach(e => {
            if (e.user == currentUser.user) {
                e.finalScore = currentUser.finalScore;
            }
        })
        localStorage.setItem("user", JSON.stringify(usersArr));
    }

    let sayGameOverChildbtn1 = document.createElement("button");
    sayGameOverChildbtn1.innerText = "Start a new game";
    sayGameOverChildbtn1.addEventListener("click", () => location.replace("./game.html"));
    sayGameOver.append(sayGameOverChildbtn1);
    
    let sayGameOverChildbtn2 = document.createElement("button");
    sayGameOverChildbtn2.innerText = "Return to the home screen";
    sayGameOverChildbtn2.addEventListener("click", () => location.replace("./home.html"));
    sayGameOver.append(sayGameOverChildbtn2);

    let body = document.querySelector("body");
    body.append(gameOverElement);
}

