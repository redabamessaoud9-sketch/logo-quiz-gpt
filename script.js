/*==================================================
 LOGOMASTER
 script.js
 PARTIE 1A
 Variables globales
==================================================*/


/*=========================================
CONFIGURATION
=========================================*/

const GAME_CONFIG = {

    QUESTIONS_PER_GAME:20,

    START_LIVES:3,

    START_LEVEL:1,

    START_XP:0,

    TIMER:30,

    XP_PER_GOOD:10,

    XP_PER_LEVEL:200,

    DAILY_BONUS:50

};



/*=========================================
GAME STATE
=========================================*/

let currentQuestion = 0;

let currentScore = 0;

let currentLives = GAME_CONFIG.START_LIVES;

let currentXP = 0;

let currentLevel = 1;

let timer = GAME_CONFIG.TIMER;

let timerInterval = null;

let currentCategory = "all";

let currentQuestions = [];

let currentQuestionData = null;

let gameStarted = false;

let gameFinished = false;

let answerLocked = false;

let coins = 2450;

let streak = 5;

let hints = {

    fifty:3,

    reveal:3,

    skip:3

};



/*=========================================
PLAYER
=========================================*/

const player = {

    username:"Player",

    score:0,

    bestScore:0,

    gamesPlayed:0,

    wins:0,

    losses:0,

    xp:0,

    level:1,

    coins:2450,

    streak:5

};



/*=========================================
LOCAL STORAGE
=========================================*/

const STORAGE_KEYS={

    PLAYER:"logomaster-player",

    SETTINGS:"logomaster-settings",

    SCORES:"logomaster-scores",

    ACHIEVEMENTS:"logomaster-achievements"

};



/*=========================================
SETTINGS
=========================================*/

const settings={

    sound:true,

    music:true,

    darkMode:false,

    language:"fr",

    animations:true

};



/*=========================================
DOM
=========================================*/

const homeScreen=document.getElementById("home-screen");

const gameScreen=document.getElementById("game-screen");



/*=========================================
HOME
=========================================*/

const playButton=document.getElementById("play-btn");



/*=========================================
GAME
=========================================*/

const logoImage=document.getElementById("logo-image");

const answersContainer=document.getElementById("answers-container");



/*=========================================
HEADER
=========================================*/

const coinsText=document.querySelector(".coins");

const livesText=document.querySelector(".lives");



/*=========================================
LEVEL
=========================================*/

const progressBar=document.querySelector(".progress-fill");

const levelText=document.querySelector(".level-top span");



/*=========================================
BOTTOM NAVIGATION
=========================================*/

const navigationButtons=document.querySelectorAll(".nav-item");



/*=========================================
BUTTONS
=========================================*/

const hintButtons=document.querySelectorAll(".hint-bar button");



/*=========================================
AUDIO
=========================================*/

const sounds={

    click:new Audio("assets/sounds/click.mp3"),

    correct:new Audio("assets/sounds/correct.mp3"),

    wrong:new Audio("assets/sounds/wrong.mp3"),

    music:new Audio("assets/sounds/music.mp3")

};

sounds.music.loop=true;

sounds.music.volume=.3;



/*=========================================
QUESTION DATABASE
=========================================*/

let logos=[];



/*=========================================
HELPERS
=========================================*/

function random(min,max){

    return Math.floor(

        Math.random()*(max-min)+min

    );

}



function shuffle(array){

    for(

        let i=array.length-1;

        i>0;

        i--

    ){

        const j=Math.floor(

            Math.random()*(i+1)

        );

        [

            array[i],

            array[j]

        ]=[

            array[j],

            array[i]

        ];

    }

    return array;

}



function playSound(name){

    if(!settings.sound) return;

    sounds[name].currentTime=0;

    sounds[name].play();

}



/*=========================================
SAVE
=========================================*/

function savePlayer(){

    localStorage.setItem(

        STORAGE_KEYS.PLAYER,

        JSON.stringify(player)

    );

}



function loadPlayer(){

    const save=

    localStorage.getItem(

        STORAGE_KEYS.PLAYER

    );

    if(save){

        Object.assign(

            player,

            JSON.parse(save)

        );

    }

}



