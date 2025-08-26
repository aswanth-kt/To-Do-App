const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() == "") {
        alert("Please enter a task");
    } else {
        const li = document.createElement("li");
        li.innerHTML = inputBox.value.trim();
        listContainer.append(li);

        // Add delete btn
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveTask();
};

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTask();
    } 
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTask()
    }
}, false);

function saveTask() {
    localStorage.setItem("task", listContainer.innerHTML)
}

function displayTask() {
    listContainer.innerHTML = localStorage.getItem("task");
};
displayTask();