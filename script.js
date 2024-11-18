const cardPool = [
    { question: "\"세월을 헛되이 보내지 마라, 청춘은 다시 돌아오지 않는다.\"를 말한 독립운동가는?", answer: "안중근" },
    { question: "\"나라에 바칠 목숨이 하나밖에 없는 것이 이 소녀의 유일한 슬픔입니다.\"를 말한 독립운동가는?", answer: "유관순" },
    { question: "명동성당에서 군밤장수로 변장하여 이완용을 암살 시도한 독립운동가는?", answer: "이재명" },
    { question: "\"그대는 나라를 사랑하는가. 그러면 먼저 그대가 건전한 인격이 되라.\"를 말한 독립운동가는?", answer: "안창호" },
    { question: "1920년 봉오동에서 일본군 대부대를 전멸시키는 전과를 올린 독립운동가는?", answer: "홍범도" },
    { question: "국채보상운동을 시작한 사람은?", answer: "서상돈" },
    { question: "한국광복군 총사령관은?", answer: "지청천" },
    { question: "조선총독부 설치 법령 공포일은?", answer: "1910년 9월 30일" },
    { question: "한글맞춤법통일안 공표 연도는?", answer: "1933년" },
    { question: "독립협회의 해산 연도는?", answer: "1898년" },
    { question: "국문연구소가 설치된 연도는?", answer: "1907년" },
    { question: "105인 사건의 발생 연도는?", answer: "1911년" },
    { question: "한국독립운동지혈사 저자는?", answer: "박은식" },
    { question: "\"야만 섬나라의 불학 무식한 놈아 너는 흉 자만 의 자는 모르느냐 나는 흉행이 나라 당당한 의행을 한 것이다\"를 말한 독립운동가는?", answer: "이재명" },
    { question: "\"그대는 나라를 사랑하는가. 그러면 먼저 그대가 건전한 인격이 되라.\"를 말한 독립운동가는?", answer: "안창호"},
    { question: "\"나는 무식하지만 한가지만은 똑똑히 안다. 내 땅을 남에게 빼앗기지 말아야 한다는 것이다.\"를 말한 독립운동가는?", answer: "홍범도"},
    { question: "\"나라 없는 몸, 무덤은 있어 무엇하랴.\"를 말한 독립운동가는?", answer: "김동삼"},
    { question: "\"살길은 하나다. 힘을 모으자.\"를 말한 독립운동가는?", answer: "지청전"},
    { question: "\"힘을 모아 도와주세, 우리의 명 만세로다.\"를 말한 독립운동가는?", answer: "윤희순"},
    { question: "\"먼 곳을 향하는 생각이 없다면 큰일을 이루기 어렵다.\"를 말한 독립운동가는?", answer: "안중근"},
    { question: "\"뿌리 없는 나무가 어디에서 날 것이며, 나라 없는 백성이 어디서 살 것인가.\"를 말한 독립운동가는?", answer: "안중근"},
    { question: "\"사람이 죽고 사는 것이 먹는데 있는 것이 아니고 정신에 있다. 독립은 정신으로 이루어지느니라.\"를 말한 독립운동가는?", answer: "남자현"},
    { question: "윤봉길 의사의 폭탄 투하를 도운 여성 독립운동가는?", answer: "이화림"},
    { question: "김구가 창설한 \'한인애국단\'에 가입한 여성 독립운동가는?", answer: "이화림"},
    { question: "독립운동가인 안중근 의사의 어머니는?", answer: "조마리아"},
    { question: "국채보상운동에 적극 참여하고, 독립운동 자금을 모으기 위해 노력한 여성 독립운동가는?", answer: "조마리아"},
    { question: "독립운동가들에게 숙박 및 식사를 제공하고, 뒷바라지에 힘쓴 여성 독립운동가는?", answer: "조마리아"},
    { question: "조선총독부 병원에서 간호사로 근무하였고, 조선인 부상자를 치료한 여성 독립운동가는?", answer: "박자혜"},
    { question: "간호사의 독립운동단체인 \'간우회\'를 창설한 여성 독립운동가는?", answer: "박자혜"},
    { question: "남편 신채호와 함께 독립운동가들을 적극적으로 지원한 여성 독립운동가는?", answer: "박자혜"},
    { question: "동경여자학원 재학 시절에 여학생들을 모아 2.8 독립선언문을 낭독한 여성 독립운동가는?", answer: "김마리아"},
    { question: "조국으로 돌아와서 여성들에게 독립운동 참여를 적극적으로 권유한 여성 독립운동가는?", answer: "김마리아"},
    { question: "\'대한민국애국부인회\'를 창설하고 회장직을 맡아 여성 독립운동 지휘에 힘쓴 여성 독립운동가는?", answer: "김마리아"},
    { question: "형제들과 함께 전 재산을 팔아 만주에 \'신흥 무관 학교\'를 설립한 독립운동가는?", answer: "이회영"},
    { question: "\'신민회\',\'헤이그 특사\',\'의열단\' 등 국외 항일 운동 전반에 관여한 독립운동가는?", answer: "이회영"},
    { question: "대표적인 저항 시인이고 \'님의 침묵\'이라는 시에서 조국의 독립 염원을 담은 시를 쓴 독립운동가는?", answer: "한용운"},
    { question: "물산장려운동을 지원하고, 창씨개명 반대운동을 주도한 독립운동가는?", answer: "한용운"},
    { question: "이토 히로부미를 쏴죽인 독립운동가는?", answer: "안중근"},
    { question: "일제 총독 암살 시도를 한 여성 독립운동가는?", answer: "남자현"},
    { question: "한국 최초의 여성 비행사로 복무한 여성 독립운동가는?", answer: "권기옥"},
    { question: "조선혁명국사정치간부학교 사관생도를 양성한 독립운동가는?", answer: "박차정"},
    { question: "조선의용대 부녀복무단을 조직하고 항일무장투쟁을 한 독립운동가는?", answer: "박차정"},
    { question: "1919년 대한민국 임시정부 임시의정원의 경상도 대표의원이 된 독립운동가는?", answer: "김갑"},
    { question: "1908년에 간도로 건너가 민족학교를 설립하여 국권회복을 위한 인재 양성에 힘을 쓴 독립운동가는?", answer: "이봉우"},
    { question: "고향의 전답을 팔아 부산에 백산상회를 설립하여 해외 독립 자금을 조달한 독립운동가는?", answer: "안희제"},
    { question: "일제의 부당함에 맞서 동래고등보통학교 동맹 휴학과 장산 촛불 시위를 주도한 독립운동가는?", answer: "박영출"},
    { question: "항일 의식이 강했기에 1919년 서울의 3.1운동 소식을 접하자 68세의 노령으로 앞장서서 참여한 여성 독립운동가는?", answer: "윤정은"},
    { question: "\'아리랑\'등 항일 가곡과 군가를 작곡하여 보급한 독립운동가는?", answer: "한형석"},
    { question: "충청남도 천안에서 일어난 아우내 독립만세운동을 주도한 독립운동가는?", answer: "김구응"},
    { question: "\"내 몸은 묶을지언정, 내 마음은 묶을 수 없을 것이다\"를 말한 독립운동가는?", answer: "어윤희"},
    { question: "\"조국, 이 말처럼 온 인류 각 민족에게 강력과 감동과 영향을 주는 말은 없다\"를 말한 독립운동가는?", answer: "이범석"},
    { question: "\"내가 죽어서 청년들의 가슴에 조그마한 충격이라도 줄 수 있다면 그것이 내가 소원하는 것이다\"를 말한 독립운동가는?", answer: "강우규"},
    { question: "\"남의 말로 사람을 평가하지 말라. 말을 옮기지 마라. 과묵하라\"를 말한 독립운동가는?", answer: "홍범도"},
];

