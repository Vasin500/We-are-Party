// --- DOM Elements ---
const cardDisplay = document.getElementById('card-display');
const drawButton = document.getElementById('draw-button');
const endGameControls = document.getElementById('end-game-controls');
const restartButton = document.getElementById('restart-button');

// --- Game State ---
const MAX_DRAWS_PER_CARD = 3;
const initialCards = [
    'ดื่มคนเดียว','ซ้ายดื่ม','ขวาดื่ม','หาเพื่อนดื่ม','เลือก2คนดื่ม',
    'Alon(เพื่อนตอบเพื่อนโดน)','หัวหน้า(ถ้ายืนทุกคนต้องยืนตาม)','ดื่มรอบวง','เเข่งจ้องตาคนทางขวาเเพ้ดื่ม','พัก',
    'คนที่3ฝั่งซ้ายดื่ม','คนที่4ฝั่งขวาดื่ม','มินิเกม(คิดเอง)','บัดดี้(หาคนเเข่งเเพ้เป็นบัดดี้)','เเข่งจ้องตาคนทางซ้ายเเพ้ดื่ม',
    'ชมคนฝั่งซ้าย','ชมคนฝั่งขวา',
];
let cardCounts = {};
let totalDraws = 0;
const totalPossibleDraws = initialCards.length * MAX_DRAWS_PER_CARD;

// --- Functions ---
function initializeGame() {
    totalDraws = 0;
    cardCounts = {};
    initialCards.forEach(card => {
        cardCounts[card] = 0;
    });

    cardDisplay.innerHTML = '<p>ปัดการ์ดขึ้น<br>เพื่อจั่ว!</p>';
    cardDisplay.style.transform = 'translate(0, 0) rotate(0deg)'; // <-- เพิ่มบรรทัดนี้
    drawButton.style.display = 'none';
    endGameControls.style.display = 'none';
}

function drawCard() {
    const availableCards = initialCards.filter(card => cardCounts[card] < MAX_DRAWS_PER_CARD);

    if (availableCards.length === 0) {
        endGame();
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const drawnCard = availableCards[randomIndex];

    cardCounts[drawnCard]++;
    totalDraws++;

    cardDisplay.innerHTML = `<p>${drawnCard}</p><span style="font-size: 0.8rem; color: #7f8c8d;">(ครั้งที่ ${cardCounts[drawnCard]})</span>`;

    if (totalDraws >= totalPossibleDraws) {
        endGame();
    }
}

function endGame() {
    cardDisplay.innerHTML = '<p>การ์ดหมดแล้ว!</p>';
    endGameControls.style.display = 'flex';
}

// --- Hammer.js Swipe Logic ---
const cardElement = document.getElementById('card-display');
const hammer = new Hammer(cardElement);
// --- ตั้งค่าให้รับการปัดทุกทิศทาง ---
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

// เมื่อมีการปัดเกิดขึ้น
hammer.on('swipeup swipedown swipeleft swiperight', function(ev) {
    // ถ้าเกมจบแล้ว ไม่ต้องทำอะไร
    if (totalDraws >= totalPossibleDraws) return;

    // เพิ่ม Animation การ์ดลอยออกนอกจอ
    cardElement.style.transition = 'transform 0.5s ease-out';

    // คำนวณทิศทางการลอยของการ์ด
    const x = (ev.deltaX || 0) * 1.5;
    const y = (ev.deltaY || 0) * 1.5;
    const rotation = (ev.deltaX || 0) / 20; // เอียงการ์ดเล็กน้อยตอนปัด
    cardElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    // หลังจาก Animation จบ
    setTimeout(() => {
        // ซ่อนการ์ดและจั่วใบใหม่
        cardElement.style.transition = 'none'; // เอา transition ออกชั่วคราว
        cardElement.style.transform = 'translate(0, 0) rotate(0deg)'; // รีเซ็ตตำแหน่ง
        drawCard(); // จั่วการ์ดใบใหม่
    }, 500); // 500ms คือเวลาของ Animation
});

// --- Event Listeners ---
restartButton.addEventListener('click', initializeGame);

// --- Initial Setup ---
initializeGame();