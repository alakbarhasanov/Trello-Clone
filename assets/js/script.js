let cardCounter = 0;

document.getElementById("addListButton").addEventListener("click", addList);

function addList() {
    const board = document.getElementById("board");
    const list = document.createElement("div");
    list.className = "list";
    list.innerHTML = `
                <header>New List</header>
                <div class="cards"></div>
                <div class="inputContainer">
                    <input type="text" placeholder="Enter your column name" />
                    <div class="buttons">
                        <button class="addCardButton">Add cart</button>
                        <button class="deleteCardButton">Delete cart</button>
                    </div>
                </div>
            `;
    board.insertBefore(list, board.childNodes[board.childNodes.length - 1]);

    const input = list.querySelector(".inputContainer input");
    list.querySelector(".addCardButton").addEventListener("click", () => addCard(list.querySelector(".cards"), input));
    list.querySelector(".deleteCardButton").addEventListener("click" ,() => {
        list.remove();
    })
    enableDragAndDrop();
}

function addCard(cardsContainer, input) {
    if (input.value.trim() === "") {
        alert("Write card name");
        return;
    }

    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("draggable", "true");
    card.setAttribute("id", `card-${cardCounter++}`);
    card.innerHTML = `
                <span>${input.value}</span>
                <i class="fas fa-trash delete-icon"></i>
            `;
    card.querySelector(".delete-icon").addEventListener("click", () => deleteCard(card));
    cardsContainer.appendChild(card);
    input.value = "";
    enableDragAndDrop();
}


function deleteCard(card) {
    card.remove();
}

function enableDragAndDrop() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("dragstart", dragStart);
        card.addEventListener("dragend", dragEnd);
    });

    const lists = document.querySelectorAll('.cards');
    lists.forEach(list => {
        list.addEventListener("dragover", dragOver);
        list.addEventListener("drop", drop);
    });
}

function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
}

function dragEnd(e) {
    e.target.classList.remove("hide");
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);
}