const levelSettings  = [
    {
        level: 1,
        size: 6, // 3x2
        rows: 2,
        cols: 3,
        timeLimit: 45
    },
    {
        level: 2,
        size: 8, // 4x2
        rows: 2,
        cols: 4,
        timeLimit: 60
    },
    {
        level: 3,
        size: 12, // 4x3
        rows: 3,
        cols: 4,
        timeLimit: 90
    },
    {
        level: 4,
        size: 16, // 4x4
        rows: 4,
        cols: 4,
        timeLimit: 120
    },
    {
        level: 5,
        size: 24, // 6x4
        rows: 4,
        cols: 6,
        timeLimit: 150
    },
    {
        level: 6,
        size: 30, // 6x5
        rows: 5,
        cols: 6,
        timeLimit: 180
    }
];


// 게임 상태 변수
let currentLevel = 1;
let cardValues = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let timeLeft;
let timerInterval;
let previewTimeout;

// DOM 요소
const startScreen = document.getElementById('startScreen');
const gameContainer = document.getElementById('gameContainer');
const gameBoard = document.getElementById('gameBoard');
const currentLevelSpan = document.getElementById('currentLevel');
const timerSpan = document.getElementById('timer');
const modalOverlay = document.getElementById('modalOverlay');
const levelCompleteModal = document.getElementById('levelCompleteModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const viewAnswersBtn = document.getElementById('viewAnswersBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const retryBtn = document.getElementById('retryBtn');
const skipLevelBtn = document.getElementById('skipLevelBtn');

// 게임 시작
document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    startLevel(1);
});

