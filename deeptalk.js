// --- DOM Elements ---
const questionDisplay = document.getElementById('question-display');
const drawQuestionButton = document.getElementById('draw-question-button');
const endGameControls = document.getElementById('end-game-controls');
const restartButton = document.getElementById('restart-button');

// --- Game State ---
const MAX_DRAWS_PER_CARD = 2;
const questions = [
    "รักใครมากที่สุดในชีวิต",
    "เคยมีเเฟนมาเเล้วกี่คน",
    "เรื่องที่คนเข้าใจผิดเกี่ยวกับตัวคุณ",
    "เเฟนหรือเพื่อน",
    "โสดหรือมีเเฟน",
    "จะเเต่งงานตอนไหน",
    "หล่อ/สวยหรือรวยเก่ง",
    "ถ้าเลือก1คนไปติดเกราะด้วยจะเลือกใคร",
    "ชอบหนังเรื่องอะไร",
    "ยังคิดถึงคนเก่าอยู่มั้ย",
    "ถ้าเลือกได้อยากเป็นใคร",
    "เรื่องผิดพลาดล่าสุดที่ทำ",
    "เคยเเอบน้อยใจเเต่เพื่อนไม่รู้มั้ยเรื่องไร",
    "อยากได้อะไรวันเกิด",
    "อยากไปเที่ยวไหน",
    "ไม่ชอบอะไรในตัวเอง",
    "ชอบให้คนอื่นทำอะไรให้",
    "เรื่องที่ไม่กล้าพูด",
    "คำพูดที่ฝังใจ",
    "ไม่ชอบคนเเบบไหน",
    "เรื่องที่ไม่สบายใจตอนนี้",
    "กลัวเสียอะไรมากที่สุด",
    "เคยเสียใจที่ปล่อยใครไปไหม",
    "ชอบอยู่คนเดียวหรืออยู่กับเพื่อน",
    "ไปเที่ยวหรือนอน",
    "ชอบอะไรในตัวเพื่อฝั่งซ้าย",
    "ชอบอะไรในตัวเพื่อฝั่งขวา",
    "ถ้าเลือกได้อยากได้ใครเป็นเเฟน"
];
let questionCounts = {};
let totalDraws = 0;
const totalPossibleDraws = questions.length * MAX_DRAWS_PER_CARD;

// --- Functions ---
function initializeGame() {
    totalDraws = 0;
    questionCounts = {};
    questions.forEach(q => {
        questionCounts[q] = 0;
    });

    questionDisplay.innerHTML = '<p>ปัดการ์ดขึ้น<br>เพื่อสุ่มคำถาม</p>';
    questionDisplay.style.transform = 'translate(0, 0) rotate(0deg)'; // <-- เพิ่มบรรทัดนี้
    drawQuestionButton.style.display = 'none';
    endGameControls.style.display = 'none';
}

function drawQuestion() {
    const availableQuestions = questions.filter(q => questionCounts[q] < MAX_DRAWS_PER_CARD);

    if (availableQuestions.length === 0) {
        endGame();
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const drawnQuestion = availableQuestions[randomIndex];

    questionCounts[drawnQuestion]++;
    totalDraws++;

    questionDisplay.innerHTML = `<p>${drawnQuestion}</p><span style="font-size: 0.8rem; color: #7f8c8d;">(ครั้งที่ ${questionCounts[drawnQuestion]})</span>`;

    if (totalDraws >= totalPossibleDraws) {
        endGame();
    }
}

function endGame() {
    questionDisplay.innerHTML = '<p>คำถามหมดแล้ว!</p>';
    endGameControls.style.display = 'flex';
}

// --- Hammer.js Swipe Logic ---
const cardElement = document.getElementById('question-display');
const hammer = new Hammer(cardElement);

hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

hammer.on('swipeup swipedown swipeleft swiperight', function(ev) {
    if (totalDraws >= totalPossibleDraws) return;

    cardElement.style.transition = 'transform 0.5s ease-out';
    const x = (ev.deltaX || 0) * 1.5;
    const y = (ev.deltaY || 0) * 1.5;
    const rotation = (ev.deltaX || 0) / 20;
    cardElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    setTimeout(() => {
        cardElement.style.transition = 'none';
        cardElement.style.transform = 'translate(0, 0) rotate(0deg)';
        drawQuestion();
    }, 500);
});

// --- Event Listeners ---
restartButton.addEventListener('click', initializeGame);

// --- Initial Setup ---
initializeGame();