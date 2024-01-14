window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }
    
    function showTabContent(i = 0) {
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active')
    };
    
    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    hideTabContent();
    showTabContent();

    //Timer
    //Устанавливаем дедлайн
    const deadline = '2023-12-31';

    //Функция для подсчета разницы между текущей датой и делайном
    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds;

        //перевод дат в числовые значения
        const t = Date.parse(endTime) - new Date();

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    };


    // функция помощник для отображения 0 у однозначных чисел
    function getZero(num) {
       if (num>=0 && num <10) {
           return `0${num}`;
       } else {
           return num;
       }
    }
    
    function setTimerOnDOM(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        //запускаю функцию обновления таймера чтобы избежать мигания верстки
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
        
    }
    
    setTimerOnDOM('.timer', deadline);

    // Modal

    const modalButtons = document.querySelectorAll('[data-modal]');
    const modalCloseButton = document.querySelector('[data-close]');
    let modalWindow = document.querySelector('.modal');
    console.log(modalWindow);
    function showModalWindow () {
        modalWindow.classList.remove('hide');
        modalWindow.classList.add('show');
        // блокирую скролл страницы при открытом модальном окне
        document.body.style.overflow = 'hidden';
        //блокируем таймер открывания окна если пользователь уже открыл его сам
        clearInterval(modalTimerId);
    };

    function hideModalWindow() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';
    };

    // showModalWindow();
    // hideModalWindow();
    
    for (let modalButton of modalButtons) {
        modalButton.addEventListener('click', showModalWindow);
    };

    modalCloseButton.addEventListener('click', hideModalWindow);
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            hideModalWindow();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape'&& modalWindow.classList.contains('show')) {
            hideModalWindow();
        };
    })
    
    // const modalTimerId = setTimeout(showModalWindow, 3000);
    //
    // function showModalByScroll() {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    //         showModalWindow();
    //         window.removeEventListener('scroll', showModalByScroll);
    //     }
    // };
    // window.addEventListener('scroll', showModalByScroll);
    
    // Класс карточки меню
// class MenuCard {
//         constructor(src, alt, title, descr, price, parentSelector, ...classes) {
//             this.src = src;
//             this.alt = alt;
//             this.title = title;
//             this.descr = descr;
//             this.price = price;
//             this.convertation = 92;
//             this.convertToRUB();
//             this.parent = document.querySelector(parentSelector);
//             this.classes = classes;
//         };
//         convertToRUB() {
//             this.price = this.price * this.convertation;
//         };
//
//         render() {
//             const element = document.createElement('div');
//             this.classes.forEach(className => element.classList.add(className));
//             element.innerHTML = `
//                     <img src="${this.src}" alt="${this.alt}">
//                     <h3 class="menu__item-subtitle">${this.title}</h3>
//                     <div class="menu__item-descr">${this.descr}</div>
//                     <div class="menu__item-divider"></div>
//                     <div class="menu__item-price">
//                         <div class="menu__item-cost">Цена:</div>
//                         <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
//                     </div>
//                     `;
//             //добавляю элемент на страницу
//             this.parent.append(element);
//         };
// };
//
// new MenuCard('img/tabs/vegy.jpg',
//     'vegy',
//     'Меню "Фитнес',
//     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. ' +
//     'Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//     9,
//     '.menu .container',
//     'menu__item', 'hide'
//     ).render();
// new MenuCard('img/tabs/elite.jpg',
//         'elite',
//         'Меню “Премиум”',
//         'В меню “Премиум” мы используем не только красивый дизайн упаковки, ' +
//         'но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//         12,
//         '.menu .container',
//         'menu__item'
//     ).render();
// new MenuCard('img/tabs/post.jpg',
//         'post',
//         'Меню "Постное',
//         'Меню “Постное” - это тщательный подбор ингредиентов: ' +
//         'полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, ' +
//         'правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//         11,
//         '.menu .container',
//         'menu__item'
//     ).render();
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.convertValue = 92;
        this.convertToRUB();
        this.classes = classes;
    };

    convertToRUB() {
        this.price = this.price * this.convertValue;
    };

    render() {
        const element = document.createElement('div');
        // задаю класс по умолчанию через сравнение длины массива rest
        if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element)
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
        <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
        `;
        this.parent.append(element);
    };
};

new MenuCard('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов', 9, '.menu .container', 'menu__item').render();
new MenuCard('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов', 9, '.menu .container', 'menu__item').render();
new MenuCard('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов', 9, '.menu .container', 'menu__item').render();

//Form
});




