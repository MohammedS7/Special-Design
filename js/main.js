// ===============================
// Check If Local Storage Has A Color Key
// ===============================
const mainColor = localStorage.getItem("color");

if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);
}

// ===============================
// Check If Local Storage Has Active Id Key
// ===============================
const activeId = localStorage.getItem("activeId");

if (activeId !== null) {
    document.querySelectorAll('.active').forEach(el => {
        if (!el.closest('.navbar')) { // لو مش جوة الـ navbar
        el.classList.remove('active');
        }
    });
    document.getElementById(activeId).classList.add('active');
}

// ===============================
// Check If Local Storage Has Active Random Id Key
// ===============================
const activeRonId = localStorage.getItem('active-ron');

if (activeRonId !== null) {
    document.querySelectorAll('.active-ron').forEach(el => {
        el.classList.remove('active-ron');
    })
    document.getElementById(activeRonId).classList.add('active-ron');
}

// ===============================
// Check If Local Storage Has Active Image Key
// ===============================
const activeImgId = localStorage.getItem('active-img');

if (activeImgId !== null) {
    document.querySelectorAll('.active-img').forEach(el => {
        el.classList.remove('active-img');
    });
    document.getElementById(activeImgId).classList.add('active-img');
}

// ===============================
// Check If Local Storage Has Chosen Image Key
// ===============================
const chosenImage = localStorage.getItem("chosenImage");

const header = document.getElementById("header"); // لازم هنا عشان مستخدمينه تحت

if (chosenImage !== null) {
    header.style.backgroundImage = `url("imgs/${chosenImage}.jpg")`;
}


// Start Dark Mode Button
const darkModeBtn = document.querySelector('.dark-mode .mood');
const body = document.body;
const changeText = document.querySelectorAll('.change-text');
const testimonials = document.querySelector('.testimonials');

// Save On Local Storage
if(localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️";
    darkModeBtn.style.background = '#f1f1f1';
    darkModeBtn.style.color = '#333';
    changeText.forEach(el => {
        el.style.color = '#ccc';
    });
    testimonials.style.setProperty('--after-color', '#ccc');
    body.classList.toggle('dark-mode-setting');
}

function darkMode() {
    body.classList.toggle('dark-mode-setting');

    if(body.classList.contains('dark-mode-setting')) {
        darkModeBtn.textContent = '☀️';
        darkModeBtn.style.background = '#f1f1f1';
        darkModeBtn.style.color = '#333';
        changeText.forEach(el => {
            el.style.color = '#ccc';
        });
        testimonials.style.setProperty('--after-color', '#ccc');
        localStorage.setItem("theme", "dark");
    }
    else {
        darkModeBtn.textContent = '🌙';
        darkModeBtn.style.background = '#444';
        darkModeBtn.style.color = '#fff';
        changeText.forEach(el => {
            el.style.color = '#000';
        });
        testimonials.style.setProperty('--after-color', '#333');
        localStorage.setItem("theme", "light");
    }
}
// End Dark Mode Button


// ===============================
// Start Setting Box
// ===============================
const settingBox = document.querySelector(".setting-box");
const settingIcon = document.querySelector(".setting-icon .fa-gear");

// Open The Setting Box And Close
function opening() {
    settingBox.classList.toggle('open');
}

// Spin The Icon
function spin() {
    settingIcon.classList.toggle('fa-spin');
}

// ===============================
// Changing The Main Color
// ===============================
function changeColor(data, id) {
  // إزالة أي Active قديم (ماعدا عناصر الـ navbar)
    document.querySelectorAll('.active').forEach(el => {
        if (!el.closest('.navbar')) {
        el.classList.remove('active');
        }
    });

    // إضافة Active للعنصر الحالي
    document.getElementById(id).classList.add('active');
    localStorage.setItem('activeId', id); // حفظ الـ id في localStorage

    // تغيير اللون وتخزينه
    document.documentElement.style.setProperty('--main-color', data);
    localStorage.setItem('color', data);
}

// ===============================
// Set Background Options
// ===============================
let backgroundLocked = localStorage.getItem('backgroundLocked') || 'open'; // افتراضي شغال

let changeBckInterval;
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// دالة تشغيل تغيير الخلفية
function startBackgroundChange() {
    clearInterval(changeBckInterval);
    changeBckInterval = setInterval(() => {
        let randomNum = Math.floor(Math.random() * imgsArray.length);
        header.style.backgroundImage = `url("imgs/${imgsArray[randomNum]}")`;
    }, 10000);
}

// عند فتح الصفحة طبق آخر إعداد
if (backgroundLocked === 'open') {
  startBackgroundChange(); // تبدأ أوتوماتيك
} else {
    clearInterval(changeBckInterval);
    let savedImage = localStorage.getItem('fixedBackground') || "01.jpg";
    header.style.backgroundImage = `url("imgs/${savedImage}")`;
}

// ===============================
// Set Background Buttons (Yes/No)
// ===============================
function setBck(id) {
    const target = document.getElementById(id);

  // إزالة أي Active قديم
    document.querySelectorAll('.active-ron').forEach(el => {
        el.classList.remove('active-ron');
    });
    target.classList.add('active-ron');
    localStorage.setItem('active-ron', id);

    if (id === 'no') {
    clearInterval(changeBckInterval);
        header.style.backgroundImage = 'url("imgs/01.jpg")';
        backgroundLocked = 'close';
        localStorage.setItem('backgroundLocked', 'close');
        localStorage.setItem('fixedBackground', '01.jpg');
    } else {
        backgroundLocked = 'open';
        localStorage.setItem('backgroundLocked', 'open');
        startBackgroundChange();

    //الجديد ي Active-img وحطها على الصورة الأولى
    document.querySelectorAll('.active-img').forEach(el => {
        el.classList.remove('active-img');
    });
    document.getElementById("01").classList.add("active-img"); 
    localStorage.setItem("active-img", "01");
    localStorage.setItem("chosenImage", "01");
    }
}


