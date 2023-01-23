import { pictures } from "./constants/constants.js";
const container = document.querySelector('.gallery__container');
const slideTemplate = document.querySelector('.gallery__slide-template').content; 


function createCard(picLink, name, link) {
    const elementPlace = slideTemplate.querySelector('.gallery__slide').cloneNode(true);
    elementPlace.querySelector('.gallery__slide-img').src = picLink;
    elementPlace.querySelector('.gallery__slide-img').alt = name;
    elementPlace.querySelector('.gallery__slide-title').textContent = name;
    elementPlace.querySelector('.gallery__slide-title').href = link;
    return elementPlace;
}

pictures.forEach((item) => {
    container.append(createCard(item.picLink, item.name, item.link));
})

const slides = document.querySelectorAll('.gallery__slide')


for (const slide of slides) {
    slide.addEventListener('click', () => {
        if(slide.classList.contains('gallery__slide_active')) {
            clearActiveClass();    
        }

        else {
            clearActiveClass();
            addActiveClass(slide);
        }
    });
    // slide.addEventListener('mouseout', () => {
    //     clearActiveClass();
    // })
};

function addActiveClass(slide) {
    slide.classList.add('gallery__slide_active')
    slide.querySelector('.gallery__slide-title').classList.add('gallery__slide-title_active')
}

function clearActiveClass() {
    slides.forEach((slide) => {
        slide.classList.remove('gallery__slide_active')
        slide.querySelector('.gallery__slide-title').classList.remove('gallery__slide-title_active')
    })
};










//2 проект пока тут
const item = document.querySelector('.drag-drop__item');
const placeholders = document.querySelectorAll('.drag-drop__placeholder');

item.addEventListener('dragstart', dragStart);
item.addEventListener('dragend', dragEnd);

for ( const placeholder of placeholders) {
    placeholder.addEventListener('dragover', (event) => {event.preventDefault()});
    placeholder.addEventListener('dragenter', dragEnter);
    placeholder.addEventListener('dragleave', dragLeave);
    placeholder.addEventListener('drop', dragDrop)
}

function dragStart(event) {
 event.target.classList.add('drag-drop__item_hold');
    setTimeout(() => {
    event.target.classList.add('drag-drop__item_hidden'),0
    })
};

function dragEnd(event) {
    event.target.classList.remove('drag-drop__item_hold');
    event.target.classList.remove('drag-drop__item_hidden');
}

function dragEnter(event) {
    event.target.classList.add('drag-drop__placeholder_hover');
}

function dragLeave(event) {
    event.target.classList.remove('drag-drop__placeholder_hover');
}

function dragDrop(event) {
    event.target.classList.remove('drag-drop__placeholder_hover');
    event.target.append(item);

    if(event.target === placeholders[1]) {
        item.textContent = 'Выполняю';
    }

    else if(event.target === placeholders[2]) {
        item.textContent = 'Жду одобрения';
    }
    
    else if(event.target === placeholders[3]) {
        item.textContent = 'Выполнено';
    }

    else {
        item.textContent = 'Перетащи меня';
    }   
};




//4 проект, потому что третий на весь экран

const board = document.querySelector('#board');
const colors = ['blue', 'yellow', 'red', 'green', 'orange', 'brown', 'pink', 'aquamarine']
const SQUARES_COUNT = 238;

for(let i = 0; i < SQUARES_COUNT; i++) {
    const square = document.createElement('div');
    square.classList.add('square-game__square');

    square.addEventListener('mouseover', () => {
        setColor(square);
    });
    

    square.addEventListener('mouseleave', () => {
        removeColor(square);
    });

    board.append(square);
}


