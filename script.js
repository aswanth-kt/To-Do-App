const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() == "") {
        alert("Please enter a task");
    } else {
        const li = document.createElement("li");
        li.textContent = inputBox.value.trim();
        listContainer.append(li);

        // Add delete btn
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
};

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
    } 
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}, false);