/*=========================================
LOAD SETTINGS
=========================================*/

function loadSettings(){

    const save=

    localStorage.getItem(

        STORAGE_KEYS.SETTINGS

    );

    if(save){

        Object.assign(

            settings,

            JSON.parse(save)

        );

    }

}



/*=========================================
SAVE SETTINGS
=========================================*/

function saveSettings(){

    localStorage.setItem(

        STORAGE_KEYS.SETTINGS,

        JSON.stringify(settings)

    );

}



/*=========================================
UPDATE UI
=========================================*/

function updateHeader(){

    coinsText.textContent="💎 "+player.coins;

    livesText.innerHTML=

        "❤️".repeat(currentLives)+

        "🤍".repeat(

            GAME_CONFIG.START_LIVES-currentLives

        );

}



/*=========================================
INITIALISATION
=========================================*/

window.addEventListener(

    "load",

    ()=>{

        loadPlayer();

        loadSettings();

        updateHeader();

    }

);/*==================================================
 LOGOMASTER
 script.js
 PARTIE 1A
 Variables globales
==================================================*/


/*=========================================
CONFIGURATION
=========================================*/

const GAME_CONFIG = {

    QUESTIONS_PER_GAME:20,

    START_LIVES:3,

    START_LEVEL:1,

    START_XP:0,

    TIMER:30,

    XP_PER_GOOD:10,

    XP_PER_LEVEL:200,

    DAILY_BONUS:50

};



/*=========================================
GAME STATE
=========================================*/

let currentQuestion = 0;

let currentScore = 0;

let currentLives = GAME_CONFIG.START_LIVES;

let currentXP = 0;

let currentLevel = 1;

let timer = GAME_CONFIG.TIMER;

let timerInterval = null;

let currentCategory = "all";

let currentQuestions = [];

let currentQuestionData = null;

let gameStarted = false;

let gameFinished = false;

let answerLocked = false;

let coins = 2450;

let streak = 5;

let hints = {

    fifty:3,

    reveal:3,

    skip:3

};



/*=========================================
PLAYER
=========================================*/

const player = {

    username:"Player",

    score:0,

    bestScore:0,

    gamesPlayed:0,

    wins:0,

    losses:0,

    xp:0,

    level:1,

    coins:2450,

    streak:5

};



/*=========================================
LOCAL STORAGE
=========================================*/

const STORAGE_KEYS={

    PLAYER:"logomaster-player",

    SETTINGS:"logomaster-settings",

    SCORES:"logomaster-scores",

    ACHIEVEMENTS:"logomaster-achievements"

};



/*=========================================
SETTINGS
=========================================*/

const settings={

    sound:true,

    music:true,

    darkMode:false,

    language:"fr",

    animations:true

};



/*=========================================
DOM
=========================================*/

const homeScreen=document.getElementById("home-screen");

const gameScreen=document.getElementById("game-screen");



/*=========================================
HOME
=========================================*/

const playButton=document.getElementById("play-btn");



/*=========================================
GAME
=========================================*/

const logoImage=document.getElementById("logo-image");

const answersContainer=document.getElementById("answers-container");



/*=========================================
HEADER
=========================================*/

const coinsText=document.querySelector(".coins");

const livesText=document.querySelector(".lives");



/*=========================================
LEVEL
=========================================*/

const progressBar=document.querySelector(".progress-fill");

const levelText=document.querySelector(".level-top span");



/*=========================================
BOTTOM NAVIGATION
=========================================*/

const navigationButtons=document.querySelectorAll(".nav-item");



/*=========================================
BUTTONS
=========================================*/

const hintButtons=document.querySelectorAll(".hint-bar button");



/*=========================================
AUDIO
=========================================*/

const sounds={

    click:new Audio("assets/sounds/click.mp3"),

    correct:new Audio("assets/sounds/correct.mp3"),

    wrong:new Audio("assets/sounds/wrong.mp3"),

    music:new Audio("assets/sounds/music.mp3")

};

sounds.music.loop=true;

sounds.music.volume=.3;



/*=========================================
QUESTION DATABASE
=========================================*/

let logos=[];



