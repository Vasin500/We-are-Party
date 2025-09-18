// --- DOM Elements ---
const cardDisplay = document.getElementById('card-display');
const endGameControls = document.getElementById('end-game-controls');
const restartButton = document.getElementById('restart-button');

// --- Game State ---
const MAX_DRAWS = 30; // กติกาใหม่: จบเกมเมื่อครบ 30 ครั้ง
let drawCount = 0;    // ตัวแปรสำหรับนับจำนวนการจั่ว

// ชุดการ์ดสำหรับโหมด LifeStyle (เหมือนเดิม)
const lifestyleCards = [
    "งดเล่นโทรศัพท์หรือดื่ม2","เเชทหาเเฟนเก่าหรือดื่ม","เสื้อดำดื่ม","ใส่สร้อยดื่ม","คนที่ปกติใส่เเว่นดื่ม",
    "คนมีใบขับขี่ดื่มดื่ม","ให่ดูรูปล่าสุดในเครื่อง","คนน้ำหนักน้อยสุดดื่ม","คนสูงสุดดื่ม","คนโสดดื่ม",
    "เจาะหูดื่ม","คนที่เคยมีเเฟนมากสุดดื่ม","คนคนที่ยอดฟอลเยอะสุดดื่ม","มีเเฟนดื่ม","จัดฟันดื่ม",
    "คนเลี้ยงสัตว์ดื่ม","ผู้หญิงดื่ม","ผู้ชายดื่ม","เคยย้อมสีผมดื่ม","เเบตโทรศัพท์น้อยสุดดื่ม",
    "คนเสื้อขาวดื่ม","ใครทำเล็บดื่ม","ใส่กางเกงขายาวดื่ม","ใครใส่กางเกงขาสั้นดื่ม","บัตรประชาชนเป็นเด็กอยู่ดื่ม",
    "ใส่ขาสั้นดื่ม","ใครเเก่สุดดื่ม","เด็กสุดดื่ม","ใครจับโทรศัพท์อยู่ดื่ม","ใส่กระโปรงดื่ม",
    "ใส่กำไลดื่ม","ใกล้วันเกิดใครสุดดื่ม","ดื่มรอบวง","คนมาช้าสุดดื่ม","ไม่ใส่เเหวนดื่ม",
    "มีรถดื่ม","ไม่มีรถดื่ม","รองเท้าดำดื่ม","รองเท้าขาวดื่ม","มีคนคุยดื่ม",
    "ใครปากเเดงสุดดื่ม","โทรหาเพื่อนที่ไม่ได้อยู่ด้วย","ถ่ายรูปตัวเองตอนนี้ลงสตอรี่ลบได้ตอนเช้า","เดือนนี้ใครกินหมูทะมาดื่ม","บ้านใครอยู่ไกลดื่ม",
    "รองงเท้าเเตะดื่ม","เดือนนี้ใครกินเค้กดื่ม","มัดผมดื่ม","ใครมีเพื่อนเจ้าชู้ดื่ม","ถ่ายหน้าเพื่อนทางขวาลงสตอรี่",
    "ใครใส่หูฟังดื่ม","ใครศักดื่ม","เสื้อเหลืองดื่ม","ไม่มีรถดื่ม","เดือนนี้ใครไม่เข้าฟิตเนสดื่ม"
];
const allCards = lifestyleCards;

// --- Functions ---
function initializeGame() {
    drawCount = 0; // รีเซ็ตตัวนับ
    
    // อัปเดต UI เริ่มต้นให้แสดงจำนวนครั้งที่จั่ว
    updateCardContent('โหมด LifeStyle<br>ปัดเพื่อเริ่ม!');
    
    cardDisplay.style.transform = 'translate(0, 0) rotate(0deg)';
    cardDisplay.classList.remove('card-enter', 'card-exit');
    cardDisplay.classList.add('card-active');

    endGameControls.style.display = 'none';
}

function updateCardContent(cardText, isPlaying = false) {
    // ถ้ากำลังเล่นเกมอยู่ ให้แสดงตัวนับ
    if (isPlaying) {
        cardDisplay.innerHTML = `<p>${cardText}</p><span style="font-size: 1rem; color: #7f8c8d; margin-top: 15px;">${drawCount} / ${MAX_DRAWS}</span>`;
    } else {
        cardDisplay.innerHTML = `<p>${cardText}</p>`;
    }
}

function drawCard() {
    // ตรวจสอบว่าเกมจบหรือยัง
    if (drawCount >= MAX_DRAWS) {
        endGame();
        return;
    }
    
    drawCount++; // เพิ่มจำนวนครั้งที่จั่ว

    // สุ่มการ์ดใบใหม่จากสำรับทั้งหมด (สามารถสุ่มซ้ำได้)
    const randomIndex = Math.floor(Math.random() * allCards.length);
    const drawnCard = allCards[randomIndex];

    // อัปเดตเนื้อหาในการ์ดพร้อมแสดงตัวนับ
    updateCardContent(drawnCard, true);

    // จัดการ Animation การ์ดปรากฏขึ้น
    cardDisplay.classList.remove('card-enter', 'card-active');
    cardDisplay.classList.add('card-enter');
    setTimeout(() => {
        cardDisplay.classList.add('card-active');
    }, 10);

    // ถ้าจั่วครบ 30 ครั้งพอดี ให้จบเกม
    if (drawCount >= MAX_DRAWS) {
        setTimeout(endGame, 300);
    }
}

function endGame() {
    cardDisplay.classList.remove('card-enter', 'card-active');
    updateCardContent('จบเกมแล้ว!');
    endGameControls.style.display = 'flex';
}

// --- Hammer.js Swipe Logic ---
const cardElement = document.getElementById('card-display');
const hammer = new Hammer(cardElement);

hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

hammer.on('swipeup swipedown swipeleft swiperight', function(ev) {
    // ตรวจสอบเงื่อนไขจบเกมด้วย drawCount
    if (drawCount >= MAX_DRAWS) return;

    cardElement.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
    cardElement.classList.add('card-exit');

    const x = (ev.deltaX || 0) * 1.5;
    const y = (ev.deltaY || 0) * 1.5;
    const rotation = (ev.deltaX || 0) / 20;
    cardElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    setTimeout(() => {
        cardElement.style.transition = 'none';
        cardElement.style.transform = 'translate(0, 0) rotate(0deg)';
        cardElement.classList.remove('card-exit');
        drawCard();
    }, 500);
});

// --- Event Listeners ---
restartButton.addEventListener('click', initializeGame);

// --- Initial Setup ---
initializeGame();