window.addEventListener("DOMContentLoaded", () => {
  //tab
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  hideTabContent();

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //timer

  const deadline = "2023-01-01";

  function start(endtime) {
    const currentTime = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(currentTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((currentTime / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((currentTime / 1000 / 60) % 60);
    const seconds = Math.floor((currentTime / 1000) % 60);

    return {
      total: currentTime,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  start(deadline);

  function setTime(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      const t = start(endtime);

      days.innerHTML = t.days;
      hours.innerHTML = t.hours;
      minutes.innerHTML = t.minutes;
      seconds.innerHTML = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setTime(".timer", deadline);

  //modal-window

  const openBtn = document.querySelectorAll("[data-modal]");
  const modalWindow = document.querySelector(".modal");
  const closeBtn = document.querySelector("[data-close]");

  function showModalWindow() {
    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // clearInterval(modalTimeout);
  }
  showModalWindow();
  const modalTimeout = setTimeout(showModalWindow, 5000);

  function hideModalWindow() {
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
  }
  hideModalWindow();

  openBtn.forEach((btn) => {
    btn.addEventListener("click", showModalWindow);
  });

  closeBtn.addEventListener("click", hideModalWindow);

  modalWindow.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
      hideModalWindow();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      hideModalWindow();
    }
  });

//class coponent - constructor function

class DietMenu{
    constructor(src,alt,title,descripton,cost,parentSelector){
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descripton = descripton;
      this.cost = cost;
      this.parentSelector = document.querySelector(parentSelector);
      this.rate = 42;
      this.changeCurrency();
    }
    
    changeCurrency(){
      this.cost = this.cost*this.rate;
    }

    render(){
      const element = document.createElement('div');
      element.innerHTML = `
              <div class="menu__item">
                  <img src=${this.src} alt=${this.alt}>
                  <h3 class="menu__item-subtitle">${this.title}</h3>
                  <div class="menu__item-descr">${this.descripton}</div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                      <div class="menu__item-cost">Price:</div>
                      <div class="menu__item-total"><span>${this.cost}</span> UAH/day</div>
                  </div>
              </div>
      `;
      this.parentSelector.append(element);
   }
}

new DietMenu(
    "img/tabs/vegy.jpg",
    "vegy",
    'Menu "Fitness"',
    'Menu "Fitness"- is a new approach to cooking: more fresh vegetables and fruits. Product of active and healthy people. It is a brand new product with optimal price and high quality!',
    9,
    '.menu .container'
    ).render();
  
new DietMenu(
      "img/tabs/elite.jpg",
      "elite",
      'Menu "Premium"',
      'Menu "Premium"- We use not only beautiful packaging design, but also quality dishes. Red fish, seafood, fruit - restaurant menu without going to the restaurant',
      15,
      '.menu .container'
      ).render();

new DietMenu(
        "img/tabs/post.jpg",
        "fasting",
        'Menu "Fasting"',
        'Menu "Fasting"- It is a careful selection of ingredients: complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of protein due to tofu and imported vegetarian steaks',
        17,
        '.menu .container'
        ).render();

});
