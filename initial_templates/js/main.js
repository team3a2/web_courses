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