// ===============================
// Setting Choose Image
// ===============================
const imagesDiv = document.querySelector('.images');
const noBtn  = document.querySelector('.background-options #no');
const yesBtn = document.querySelector('.background-options #yes');
const imgsContainer = document.querySelector('.random-bck');

function toggleImages() {
    if (noBtn.classList.contains('active-ron')) {
        imagesDiv.classList.add('show');
        imgsContainer.style.height = '520px';
    } else {
        imagesDiv.classList.remove('show');
        imgsContainer.style.height = '90px';
    }
}

noBtn.addEventListener('click', toggleImages);
yesBtn.addEventListener('click', toggleImages);

toggleImages();

// ===============================
// Choose Image
// ===============================
function chooseImg(id) {
    if (noBtn.classList.contains('active-ron')) {
        document.querySelectorAll('.active-img').forEach(el => {
        el.classList.remove('active-img');
        });

        document.getElementById(id).classList.add('active-img');
        localStorage.setItem('active-img', id);

        header.style.backgroundImage = `url("imgs/${id}.jpg")`;
        localStorage.setItem("chosenImage", id);
        localStorage.setItem("fixedBackground", `${id}.jpg`); // عشان ميرجعش لأول صورة
    }
}

// ===============================
// مراقبة أي تغيير في الزر "no" عشان نفتح الصور
// ===============================
new MutationObserver(toggleImages)
    .observe(noBtn, { attributes: true, attributeFilter: ['class'] });

toggleImages();


// Start Set The Bullets
// Set The Active Button
const bulletsNav = document.querySelector('.bullets');

function setBullets(id) {
    const select = document.getElementById(id);

    document.querySelectorAll('.bullets-options span').forEach(el => {
        el.classList.remove('active-b-ron');
    });
    select.classList.add('active-b-ron');

    localStorage.setItem('active-bullet', id)

    // Show Or Not Show The Bullets Links
    if(id === 'bullets-yes') {
        bulletsNav.classList.add('show-bullets');
        localStorage.setItem('showBullets', 'show');
    }
    else {
        bulletsNav.classList.remove('show-bullets');
        localStorage.setItem('showBullets', 'hide');
    }
}
//  Save Set The Active Button On Local Stoage
let activeBullet = localStorage.getItem('active-bullet');

if(activeBullet !== null ) {
    document.querySelectorAll('.bullets-options span').forEach(el => {
        el.classList.remove('active-b-ron');
    });
    document.getElementById(activeBullet).classList.add('active-b-ron');
}
// Save Show Or Not Show The Bullets Links On Local Storage
let showBullets = localStorage.getItem('showBullets');

if (showBullets === null) {
    // Default بعد الريسيت (تظهر bullets + يتحدد الزرار Yes)
    showBullets = 'show';
    localStorage.setItem('showBullets', 'show');
    localStorage.setItem('active-bullet', 'bullets-yes');
}

if (showBullets === 'show') {
    bulletsNav.classList.add('show-bullets');
    document.getElementById('bullets-yes').classList.add('active-b-ron');
} else {
    bulletsNav.classList.remove('show-bullets');
    document.getElementById('bullets-no').classList.add('active-b-ron');
}
// End Set The Bullets
// ===============================
// End Setting Box
// ===============================


// Start Reset Button
document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.querySelector('.reset-btn button');

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
        // مسح كل مفاتيح الإعدادات
        localStorage.removeItem("color");
        localStorage.removeItem("theme");
        localStorage.removeItem("activeId");
        localStorage.removeItem("active-ron");
        localStorage.removeItem("active-img");
        localStorage.removeItem("chosenImage");
        localStorage.removeItem("backgroundLocked");
        localStorage.removeItem("fixedBackground");
        localStorage.removeItem("active-bullet");
        localStorage.removeItem("showBullets");
        localStorage.removeItem("random-background");

        // إعادة تحميل الصفحة
        window.location.reload();
        });
    }
});
// End Reset Button



// Start Skills Transition
const skillsSection = document.querySelector('.skills');
const allSkills = document.querySelectorAll('.skills-box .progress span');

window.addEventListener('scroll', () => {
    let sectionTop = skillsSection.offsetTop;
    let sectionHeight = skillsSection.offsetHeight;
    let scrollPosition = window.scrollY + window.innerHeight;

    if(scrollPosition >= sectionTop + sectionHeight) {
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress.replace("width:", "").trim();
        })
    }
})
// End Skills Transition


// Start Popup Lightbox
const images = document.querySelectorAll(".gallery .images-box img");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const popupText = document.getElementById("popup-text");
const closeBtn = document.getElementById("close");

images.forEach(img => {
    img.addEventListener("click", () => {
        popup.style.display = "flex";
        popupImg.src = img.src;
        popupText.innerHTML = img.alt;
    });
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
    if(e.target === popup) {
        popup.style.display = "none";
    }
});
// End Popup Lightbox


// Start Scroll Up Button
const scrollUp = document.querySelector('.scroll-up');

window.addEventListener("scroll", () => {
    if(window.scrollY >= 618) {
        scrollUp.classList.add('show');
    }
    else {
        scrollUp.classList.remove("show");
    }
})

function scrollToUp() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// End Scroll Up Button


// Start Toggle burger menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // يمنع إن الكليك على الزر يتسجل كأنه برة
    navLinks.classList.toggle("show");
});

document.addEventListener('click', (e) => {
    // يقفل المنيو بس لو الكليك مش جوه المنيو ولا على زرار الهامبورجر
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('show');
    }
});
// End Toggle burger menu
