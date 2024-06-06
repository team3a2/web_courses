// js for header
var lastScrollTop = 0;
var delta = 5; 
window.addEventListener('scroll', function(event) {
    var header = document.getElementById('header');
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (Math.abs(lastScrollTop - scrollTop) <= delta) {
        return;
    }
    // Kiểm tra xem phần tử nào đang được cuộn
    var scrolledElement = document.elementFromPoint(0, header.offsetHeight + 1); 
    var isInNavMobile = scrolledElement.closest('.nav-mobile') !== null; 

    if (scrollTop > lastScrollTop && scrollTop > delta && !isInNavMobile) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    lastScrollTop = scrollTop;
});


function handleKeyPress(event, nextInputId) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        document.getElementById(nextInputId).focus(); 
    }
}


// js show nav-mobile
document.querySelector('#header #logo .threesoc').addEventListener('click', () => {
    document.querySelector('#header .nav-mobile').classList.add('show-nav-mb');
})

// js disappear nav-mobile
function closeNavMobile() {
    document.querySelector('#header .nav-mobile').classList.remove('show-nav-mb');
}
document.querySelector('#header .nav-mobile .close').addEventListener('click', () => {
    document.querySelector('#header .nav-mobile').classList.remove('show-nav-mb');
})

//func container login and register
function close_container_login_register() {
    const container = document.querySelector('.container_login_register');
    const blackscreen = document.querySelector('.blackscreen');
    container.classList.add('dp-none');
    container.classList.remove('dp-block');
    blackscreen.classList.add('dp-none');
    blackscreen.classList.remove('dp-block');
}

function open_container_login_register(type) {
    const blackscreen = document.querySelector('.blackscreen');
    const container = document.querySelector('.container_login_register');
    container.classList.add('dp-block'); 
    container.classList.remove('dp-none');
    blackscreen.classList.remove('dp-none');
    blackscreen.classList.add('dp-block');

    device = type.split('-')[2].toLowerCase();
    func = type.split('-')[1].toLowerCase();
    console.log(func)
    
    const ctn = document.querySelector('.container_login_register');
    const btns_input = ctn.querySelectorAll('input')
    btns_input.forEach(btn => {
        btn.value = ''
    })
    if (func === 'login') {
        ctn.querySelector('.loginModal').classList.remove('dp-none');
        ctn.querySelector('.container_login_register .loginModal ').classList.add('dp-block');
        ctn.querySelector('.container_login_register .registerModal').classList.add('dp-none');
        ctn.querySelector('.container_login_register .registerModal').classList.remove('dp-block');
    }
    if (func === 'register') {
        ctn.querySelector('.container_login_register .loginModal').classList.add('dp-none');
        ctn.querySelector('.container_login_register .loginModal').classList.remove('dp-block');
        ctn.querySelector('.container_login_register .registerModal').classList.remove('dp-none');
        ctn.querySelector('.container_login_register .registerModal').classList.add('dp-block');
    } if (device === 'mb') {
        document.querySelector('#header .nav-mobile').classList.remove('show-nav-mb');
    }
}

const btns_open = document.querySelectorAll('.btn-L-R-js');
btns_open.forEach(btn => {
    btn.addEventListener('click', () => {
        open_container_login_register(btn.value);
    });
});

const btn_close = document.querySelectorAll('.btn-cl-ctn-login-register-js');
btn_close.forEach(btn => {
    btn.addEventListener('click', () => {
        close_container_login_register();
    });
});

const blackscreen = document.querySelector('.blackscreen');
blackscreen.addEventListener('click', () => {
    close_container_login_register();
});


const showPasswordSvgList = document.querySelectorAll('.showPassword');
const hidePasswordSvgList = document.querySelectorAll('.hidePassword');
const passwordInputList = document.querySelectorAll('.pw-js');

showPasswordSvgList.forEach(function(showPasswordSvg, index) {
    showPasswordSvg.addEventListener('click', function () {
        passwordInputList[index].type = 'password';
        showPasswordSvg.classList.add('dp-none');
        hidePasswordSvgList[index].classList.remove('dp-none');
    });
});

hidePasswordSvgList.forEach(function(hidePasswordSvg, index) {
    hidePasswordSvg.addEventListener('click', function () {
        passwordInputList[index].type = 'text';
        hidePasswordSvg.classList.add('dp-none');
        showPasswordSvgList[index].classList.remove('dp-none');
    });
});




// BOT


const botIcon = document.querySelector('.bot-icon');
const chatContainer = document.querySelector('.chat-container');
const chatHistory = document.querySelector('.chat-history');
const chatInput = document.querySelector('.chat-input input');
const sendBtn = document.querySelector('.chat-input button');
const closeBtn = document.querySelector('.chat-container .close-btn');

const data = {
    "ổn chưa":"rồi ạ",
    "bao nhiêu lâu thì bán được 1 tỷ gói mè":"trả lời"
};

botIcon.addEventListener('click', () => {
    
    chatContainer.classList.toggle('hidden');
    setTimeout(()=> {chatContainer.classList.add('move-chat-container')}, 0.000000000005)

});
closeBtn.addEventListener('click', () => {
    chatContainer.classList.remove('move-chat-container')
    setTimeout(()=> {chatContainer.classList.add('hidden');}, 130)
    
          
});
sendBtn.addEventListener('click', () => {
    const userInput = chatInput.value.trim();
    if (userInput) {
        addend_message_user(`${userInput}`);
        chatInput.value = '';

        const response = getResponse(userInput);
        if (response) {
            setTimeout(() => {
                typeWriter(response, 40);
            }, 500);
        }
    }
});

function getResponse(userInput) {
    for (const question in data) {
        if (question.toLowerCase() === userInput.toLowerCase()) {
            return data[question];
        }
    }
    return "Xin lỗi, tôi không hiểu câu hỏi của bạn.";
}

function addend_message_user(message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-user', 'dp-flex-row');

    const img = document.createElement('img');
    img.src = "images/user.png";
    img.alt = "Biểu tượng bot";

    const p = document.createElement('p');
    p.textContent = message
    messageContainer.appendChild(p);
    messageContainer.appendChild(img);
    chatHistory.appendChild(messageContainer);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function typeWriter(text, speed) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-bot', 'dp-flex-row');

    const img = document.createElement('img');
    img.src = "images/bot.png";
    img.alt = "Biểu tượng bot";

    const p = document.createElement('p');
    messageContainer.appendChild(img);
    messageContainer.appendChild(p);
    chatHistory.appendChild(messageContainer);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            p.textContent += text.charAt(index);
            index++;
            chatHistory.scrollTop = chatHistory.scrollHeight;
        } else {
            clearInterval(interval);
        }
    }, speed);
}