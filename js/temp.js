let list = document.querySelector(".list-group");
let clear = document.getElementById("clear");
let inputText = document.getElementById("inputText");
let addText = document.getElementById("addText");
let form = document.forms["add-text-form"];

let array = [{
    id: "1",
    text: "fucking message"
}];

function addElementToArray() {
    let id = generatedId();
    let text = inputText.value;
    let obj = {};
    obj.id = id;
    obj.text = text;
    array.unshift(obj);
}

function generatedId() {
    let id = "";
    let char = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    for (let i = 0; i < 15; i++) {
        let random = Math.floor(Math.random() * char.length);
        id += char[random];
    }
    return id;
}

function addElement(elem) {
    let li = document.createElement("li");
    li.className = "list-group-item d-flex";
    let iconDelete = document.createElement("i");
    iconDelete.className = "fas fa-trash-alt delete ml-2";
    let iconEdit = document.createElement("i");
    iconEdit.className = "fas fa-edit edit ml-auto";
    li.setAttribute("data-id", generatedId().toString());
    li.textContent = elem;
    li.appendChild(iconEdit);
    li.appendChild(iconDelete);
    list.appendChild(li);
}

function createList(){
    clearList();
    for (let i = 0; i < array.length; i++) {
        addElement(array[i].text);
    }
}

function clearList() {
    list.innerHTML = '';
}

clear.addEventListener("click", clearList);

addText.addEventListener("click", function (e) {
    e.preventDefault();

    addElementToArray();
    createList();
    inputText.value = '';
});
createList();
