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
});
