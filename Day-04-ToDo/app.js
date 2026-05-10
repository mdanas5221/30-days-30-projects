const input = document.querySelector("#input");
const btn = document.querySelector("#add-btn");
const ul = document.querySelector(".task-box");

// ADD TASK FUNCTION
function addTask() {
  if (input.value.trim() === "") {
    alert("Please add a task first");
    return;
  } else {
    let li = document.createElement("li");
    li.classList.add("task")
    let textSpan = document.createElement("span");
    textSpan.classList.add("text-span");
    textSpan.textContent = input.value;

    let span = document.createElement("span");
    span.innerHTML = `
    <i class="fa-solid fa-pen edit"></i>
    <i class="fa-solid fa-trash delete"></i>`;

    li.appendChild(textSpan);
    li.appendChild(span);
    ul.appendChild(li);
  }
  input.value = "";
  saveData();
}

// ADDTASK FUNCTION CALL
btn.addEventListener("click", addTask);

// UL CLICK FUNCTION OR EVENTLISTENER
ul.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.closest("li").remove();
    saveData();
  } else if (e.target.classList.contains("edit")) {
    let li = e.target.closest("li");
    let oldText = li.querySelector(".text-span").textContent.trim();

    li.innerHTML = `
    <input type="text" class="new-text" value="${oldText}">
    <button class="save-btn">Save</button>
    `;

    li.querySelector(".new-text").focus();
    saveData();
  } else if (e.target.classList.contains("save-btn")) {
    saveTask(e.target.closest("li"));
  } else {
    let text = e.target.closest("li").querySelector(".text-span");
    text.classList.toggle("check");
    saveData();
  }
});

// ENTER KEY FUNCTION FOR SAVETASK FUNCTION
ul.addEventListener("keydown", function (e) {
  if (e.target.classList.contains("new-text") && e.key === "Enter") {
    saveTask(e.target.closest("li"));
    saveData();
  }
});

// SAVETASK FUNCTION AFTER EDIT
function saveTask(li) {
  let newText = li.querySelector(".new-text").value;
  if (newText.trim() === "") return;
  li.innerHTML = `
    <span class="text-span">
     ${newText}
    </span>
    <span>
     <i class="fa-solid fa-pen edit"></i>
     <i class="fa-solid fa-trash delete"></i>
    </span>
    `;

  saveData();
}

// ENTER KEY FUNCTION
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// SAVEDATA FUNCTION
function saveData() {
  localStorage.setItem("data", ul.innerHTML);
}

// SHOWDATA FUNCTION
function showData() {
  ul.innerHTML = localStorage.getItem("data");
}

showData();