/*=========================================
HELPERS
=========================================*/

function random(min,max){

    return Math.floor(

        Math.random()*(max-min)+min

    );

}



function shuffle(array){

    for(

        let i=array.length-1;

        i>0;

        i--

    ){

        const j=Math.floor(

            Math.random()*(i+1)

        );

        [

            array[i],

            array[j]

        ]=[

            array[j],

            array[i]

        ];

    }

    return array;

}



function playSound(name){

    if(!settings.sound) return;

    sounds[name].currentTime=0;

    sounds[name].play();

}



/*=========================================
SAVE
=========================================*/

function savePlayer(){

    localStorage.setItem(

        STORAGE_KEYS.PLAYER,

        JSON.stringify(player)

    );

}



function loadPlayer(){

    const save=

    localStorage.getItem(

        STORAGE_KEYS.PLAYER

    );

    if(save){

        Object.assign(

            player,

            JSON.parse(save)

        );

    }

}



/*=========================================
LOAD SETTINGS
=========================================*/

function loadSettings(){

    const save=

    localStorage.getItem(

        STORAGE_KEYS.SETTINGS

    );

    if(save){

        Object.assign(

            settings,

            JSON.parse(save)

        );

    }

}



/*=========================================
SAVE SETTINGS
=========================================*/

function saveSettings(){

    localStorage.setItem(

        STORAGE_KEYS.SETTINGS,

        JSON.stringify(settings)

    );

}



/*=========================================
UPDATE UI
=========================================*/

function updateHeader(){

    coinsText.textContent="💎 "+player.coins;

    livesText.innerHTML=

        "❤️".repeat(currentLives)+

        "🤍".repeat(

            GAME_CONFIG.START_LIVES-currentLives

        );

}



/*=========================================
INITIALISATION
=========================================*/

window.addEventListener(

    "load",

    ()=>{

        loadPlayer();

        loadSettings();

        updateHeader();

    }

);
/*==================================================
 LOGOMASTER
 script.js
 PARTIE 1B
 Chargement des questions
==================================================*/


/*=========================================
CHARGER LE FICHIER JSON
=========================================*/

async function loadLogos() {

    try {

        const response = await fetch("data/logos.json");

        logos = await response.json();

        console.log("Logos chargés :", logos.length);

    } catch (error) {

        console.error("Impossible de charger logos.json");

    }

}


/*=========================================
DEMARRER UNE PARTIE
=========================================*/

function startGame(category = "all") {

    currentCategory = category;

    currentQuestion = 0;

    currentScore = 0;

    currentLives = GAME_CONFIG.START_LIVES;

    timer = GAME_CONFIG.TIMER;

    answerLocked = false;

    gameFinished = false;

    gameStarted = true;

    if (category === "all") {

        currentQuestions = [...logos];

    } else {

        currentQuestions = logos.filter(

            logo => logo.category === category

        );

    }

    shuffle(currentQuestions);

    currentQuestions = currentQuestions.slice(

        0,

        GAME_CONFIG.QUESTIONS_PER_GAME

    );

    updateHeader();

    loadQuestion();

}


/*=========================================
QUESTION SUIVANTE
=========================================*/

function loadQuestion() {

    answerLocked = false;

    if (

        currentQuestion >= currentQuestions.length ||

        currentLives <= 0

    ) {

        finishGame();

        return;

    }

    currentQuestionData =

        currentQuestions[currentQuestion];

    displayLogo();

    displayAnswers();

    updateProgress();

}


/*=========================================
AFFICHER LE LOGO
=========================================*/

function displayLogo() {

    logoImage.src = currentQuestionData.image;

    logoImage.alt = currentQuestionData.name;

}


/*=========================================
GENERER LES REPONSES
=========================================*/

function generateAnswers() {

    let answers = [];

    answers.push(currentQuestionData.name);

    while (answers.length < 4) {

        const randomLogo =

            logos[

                random(0, logos.length)

            ];

        if (

            !answers.includes(randomLogo.name)

        ) {

            answers.push(randomLogo.name);

        }

    }

    shuffle(answers);

    return answers;

}


/*=========================================
AFFICHER LES REPONSES
=========================================*/