function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 5px ${color}`;
};

function removeColor(element) {
    element.style.backgroundColor = '#909090';
    element.style.boxShadow = '0 0 2px #000';
};

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index];
};

//сделать звуковой эффект на каждый новый клик по квадратику







//3 проект слайдер

const upButton = document.querySelector('.slider__button_up');
const downButton = document.querySelector('.slider__button');
const sidebar = document.querySelector('.slider__sidebar');

const mainSlide = document.querySelector('.slider__main-slide');
const slidesCount = mainSlide.querySelectorAll('.slider__slide').length;

let activeSlideIndex = 0;
const containerSlider = document.querySelector('.slider__container');

const video = document.querySelector('#video-cliff')

sidebar.style.top = `-${(slidesCount -1) *100}%`;

upButton.addEventListener('click', () => {
    changeSlide('up')
});

downButton.addEventListener('click', () => {
    changeSlide('down')
});

document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowUp') {
        changeSlide('up')
    }
    else if(event.key === 'ArrowDown') {
        changeSlide('down')
    }
});

video.addEventListener('mouseover', () => {
    video.play();
})

video.addEventListener('mouseleave', () => {
    video.pause();
})



function changeSlide(direction) {
    if(direction === 'up') {
        activeSlideIndex++
        if(activeSlideIndex === slidesCount){
            activeSlideIndex = 0;
        }
    }

    else if (direction === 'down') {
        activeSlideIndex--
        if( activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 1
        }
    }
    const height = containerSlider.clientHeight;
    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}






//5проект
const startButton = document.querySelector('#start');
const screens = document.querySelectorAll('.game-click__screen');
const timeListButtons = document.querySelector('#time-list');
const playAgainButton = document.querySelector('.game-click__button-again')
let time = 0;
let score = 0;
let timer

let circleColors = ['blue', 'yellow', 'red', 'green', 'orange', 'brown', 'pink', 'aquamarine', 'purple', 'mint'];

const timeElement = document.querySelector('#time');

const gameClickBoard = document.querySelector('#game-click-board');



startButton.addEventListener('click', function(event) {
    event.preventDefault();
    screens[0].classList.add('game-click__screen_up')
})

timeListButtons.addEventListener('click', (event) => {
    if(event.target.classList.contains('game-click__time-btn')) {
        screens[1].classList.add('game-click__screen_up');
        time = parseInt(event.target.getAttribute('data-time'));
        startGame();
    }
})

playAgainButton.addEventListener('click', function(event) {
    event.preventDefault();
    screens[1].classList.remove('game-click__screen_up');
    screens[0].classList.remove('game-click__screen_up');
    hidePlayAgainButton()
})

gameClickBoard.addEventListener('click', (event) => {
    if(event.target.classList.contains('game-click__circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    timeElement.parentNode.classList.remove('game-click__countdown_hide');
    score = 0;
    gameClickBoard.innerHTML = '';
    timer = setInterval(countdownTime, 1000);
    createRandomCircle();
    setTime(time);
}

function countdownTime() {
    if( time === 0) {
        finishGame();
        clearInterval(timer)
    }
    else {
        let current = --time;
        if(current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    } 
}


function setTime(value) {
    timeElement.innerHTML = `00:${value}`
}

function finishGame() {
    timeElement.parentNode.classList.add('game-click__countdown_hide');
    gameClickBoard.innerHTML = `<h2 class="game-click__result-text">Ваш счет: <span 
    class="game-click__result-point">${score}</span></h2>`;
    seePlayAgainButton();
};

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 70);
    const {width, height} = gameClickBoard.getBoundingClientRect();

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = randomColor();

    circle.classList.add('game-click__circle')
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.backgroundColor = color;

    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    gameClickBoard.append(circle)
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomColor() {
    const index = Math.floor(Math.random() * circleColors.length)
    return circleColors[index];
}



function seePlayAgainButton() {
    playAgainButton.classList.add('game-click__button-again_visible');
    screens[2].prepend(playAgainButton);
}

function hidePlayAgainButton() {
    playAgainButton.classList.remove('game-click__button-again_visible');

}



// const timePlace = document.querySelector('.header__time');

// let date = new Date();
// console.log(date);

// function getTime() {
//     let date = new Date();
//     timePlace.textContent = date.toLocaleDateString();
//     console.log(timePlace);    
//     return timePlace;
// }

// getTime();



//popup

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__exit');

function openPopup() {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc); 
};

function closePopup() {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc); 
}

function closePopupEsc(event) {
    if(event.key === 'Escape') {
        closePopup();
    }
}

function closePopupOverlay(event) {
    const openedPopup = document.querySelector('.popup_opened'); 
    if (event.target === openedPopup) { 
        closePopup(openedPopup); 
    }; 
}

setTimeout(openPopup, 2000);

popupCloseButton.addEventListener('click', 
closePopup
// () => {
    // debugger;
    // closePopup();
// }
);

popup.addEventListener('click', closePopupOverlay);





