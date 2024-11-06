// 게임 레벨 데이터
const gameLevels = [
    {
        level: 1,
        size: 4, // 2x2
        timeLimit: 60,
        cards: [
            { question: "한국의 독립 선언일은?", answer: "1919년 3월 1일" },
            { question: "임시정부가 수립된 도시는?", answer: "상하이" }
        ]
    },
    {
        level: 2,
        size: 6, // 3x2
        timeLimit: 90,
        cards: [
            { question: "독립운동가 이승만의 직위는?", answer: "대한민국 초대 대통령" },
            { question: "대한민국의 첫 번째 헌법은?", answer: "1948년 헌법" },
            { question: "한국 광복군은 어떤 나라와 전투를 했나요?", answer: "일본" }
        ]
    },
    {
        level: 3,
        size: 8, // 4x2
        timeLimit: 120,
        cards: [
            { question: "3.1 운동의 주요 목적은?", answer: "대한민국의 독립" },
            { question: "한민족의 자주독립을 주장한 사상가는?", answer: "안중근" },
            { question: "독립군의 주요 활동지는?", answer: "만주" },
            { question: "신간회는 언제 설립되었나요?", answer: "1927년" }
        ]
    },
    {
        level: 4,
        size: 12, // 4x3
        timeLimit: 150,
        cards: [
            { question: "한국광복군 총사령관은?", answer: "지청천" },
            { question: "윤봉길 의사의 의거 장소는?", answer: "홍커우 공원" },
            { question: "대한민국 임시정부의 초대 대통령은?", answer: "이승만" },
            { question: "조선어학회가 만든 것은?", answer: "한글맞춤법통일안" },
            { question: "청산리 전투의 승리를 이끈 장군은?", answer: "김좌진" },
            { question: "1940년 한국광복군이 창설된 도시는?", answer: "충칭" }
        ]
    },
    {
        level: 5,
        size: 16, // 4x4
        timeLimit: 180,
        cards: [
            { question: "한국독립당을 창당한 인물은?", answer: "김구" },
            { question: "봉오동 전투의 승리를 이끈 장군은?", answer: "홍범도" },
            { question: "대한민국 임시헌장이 반포된 연도는?", answer: "1919년" },
            { question: "조선물산장려운동의 주요 구호는?", answer: "내 살림 내 것으로" },
            { question: "신흥무관학교의 설립 목적은?", answer: "독립군 양성" },
            { question: "민족대표 33인의 대표는?", answer: "손병희" },
            { question: "조선어학회 사건이 일어난 연도는?", answer: "1942년" },
            { question: "한인애국단을 조직한 인물은?", answer: "김구" }
        ]
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
let starsCount = 3;

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
const modalStars = document.getElementById('modalStars');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const retryButton = document.getElementById('retryButton');
const starsContainer = document.getElementById('stars');

// 별 업데이트 함수
function updateStars() {
    starsContainer.textContent = '⭐'.repeat(starsCount);
}

// 게임 시작
document.getElementById('startButton').addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    startLevel(1);
});

// 레벨 시작
function startLevel(level) {
    currentLevel = level;
    currentLevelSpan.textContent = level;
    starsCount = 3; // 별 개수 초기화
    updateStars(); // 별 표시 업데이트
    resetGameState();
    createBoard();
    startTimer();
}

// 게임 상태 초기화
function resetGameState() {
    cardValues = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    if (timerInterval) clearInterval(timerInterval);
}

// 보드 생성
function createBoard() {
    gameBoard.innerHTML = '';
    const levelData = gameLevels[currentLevel - 1];
    const columns = Math.ceil(Math.sqrt(levelData.size));
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    
    // 카드 값 생성
    cardValues = [];
    levelData.cards.forEach(({ question, answer }) => {
        cardValues.push({ text: question, type: "question" });
        cardValues.push({ text: answer, type: "answer" });
    });
    
    shuffle(cardValues);
    
    // 카드 생성
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
        const matchingCard = gameLevels[currentLevel - 1].cards.find(card => 
            card.question === firstCard.dataset.value && 
            card.answer === secondCard.dataset.value
        );
        isMatch = !!matchingCard;
    } else if (firstCard.dataset.type === "answer" && secondCard.dataset.type === "question") {
        const matchingCard = gameLevels[currentLevel - 1].cards.find(card => 
            card.answer === firstCard.dataset.value && 
            card.question === secondCard.dataset.value
        );
        isMatch = !!matchingCard;
    }

    isMatch ? disableCards() : unflipCards();
}

// 매치 성공 처리
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

    matchedPairs++;
    const levelData = gameLevels[currentLevel - 1];
    
    if (matchedPairs === levelData.cards.length) {
        levelComplete();
    }
}

// 매치 실패 처리
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
        
        // 별 개수 감소
        if (starsCount > 0) { // 최소 1개의 별은 유지
            starsCount--;
            updateStars();


            // 별이 다 소진되면 게임 오버
            if (starsCount === 0) {
                clearInterval(timerInterval);
                showGameOver('stars')
            }
        }
    }, 1000);
}

// 보드 상태 초기화
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// 타이머 시작
function startTimer() {
    const levelData = gameLevels[currentLevel - 1];
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

// 레벨 완료 처리
function levelComplete() {
    clearInterval(timerInterval);
    modalTitle.textContent = `레벨 ${currentLevel} 클리어!`;
    modalMessage.textContent = `축하합니다! ${starsCount}개의 별을 획득했습니다!`;
    modalStars.textContent = '⭐'.repeat(starsCount);
    modalOverlay.classList.remove('hidden');  // 변경된 부분
    nextLevelBtn.style.display = 'inline-block';
}

// 다음 레벨로 이동
nextLevelBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');  // 변경된 부분
    startLevel(currentLevel + 1);
});

// 재시작 처리
retryButton.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');  // 변경된 부분
    nextLevelBtn.style.display = 'inline-block';  // 재시작시 다음 레벨 버튼 다시 표시
    startLevel(currentLevel);
});

// 게임 종료 처리
function showGameOver(reason) {
    clearInterval(timerInterval);
    modalTitle.textContent = '게임 오버';
    
    if (reason === 'stars') {
        modalMessage.textContent = '별을 모두 소진했습니다! 더 신중하게 도전해보세요.';
    } else {
        modalMessage.textContent = `시간이 초과되었습니다! ${starsCount}개의 별이 남았습니다.`;
    }
    
    modalStars.textContent = '⭐'.repeat(starsCount);
    modalOverlay.classList.remove('hidden');  // 변경된 부분
    nextLevelBtn.style.display = 'none';  // 게임 오버시 다음 레벨 버튼 숨기기
}

// 카드 셔플 함수
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}