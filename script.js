const screens = document.querySelectorAll('.screen');
const insectBtns = document.querySelectorAll('.choose-insect-btn');
const startBtn = document.getElementById('start-btn');
const time = document.getElementById('time');
const score = document.getElementById('score');
const message = document.getElementById('message');
const container = document.getElementById('game-container');

let seconds = 0;
let userScore = 0;
let selectedInsect = {};

const getRandomLocation = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return {x, y}
}

const increaseScore = () => {
    userScore++;

    if (userScore > 5) {
        message.classList.add('visible')
    } 

    score.innerHTML = `Score: ${userScore}`
}

const addInsects = () => {
    
    for (let i = 0; i < 10; i++) {
        setTimeout(createInsect, i * 100);
    }
}

const caughtInsect = (e) => {
    const insect = e.target;
    increaseScore();
    insect.classList.add('caught');
    document.querySelectorAll(".insect").forEach(e => e.parentNode.removeChild(e));
    addInsects();
}

const createInsect = () => {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();

    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;

    insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() * 360}deg" />`;

    insect.addEventListener('click', (e) => {
        caughtInsect(e);
    })
    container.appendChild(insect);
}

const increaseTime = () => {
    let minutes = Math.floor(seconds / 60);
    let gameSeconds = seconds % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    gameSeconds = gameSeconds < 10 ? `0${gameSeconds}` : gameSeconds;
    time.innerHTML = `Time: ${minutes}:${gameSeconds}`;
    seconds++;
}

const startGame = () => {
    setInterval(increaseTime, 1000)
}

startBtn.addEventListener('click', () => {
    screens[0].classList.add('up');
})

insectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');

        selectedInsect = { src, alt }
        screens[1].classList.add('up');

        setTimeout(createInsect, 1000);
        startGame()
    })
})