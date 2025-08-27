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

        // Dragable
        let imgDrag = document.createElement("img");
        imgDrag.src = "assets/images/drag.png";
        imgDrag.classList.add("drag-icon");
        imgDrag.setAttribute("draggable", "false");
        li.appendChild(imgDrag);
        li.setAttribute("draggable", "true");
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


// let select = null;
// listContainer.addEventListener("dragstart", (e) => {
//     select = e.target
//     console.log(e)
// })

// listContainer.addEventListener("dragover", (e) => {
//     e.preventDefault();
// })

// listContainer.addEventListener ("drop", (e) => {
//     listContainer.appendChild(select);
//     select = null;
//     saveTask();
// })


let IMG = "IMG";
let LI = "LI"
let select = null;
listContainer.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "LI") {
        select = e.target;
        e.target.classList.add("dragging");
    }
});

listContainer.addEventListener("dragend", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.remove("dragging");
    }
});

listContainer.addEventListener("dragover", (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(listContainer, e.clientY);
    const dragging = document.querySelector(".dragging");

    if (afterElement == null) {
        listContainer.appendChild(dragging);
        saveTask();
    } else {
        listContainer.insertBefore(dragging, afterElement);
        saveTask();
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}