// 카드 랜덤 선택 함수
function getRandomCards(count) {
    let shuffledPool = [...cardPool];
    for (let i = shuffledPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
    }
    return shuffledPool.slice(0, count);
}

let currentLevelCards = [];

// 레벨 시작
function startLevel(level) {
    currentLevel = level;
    currentLevelSpan.textContent = level;

    const levelData = levelSettings[currentLevel - 1];
    const selectedCards = getRandomCards(levelData.size / 2);
    currentLevelCards = selectedCards;

    const currentGameLevel = {
        ...levelData,
        cards: selectedCards
    };

    resetGameState();
    createBoard(currentGameLevel);
    showAllCards();

    previewTimeout = setTimeout(() => {
        hideAllCards();
        startTimer();
    }, 3000);
}

function showAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('flipped');
    });
    lockBoard = true;
}

function hideAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
    lockBoard = false;
}

// 게임 상태 초기화
function resetGameState() {
    cardValues = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    if (timerInterval) clearInterval(timerInterval);
    if (previewTimeout) clearTimeout(previewTimeout);
}

// 보드 생성
function createBoard(levelData) {
    gameBoard.innerHTML = '';
    
    gameBoard.style.gridTemplateColumns = `repeat(${levelData.cols}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${levelData.rows}, 1fr)`;
    
    cardValues = [];
    levelData.cards.forEach(({ question, answer }) => {
        cardValues.push({ text: question, type: "question" });
        cardValues.push({ text: answer, type: "answer" });
    });
    
    shuffle(cardValues);
    
    cardValues.forEach(item => {
        const card = createCard(item);
        gameBoard.appendChild(card);
    });
}

// 카드 생성
function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.type = item.type;
    card.dataset.value = item.text;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = item.text;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    
    card.addEventListener('click', flipCard);
    return card;
}

// 카드 뒤집기
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

// 매치 확인
function checkForMatch() {
    let isMatch = false;
    
    if (firstCard.dataset.type === "question" && secondCard.dataset.type === "answer") {
        const matchingCard = cardPool.find(card => 
            card.question === firstCard.dataset.value && 
            card.answer === secondCard.dataset.value
        );
        isMatch = !!matchingCard;
    } else if (firstCard.dataset.type === "answer" && secondCard.dataset.type === "question") {
        const matchingCard = cardPool.find(card => 
            card.answer === firstCard.dataset.value && 
            card.question === secondCard.dataset.value
        );
        isMatch = !!matchingCard;
    }

    if (isMatch) {
        disableCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('unmatched');
            secondCard.classList.remove('unmatched');
            unflipCards();
        }, 1500);
    }
}