function displayAnswers() {

    answersContainer.innerHTML = "";

    const answers = generateAnswers();

    answers.forEach(answer => {

        const button =

            document.createElement("button");

        button.className = "btn-answer";

        button.textContent = answer;

        button.onclick = () =>

            checkAnswer(button, answer);

        answersContainer.appendChild(button);

    });

}


/*=========================================
MISE A JOUR PROGRESSION
=========================================*/

function updateProgress() {

    const percent =

        ((currentQuestion + 1)

        / currentQuestions.length)

        * 100;

    progressBar.style.width =

        percent + "%";

    levelText.textContent =

        `Question ${currentQuestion + 1} / ${currentQuestions.length}`;

}


/*=========================================
BOUTON JOUER
=========================================*/

playButton.addEventListener(

    "click",

    () => {

        playSound("click");

        homeScreen.classList.remove("active");

        gameScreen.classList.add("active");

        startGame();

    }

);


/*=========================================
PRECHARGEMENT DES IMAGES
=========================================*/

function preloadImages() {

    logos.forEach(item => {

        const img = new Image();

        img.src = item.image;

    });

}


/*=========================================
INITIALISATION
=========================================*/

window.addEventListener(

    "load",

    async () => {

        loadPlayer();

        loadSettings();

        await loadLogos();

        preloadImages();

        updateHeader();

    }

);
/*==================================================
 LOGOMASTER
 script.js
 PARTIE 1C
 Navigation et Initialisation
==================================================*/


/*=========================================
ELEMENTS DES ECRANS
=========================================*/

const screens = document.querySelectorAll(".screen");

const homeButton = document.getElementById("home-btn");

const rankButton = document.getElementById("rank-btn");

const shopButton = document.getElementById("shop-btn");

const profileButton = document.getElementById("profile-btn");

const settingsButton = document.getElementById("settings-btn");



/*=========================================
AFFICHER UN ECRAN
=========================================*/

function showScreen(screenId){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    document
        .getElementById(screenId)
        .classList
        .add("active");

}



/*=========================================
RETOUR ACCUEIL
=========================================*/

function goHome(){

    playSound("click");

    clearInterval(timerInterval);

    gameStarted=false;

    showScreen("home-screen");

}



/*=========================================
OUVRIR LE JEU
=========================================*/

function openGame(){

    showScreen("game-screen");

}



/*=========================================
OUVRIR LE CLASSEMENT
=========================================*/

function openRanking(){

    showToast("Classement bientôt disponible");

}



/*=========================================
OUVRIR LA BOUTIQUE
=========================================*/

function openShop(){

    showToast("Boutique bientôt disponible");

}



/*=========================================
OUVRIR LE PROFIL
=========================================*/

function openProfile(){

    showToast("Profil bientôt disponible");

}



/*=========================================
PARAMETRES
=========================================*/

function openSettings(){

    showToast("Paramètres bientôt disponibles");

}



/*=========================================
MENU BAS
=========================================*/

navigationButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        navigationButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

    });

});



/*=========================================
RACCOURCIS
=========================================*/

if(homeButton){

    homeButton.onclick=goHome;

}

if(rankButton){

    rankButton.onclick=openRanking;

}

if(shopButton){

    shopButton.onclick=openShop;

}

if(profileButton){

    profileButton.onclick=openProfile;

}

if(settingsButton){

    settingsButton.onclick=openSettings;

}



/*=========================================
TOAST
=========================================*/

function showToast(message){

    let toast=document.querySelector(".toast");

    if(!toast){

        toast=document.createElement("div");

        toast.className="toast";

        document.body.appendChild(toast);

    }

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}



/*=========================================
REINITIALISER LA PARTIE
=========================================*/

function resetGame(){

    currentQuestion=0;

    currentScore=0;

    currentLives=GAME_CONFIG.START_LIVES;

    timer=GAME_CONFIG.TIMER;

    answerLocked=false;

    gameFinished=false;

    updateHeader();

}



/*=========================================
NOUVELLE PARTIE
=========================================*/

function newGame(category="all"){

    resetGame();

    openGame();

    startGame(category);

}



