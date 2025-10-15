// กำหนดขนาดของตาราง
const GRID_SIZE = 20; 
const beadCanvas = document.getElementById('beadCanvas');
const saveButton = document.getElementById('saveButton');
const colorSwatches = document.querySelectorAll('.color-swatch');

let currentColor = colorSwatches[0].getAttribute('data-color'); // สีเริ่มต้น

// ---------------------------------
// 1. สร้างตารางลูกปัด (Initialize Grid)
// ---------------------------------
function createGrid() {
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const bead = document.createElement('div');
        bead.classList.add('bead');
        // กำหนดสีเริ่มต้นเป็นสีขาว (พื้นหลัง)
        bead.setAttribute('data-color', '#FFFFFF'); 
        beadCanvas.appendChild(bead);
    }
}
createGrid();

// ---------------------------------
// 2. การเปลี่ยนสี (Drawing Logic)
// ---------------------------------
beadCanvas.addEventListener('click', function(event) {
    const bead = event.target;
    if (bead.classList.contains('bead')) {
        // วางลูกปัดด้วยสีปัจจุบัน
        bead.style.backgroundColor = currentColor;
        bead.setAttribute('data-color', currentColor);
    }
});

// ---------------------------------
// 3. การเลือกสี (Color Palette Logic)
// ---------------------------------
colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', function() {
        // ลบ active ออกจากทุกสี
        colorSwatches.forEach(s => s.classList.remove('active'));
        
        // กำหนดสีใหม่
        currentColor = this.getAttribute('data-color');
        
        // เพิ่ม active ให้สีที่เลือก
        this.classList.add('active');
        
        // ถ้าเป็นยางลบ ให้ตั้งค่า currentColor เป็นสีขาว (สีพื้นหลัง)
        if (this.classList.contains('eraser')) {
            currentColor = '#FFFFFF';
        }
    });
});

// ---------------------------------
// 4. ฟังก์ชันบันทึกภาพ (Save Image)
// ---------------------------------
saveButton.addEventListener('click', function() {
    // ใช้ html2canvas เพื่อแปลง Element เป็น Canvas
    // ต้องแปลงแค่ส่วนของตารางวาดรูปเท่านั้น
    html2canvas(beadCanvas, { 
        backgroundColor: null, // เพื่อให้พื้นหลังโปร่งใส (ถ้ากำหนด)
        scale: 3 // เพิ่ม Scale เพื่อให้ภาพที่ได้มีความละเอียดสูงขึ้น (ไม่แตก)
    }).then(function(canvas) {
        // สร้างลิงก์สำหรับดาวน์โหลด
        let link = document.createElement('a');
        link.download = 'pixel_bead_art.png';
        link.href = canvas.toDataURL('image/png'); // แปลง Canvas เป็น URL รูปภาพ
        link.click(); // สั่งให้ดาวน์โหลด
    });

    alert('บันทึกภาพลูกปัดเรียบร้อยแล้วค่ะ! 💖');
});