// 매치 성공 처리
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard.classList.remove('unmatched');
    secondCard.classList.remove('unmatched');
    resetBoard();
    matchedPairs++;

    setTimeout(() => {
        firstCard.classList.add('blue');
        secondCard.classList.add('blue');
    }, 1000);
    
    const levelData = levelSettings[currentLevel - 1];
    if (matchedPairs === levelData.size / 2) {
        levelComplete();
    }
}

// 매치 실패 처리
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.add('unmatched');
        secondCard.classList.add('unmatched');
    },300)
    setTimeout(() => {
        firstCard.classList.remove('unmatched');
        secondCard.classList.remove('unmatched');
    }, 1000);
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// 보드 상태 초기화
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// 타이머 시작
function startTimer() {
    const levelData = levelSettings[currentLevel - 1];
    timeLeft = levelData.timeLimit;
    timerSpan.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showGameOver('time');
        }
    }, 1000);
}

function showLevelAnswers() {
    const levelAnswersContainer = document.getElementById('levelAnswers');
    levelAnswersContainer.innerHTML = '';  // 기존 정답 내용을 비웁니다.
    // 정답 대신에 비어있는 상태로 유지
}

// 레벨 완료 처리
function levelComplete() {
    clearInterval(timerInterval);
    modalTitle.textContent = `레벨 ${currentLevel} 클리어!`;
    modalMessage.textContent = '축하합니다!';
    nextLevelBtn.style.display = 'inline-block';
    modalOverlay.classList.remove('hidden');
}   

// 다음 레벨로 이동
nextLevelBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    if (currentLevel < levelSettings.length) {
        startLevel(currentLevel + 1);
    } else {
        modalMessage.textContent = '모든 레벨을 클리어하셨습니다!';
        nextLevelBtn.style.display = 'none';
    }
});

// 다시 시도 버튼 이벤트 리스너
retryBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    nextLevelBtn.style.display = 'inline-block';
    startLevel(currentLevel);
});

// 게임 종료 처리
function showGameOver(reason) {
    clearInterval(timerInterval);
    modalTitle.textContent = '게임 오버';
    modalMessage.textContent = '시간이 초과되었습니다!';
    nextLevelBtn.style.display = 'none';
    modalOverlay.classList.remove('hidden');
}

// 카드 셔플 함수
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// 정답 보기 버튼 클릭 이벤트 연결
viewAnswersBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    const answersContainer = document.createElement('div');
    answersContainer.id = 'answersScreen';
    answersContainer.style.padding = '20px';
    answersContainer.style.backgroundColor = 'white';
    answersContainer.style.borderRadius = '10px';
    answersContainer.style.maxWidth = '600px';
    answersContainer.style.margin = '20px auto';
    answersContainer.style.textAlign = 'center';

    const title = document.createElement('h2');
    title.textContent = `레벨 ${currentLevel} 카드 목록`;
    answersContainer.appendChild(title);

    const answersList = document.createElement('div');
    answersList.style.marginTop = '20px';
    currentLevelCards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.style.margin = '10px 0';
        cardDiv.style.padding = '10px';
        cardDiv.style.border = '1px solid #ddd';
        cardDiv.style.borderRadius = '5px';
        cardDiv.innerHTML = `<strong>문제 ${index + 1}:</strong> ${card.question}<br>
                           <strong>답:</strong> ${card.answer}`;
        answersList.appendChild(cardDiv);
    });
    answersContainer.appendChild(answersList);

    const backButton = document.createElement('button');
    backButton.textContent = "뒤로 가기";
    backButton.classList.add('modal-button');
    backButton.style.marginTop = '20px';
    backButton.addEventListener('click', () => {
        answersContainer.remove();
        modalOverlay.classList.remove('hidden');
    });

    answersContainer.appendChild(backButton);
    document.body.appendChild(answersContainer);
});

skipLevelBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    if (currentLevel < levelSettings.length) {
        startLevel(currentLevel + 1);
    } else {
        alert("마지막 스테이지입니다.")
    }
});