/*=========================================
DEMARRAGE
=========================================*/

function init(){

    loadPlayer();

    loadSettings();

    updateHeader();

    showScreen("home-screen");

}



/*=========================================
CHARGEMENT
=========================================*/

window.addEventListener("load",async()=>{

    await loadLogos();

    preloadImages();

    init();

});



/*=========================================
BOUTON JOUER
=========================================*/

playButton.addEventListener("click",()=>{

    playSound("click");

    newGame();

});



/*=========================================
RACCOURCI CLAVIER
=========================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        goHome();

    }

});



/*=========================================
DEBUG
=========================================*/

console.log("LogoMaster initialisé avec succès");
/*==================================================
 LOGOMASTER
 script.js
 PARTIE 2A
 Vérification des réponses
==================================================*/


/*=========================================
VERIFIER LA REPONSE
=========================================*/

function checkAnswer(button, answer){

    if(answerLocked) return;

    answerLocked = true;

    playSound("click");

    const buttons = document.querySelectorAll(".btn-answer");

    const correctAnswer = currentQuestionData.name;

    buttons.forEach(btn => {

        btn.disabled = true;

    });


    /*============================
      BONNE REPONSE
    ============================*/

    if(answer === correctAnswer){

        button.classList.add("correct");

        playSound("correct");

        currentScore++;

        player.score++;

        currentXP += GAME_CONFIG.XP_PER_GOOD;

    }

    /*============================
      MAUVAISE REPONSE
    ============================*/

    else{

        button.classList.add("wrong");

        playSound("wrong");

        currentLives--;

        updateHeader();

        buttons.forEach(btn=>{

            if(btn.textContent===correctAnswer){

                btn.classList.add("correct");

            }

        });

    }


    updateScore();

    setTimeout(nextQuestion,1200);

}



/*=========================================
QUESTION SUIVANTE
=========================================*/

function nextQuestion(){

    currentQuestion++;

    loadQuestion();

}



/*=========================================
MISE A JOUR SCORE
=========================================*/

function updateScore(){

    player.score = currentScore;

}



/*=========================================
MISE A JOUR VIES
=========================================*/

function loseLife(){

    currentLives--;

    updateHeader();

    if(currentLives<=0){

        finishGame();

    }

}



/*=========================================
AJOUTER SCORE
=========================================*/

function addScore(points){

    currentScore += points;

    player.score = currentScore;

}



/*=========================================
RETIRER SCORE
=========================================*/

function removeScore(points){

    currentScore -= points;

    if(currentScore<0){

        currentScore=0;

    }

    player.score=currentScore;

}



/*=========================================
AFFICHER LA BONNE REPONSE
=========================================*/

function revealCorrectAnswer(){

    document

        .querySelectorAll(".btn-answer")

        .forEach(btn=>{

            if(btn.textContent===currentQuestionData.name){

                btn.classList.add("correct");

            }

        });

}



/*=========================================
DESACTIVER LES REPONSES
=========================================*/

function disableAnswers(){

    document

        .querySelectorAll(".btn-answer")

        .forEach(btn=>{

            btn.disabled=true;

        });

}



/*=========================================
ACTIVER LES REPONSES
=========================================*/

function enableAnswers(){

    document

        .querySelectorAll(".btn-answer")

        .forEach(btn=>{

            btn.disabled=false;

            btn.classList.remove("correct");

            btn.classList.remove("wrong");

        });

}



/*=========================================
EFFET BONNE REPONSE
=========================================*/

function goodAnimation(button){

    button.classList.add("correct");

}



/*=========================================
EFFET MAUVAISE REPONSE
=========================================*/

function badAnimation(button){

    button.classList.add("wrong");

}



/*=========================================
COMPTER LES BONNES REPONSES
=========================================*/

let goodAnswers = 0;

let badAnswers = 0;



function registerGood(){

    goodAnswers++;

}



function registerBad(){

    badAnswers++;

}



/*=========================================
STATISTIQUES
=========================================*/

function updateStats(correct){

    if(correct){

        registerGood();

    }

    else{

        registerBad();

    }

}



/*=========================================
FIN SI PLUS DE VIES
=========================================*/

