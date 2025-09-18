// --- DOM Elements ---
const questionDisplay = document.getElementById('question-display');
const drawQuestionButton = document.getElementById('draw-question-button');
const endGameControls = document.getElementById('end-game-controls');
const restartButton = document.getElementById('restart-button');

// --- Game State ---
const MAX_DRAWS_PER_CARD = 4;
const questions = [
    "ความสำเร็จเล็กๆ ที่ภูมิใจ แต่ไม่ค่อยได้เล่าให้ใครฟังคืออะไร?",
    "ถ้าเงินไม่เป็นปัญหา อยากจะใช้ชีวิตหนึ่งวันเต็มๆ ทำอะไร?",
    "เรื่องอะไรที่คนส่วนใหญ่มักเข้าใจผิดเกี่ยวกับตัวคุณ?",
    "ความทรงจำในวัยเด็กเรื่องไหนที่ยังจำได้ชัดเจนที่สุด?",
    "ถ้าให้คะแนนความสุขในชีวิตตอนนี้ 1-10 คุณจะให้เท่าไหร่ เพราะอะไร?",
    "เป้าหมายในชีวิตที่เคยตั้งไว้ตอนเด็กๆ กับตอนนี้ ต่างกันแค่ไหน?",
    "คำแนะนำที่ดีที่สุดที่เคยได้รับมาคืออะไร?",
    "ถ้ามีไทม์แมชชีน จะกลับไปแก้ไขอดีต หรือไปดูอนาคต?",
    "หนังสือหรือหนังเรื่องไหน ที่เปลี่ยนมุมมองความคิดของคุณไปเลย?",
    "อะไรคือสิ่งที่ทำให้คุณรู้สึก 'เป็นตัวของตัวเอง' มากที่สุด?",
    "ถ้าเปรียบตัวเองเป็นสภาพอากาศ ตอนนี้คุณเป็นแบบไหน?",
    "คุณเรียนรู้อะไรจากความผิดพลาดครั้งใหญ่ที่สุดในชีวิต?",
    "ความกลัวที่สุดของคุณคืออะไร?",
    "ใครคือคนที่มีอิทธิพลต่อชีวิตคุณมากที่สุด และเพราะอะไร?"
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