import TimerBar from './components/TimerBar';

const cardPool = [
    { question: "한국의 독립 선언일은?", answer: "1919년 3월 1일" },
    { question: "임시정부가 수립된 도시는?", answer: "상하이" },
    { question: "독립선언서 낭독 장소는?", answer: "태화관" },
    { question: "조선어학회 사건이 일어난 연도는?", answer: "1942년" },
    { question: "신간회의 강령 3가지 중 하나는?", answer: "비타협적 민족운동" },
    { question: "한글날의 원래 이름은?", answer: "가갸날" },
    { question: "병인양요가 일어난 연도는?", answer: "1866년" },
    { question: "조선 최초의 신문은?", answer: "한성순보" },
    { question: "신미양요의 발단이 된 사건은?", answer: "제너럴셔먼호 사건" },
    { question: "105인 사건을 조작한 총독은?", answer: "데라우치" },
    { question: "국채보상운동을 시작한 사람은?", answer: "서상돈" },
    { question: "조선어학회가 만든 것은?", answer: "한글맞춤법통일안" },
    { question: "조선총독부 초대 경무총장은?", answer: "마루야마" },
    { question: "조선어학회 사건 당시 투옥된 인원은?", answer: "33명" },
    { question: "신간회 해소 이유 중 하나는?", answer: "민중대회 사건" },
    { question: "국권피탈 직전 군대해산 연도는?", answer: "1907년" },
    { question: "강화도조약 체결 시기는?", answer: "1876년 2월" },
    { question: "교조신원운동을 주도한 교단은?", answer: "동학" },
    { question: "조선혁명선언을 작성한 사람은?", answer: "신채호" },
    { question: "한국광복군 총사령관은?", answer: "지청천" },
    { question: "황국신민서사의 시행 연도는?", answer: "1937년" },
    { question: "조선총독부의 노동쟁의조정법 시행연도는?", answer: "1923년" },
    { question: "브나로드 운동을 전개한 단체는?", answer: "동아일보" },
    { question: "민립대학 설립운동의 목표 금액은?", answer: "1천만원" },
    { question: "경성제국대학 설립 연도는?", answer: "1924년" },
    { question: "치안유지법이 제정된 연도는?", answer: "1925년" },
    { question: "조선청년독립단의 결성 장소는?", answer: "삼원보" },
    { question: "정철의 관동별곡 창작 시기는?", answer: "1580년" },
    { question: "조선어학회 회장은?", answer: "이윤재" },
    { question: "조선총독부 설치 법령 공포일은?", answer: "1910년 9월 30일" },
    { question: "한글맞춤법통일안 공표 연도는?", answer: "1933년" },
    { question: "육영공원의 설립 연도는?", answer: "1886년" },
    { question: "독립협회의 해산 연도는?", answer: "1898년" },
    { question: "조선형평사의 설립 목적은?", answer: "백정 차별 철폐" },
    { question: "원산학사의 설립 연도는?", answer: "1883년" },
    { question: "조선어연구회의 초대 회장은?", answer: "주시경" },
    { question: "국문연구소가 설치된 연도는?", answer: "1907년" },
    { question: "대한매일신보의 발행인은?", answer: "베델" },
    { question: "105인 사건의 발생 연도는?", answer: "1911년" },
    { question: "한국독립운동지혈사의 저자는?", answer: "박은식" }
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
    }, 500);
    
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
        modalMessage.textContent = '모든 레벨을 클리어하셨습니다!';
        nextLevelBtn.style.display = 'none';
        skipLevelBtn.style.display = 'none';
    }
});