function checkLives(){

    if(currentLives<=0){

        finishGame();

    }

}



/*=========================================
REINITIALISER LE SCORE
=========================================*/

function resetScore(){

    currentScore=0;

    goodAnswers=0;

    badAnswers=0;

}



/*=========================================
REINITIALISER LES VIES
=========================================*/

function resetLives(){

    currentLives=GAME_CONFIG.START_LIVES;

    updateHeader();

}



/*=========================================
NOUVELLE QUESTION
=========================================*/

function prepareNextQuestion(){

    answerLocked=false;

    enableAnswers();

}



/*=========================================
QUESTION COMPLETE
=========================================*/

function nextQuestion(){

    prepareNextQuestion();

    currentQuestion++;

    loadQuestion();

}
/*==================================================
 LOGOMASTER
 script.js
 PARTIE 2B-1
 Timer + Barre de progression
==================================================*/


/*=========================================
 TIMER
=========================================*/

let timer = GAME_CONFIG.TIMER;

let timerInterval = null;


/*=========================================
 ELEMENTS DOM
=========================================*/

const timerText = document.getElementById("timer");
const progressFill = document.querySelector(".progress-fill");
const questionCounter = document.getElementById("question-counter");


/*=========================================
 LANCER LE TIMER
=========================================*/

function startTimer(){

    clearInterval(timerInterval);

    timer = GAME_CONFIG.TIMER;

    updateTimer();

    timerInterval = setInterval(()=>{

        timer--;

        updateTimer();

        if(timer <= 0){

            clearInterval(timerInterval);

            timeOut();

        }

    },1000);

}


/*=========================================
 METTRE A JOUR LE TIMER
=========================================*/

