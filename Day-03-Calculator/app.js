const input = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const click = new Audio("click.mp3");
const themeBtn = document.querySelector("#theme-btn");
const body = document.querySelector("body");

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    click.currentTime = 0;
    click.play();
    if (btn.innerHTML === "AC") {
      input.value = "";
    } else if (btn.innerHTML === "DE") {
      input.value = input.value.slice(0, -1);
    } else if (btn.innerHTML === "=") {
      try {
        input.value = eval(input.value);
      } catch {
        input.value = "ERROR";
      }
    } else {
      input.value += btn.innerHTML;
    }
  });
});

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.setAttribute("data-theme", "dark");
  themeBtn.src = "assets/sun.png";
  themeBtn.style.width = "80px";
} else {
  body.setAttribute("data-theme", "light");
  themeBtn.src = "assets/moon.png";
  themeBtn.style.width = "45px";
}

themeBtn.addEventListener("click", function () {
  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
    themeBtn.src = "assets/sun.png";
    themeBtn.style.width = "80px";
    localStorage.setItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    themeBtn.src = "assets/moon.png";
    themeBtn.style.width = "45px";
    localStorage.setItem("theme", "light");
  }
});