function updateTimer(){

    const minutes = Math.floor(timer / 60);

    const seconds = timer % 60;

    if(timerText){

        timerText.textContent =
            `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
    }

    if(timer <= 10){

        timerText.classList.add("timer-warning");

    }else{

        timerText.classList.remove("timer-warning");

        timerText.classList.remove("timer-danger");

    }

    if(timer <= 5){

        timerText.classList.add("timer-danger");

    }

}


/*=========================================
 TEMPS ECOULE
=========================================*/

function timeOut(){

    playSound("wrong");

    loseLife();

    revealCorrectAnswer();

    disableAnswers();

    setTimeout(()=>{

        nextQuestion();

    },1500);

}


/*=========================================
 STOP TIMER
=========================================*/

function stopTimer(){

    clearInterval(timerInterval);

}


/*=========================================
 RESET TIMER
=========================================*/

function resetTimer(){

    stopTimer();

    timer = GAME_CONFIG.TIMER;

    updateTimer();

}


/*=========================================
 BARRE DE PROGRESSION
=========================================*/

function updateProgressBar(){

    if(!progressFill) return;

    const progress =

        ((currentQuestion + 1) /

        GAME_CONFIG.QUESTIONS_PER_GAME)

        *100;

    progressFill.style.width = progress + "%";

}


/*=========================================
 NUMERO QUESTION
=========================================*/

function updateQuestionCounter(){

    if(questionCounter){

        questionCounter.textContent =

            `${currentQuestion + 1} / ${GAME_CONFIG.QUESTIONS_PER_GAME}`;

    }

}


/*=========================================
 MISE A JOUR COMPLETE
=========================================*/

function updateGameProgress(){

    updateProgressBar();

    updateQuestionCounter();

}


/*=========================================
 AU CHARGEMENT D'UNE QUESTION
=========================================*/

const oldLoadQuestion = loadQuestion;

loadQuestion = function(){

    oldLoadQuestion();

    updateGameProgress();

    startTimer();

};


/*=========================================
 A LA FIN DU JEU
=========================================*/

const oldFinishGame = finishGame;

finishGame = function(){

    stopTimer();

    oldFinishGame();

};


/*=========================================
 REINITIALISATION
=========================================*/

const oldResetGame = resetGame;

resetGame = function(){

    oldResetGame();

    resetTimer();

    updateGameProgress();

};


/*=========================================
 PAUSE / REPRISE
=========================================*/

function pauseGame(){

    stopTimer();

}

function resumeGame(){

    startTimer();

}


/*=========================================
 DEBUG
=========================================*/

console.log("Timer initialisé");
/*==================================================
 LOGOMASTER
 script.js
 PARTIE 2B-2A
 XP + Niveaux + Barre XP
==================================================*/


/*=========================================
CONFIGURATION XP
=========================================*/

const XP_CONFIG = {

    XP_PER_CORRECT:10,

    XP_PER_LEVEL:200,

    COINS_PER_LEVEL:100,

    MAX_LEVEL:50

};



/*=========================================
ELEMENTS DOM
=========================================*/

const levelNumber = document.getElementById("level-number");

const xpText = document.getElementById("xp-text");

const xpBar = document.getElementById("xp-bar");

const coinsLabel = document.querySelector(".coins");



/*=========================================
AJOUTER XP
=========================================*/

function addXP(amount){

    currentXP += amount;

    player.xp = currentXP;

    checkLevelUp();

    updateXPUI();

}



/*=========================================
RETIRER XP
=========================================*/

function removeXP(amount){

    currentXP -= amount;

    if(currentXP < 0){

        currentXP = 0;

    }

    player.xp = currentXP;

    updateXPUI();

}



/*=========================================
CALCUL NIVEAU
=========================================*/

function calculateLevel(){

    currentLevel =

        Math.floor(

            currentXP /

            XP_CONFIG.XP_PER_LEVEL

        ) + 1;

}



/*=========================================
XP NIVEAU ACTUEL
=========================================*/

function currentLevelXP(){

    return currentXP %

    XP_CONFIG.XP_PER_LEVEL;

}



/*=========================================
XP NIVEAU SUIVANT
=========================================*/

function nextLevelXP(){

    return XP_CONFIG.XP_PER_LEVEL;

}



/*=========================================
MONTER NIVEAU
=========================================*/

function checkLevelUp(){

    const oldLevel = player.level;

    calculateLevel();

    player.level = currentLevel;

    if(player.level > oldLevel){

        levelUp();

    }

}



/*=========================================
LEVEL UP
=========================================*/

function levelUp(){

    playSound("correct");

    player.coins +=

        XP_CONFIG.COINS_PER_LEVEL;

    showToast(

        "🎉 Niveau "

        + player.level +

        " atteint !"

    );

    animateXPBar();

}



/*=========================================
MISE A JOUR XP
=========================================*/

function updateXPUI(){

    const xp = currentLevelXP();

    const max = nextLevelXP();

    const percent =

        (xp / max) * 100;

    if(levelNumber){

        levelNumber.textContent =

            player.level;

    }

    if(xpText){

        xpText.textContent =

            `${xp} / ${max} XP`;

    }

    if(xpBar){

        xpBar.style.width =

            percent + "%";

    }

    if(coinsLabel){

        coinsLabel.textContent =

            "💎 " +

            player.coins;

    }

}



/*=========================================
ANIMATION BARRE XP
=========================================*/

function animateXPBar(){

    if(!xpBar) return;

    xpBar.animate(

        [

            {

                transform:"scaleX(.9)"

            },

            {

                transform:"scaleX(1.05)"

            },

            {

                transform:"scaleX(1)"

            }

        ],

        {

            duration:500

        }

    );

}



/*=========================================
GAIN APRES BONNE REPONSE
=========================================*/

function rewardCorrectAnswer(){

    addXP(

        XP_CONFIG.XP_PER_CORRECT

    );

}



/*=========================================
RESET XP
=========================================*/

function resetXP(){

    currentXP = player.xp;

    currentLevel = player.level;

    updateXPUI();

}



/*=========================================
INITIALISATION
=========================================*/

function initXP(){

    currentXP = player.xp || 0;

    currentLevel = player.level || 1;

    updateXPUI();

}



/*=========================================
CHARGEMENT
=========================================*/

window.addEventListener(

    "load",

    ()=>{

        initXP();

    }

);
/*==================================================
 LOGOMASTER
 script.js
 PARTIE 2B-2B-1
 LocalStorage
==================================================*/


/*=========================================
CLES LOCALSTORAGE
=========================================*/

const STORAGE = {

    PLAYER:"logomaster_player",

    SETTINGS:"logomaster_settings",

    SCORES:"logomaster_scores",

    ACHIEVEMENTS:"logomaster_achievements",

    STREAK:"logomaster_streak"

};



/*=========================================
SAUVEGARDER LE JOUEUR
=========================================*/

function savePlayer(){

    const data={

        username:player.username,

        level:player.level,

        xp:player.xp,

        coins:player.coins,

        score:player.score,

        bestScore:player.bestScore,

        gamesPlayed:player.gamesPlayed,

        wins:player.wins,

        losses:player.losses,

        streak:player.streak

    };

    localStorage.setItem(

        STORAGE.PLAYER,

        JSON.stringify(data)

    );

}



/*=========================================
CHARGER LE JOUEUR
=========================================*/

function loadPlayer(){

    const data=

        localStorage.getItem(

            STORAGE.PLAYER

        );

    if(!data) return;

    const save=

        JSON.parse(data);

    Object.assign(player,save);

}



/*=========================================
PARAMETRES
=========================================*/

function saveSettings(){

    localStorage.setItem(

        STORAGE.SETTINGS,

        JSON.stringify(settings)

    );

}



function loadSettings(){

    const save=

        localStorage.getItem(

            STORAGE.SETTINGS

        );

    if(!save) return;

    Object.assign(

        settings,

        JSON.parse(save)

    );

}



/*=========================================
MEILLEURS SCORES
=========================================*/

function saveScore(){

    let scores=

        JSON.parse(

            localStorage.getItem(

                STORAGE.SCORES

            )

        ) || [];

    scores.push({

        score:currentScore,

        level:player.level,

        date:new Date()

            .toLocaleDateString()

    });

    scores.sort(

        (a,b)=>

        b.score-a.score

    );

    scores=scores.slice(0,20);

    localStorage.setItem(

        STORAGE.SCORES,

        JSON.stringify(scores)

    );

}



/*=========================================
LIRE SCORES
=========================================*/

function loadScores(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE.SCORES

        )

    ) || [];

}



/*=========================================
EFFACER SCORES
=========================================*/

function clearScores(){

    localStorage.removeItem(

        STORAGE.SCORES

    );

}



/*=========================================
METTRE A JOUR MEILLEUR SCORE
=========================================*/

function updateBestScore(){

    if(

        currentScore>

        player.bestScore

    ){

        player.bestScore=

        currentScore;

    }

}



/*=========================================
STATISTIQUES
=========================================*/

function updatePlayerStats(win){

    player.gamesPlayed++;

    if(win){

        player.wins++;

    }

    else{

        player.losses++;

    }

}



/*=========================================
SAUVEGARDE COMPLETE
=========================================*/

function saveGame(){

    updateBestScore();

    savePlayer();

    saveSettings();

    saveScore();

}



/*=========================================
CHARGEMENT COMPLET
=========================================*/

function loadGame(){

    loadPlayer();

    loadSettings();

    updateHeader();

    updateXPUI();

}



/*=========================================
RESET PROGRESSION
=========================================*/

function resetProgress(){

    localStorage.removeItem(

        STORAGE.PLAYER

    );

    localStorage.removeItem(

        STORAGE.SETTINGS

    );

    localStorage.removeItem(

        STORAGE.SCORES

    );

    localStorage.removeItem(

        STORAGE.ACHIEVEMENTS

    );

    localStorage.removeItem(

        STORAGE.STREAK

    );

}



/*=========================================
SAUVEGARDE AUTOMATIQUE
=========================================*/

function autoSave(){

    savePlayer();

}



/*=========================================
AUTO SAVE
=========================================*/

setInterval(

    autoSave,

    10000

);



/*=========================================
FERMETURE PAGE
=========================================*/

window.addEventListener(

    "beforeunload",

    ()=>{

        saveGame();

    }

);



/*=========================================
INITIALISATION
=========================================*/

window.addEventListener(

    "load",

    ()=>{

        loadGame();

    }

);



/*=========================================
DEBUG
=========================================*/

console.log(

    "LocalStorage prêt."

);
