let list = document.querySelector(".list-group");
let clear = document.getElementById("clear");
let form = document.forms["add-text-form"];
let addText = form.elements["addText"];
let inputText = form.elements["inputText"];
let notificaitonAlert = document.querySelector(".notification-alert");

let array = [];

function getFromLocalStorage() {
    let parseArray = JSON.parse(localStorage.task);
    for (let i = 0; i < parseArray.length; i++) {
        array.unshift(parseArray[i]);
    }
}

function addElementToArray() {
    let id = generatedId();
    let text = inputText.value;
    let obj = {};
    obj.id = id;
    obj.text = text;
    array.unshift(obj);
    localStorage.task = JSON.stringify(array);
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

function addElement(elem, id) {
    let li = document.createElement("li");
    li.className = "list-group-item d-flex";

    let span = document.createElement("span");
    span.textContent = elem;

    let iconDelete = document.createElement("i");
    iconDelete.className = "fas fa-trash-alt delete ml-2";

    let iconEdit = document.createElement("i");
    iconEdit.className = "fas fa-edit edit ml-auto";

    li.setAttribute("data-id", id);

    li.appendChild(span);
    li.appendChild(iconEdit);
    li.appendChild(iconDelete);
    list.appendChild(li);
}

function createList(){
    clearList();
    for (let i = 0; i < array.length; i++) {
        addElement(array[i].text, array[i].id);
    }
}

function clearList() {
    list.innerHTML = '';
}

function deleteElem(elem){
    for (let i = 0; i < array.length; i++) {
        if(array[i].id === elem){
            array.splice(i,1);
            localStorage.task = JSON.stringify(array);
            break;
        }
    }

    message({
        text: "message removed",
        cssClass: "alert-danger",
        timeOut: 4000
    });
}

function editElement(elem, text){
    for (let i = 0; i < array.length; i++) {
        if(array[i].id === elem){
            array[i].text = text;
            localStorage.task = JSON.stringify(array);
            break;
        }
    }

    message({
        text: "message saved",
        cssClass: "alert-success",
        timeOut: 4000
    });
}

function message(setting){
    notificaitonAlert.classList.add(setting.cssClass);
    notificaitonAlert.textContent = setting.text;
    notificaitonAlert.classList.add("show");

    setTimeout(function () {
        notificaitonAlert.classList.remove("show");
    },setting.timeOut)

}

clear.addEventListener("click", () => {
    clearList();
    array = [];
});

addText.addEventListener("click", function (e) {
    e.preventDefault();
    if(inputText.value !== ''){
        addElementToArray();
        createList();
        inputText.value = '';

        message({
            text: "message was added",
            cssClass: "alert-success",
            timeOut: 4000
        });

    }else {
        inputText.classList.add("is-invalid");
    }

});

inputText.addEventListener("keyup", () => inputText.classList.remove("is-invalid"));

list.addEventListener("click", function (e) {
    let elem = e.target;

    if(elem.classList.contains("delete")){
        deleteElem(elem.parentElement.dataset.id);

        elem.parentElement.remove();

    }else if(elem.classList.contains("edit")){

        elem.classList.toggle("fa-save");

        let prev = elem.parentElement.firstChild;
        prev.setAttribute("contenteditable", "true");

        prev.focus();

        if(!elem.classList.contains("fa-save")){
            editElement(elem.parentElement.dataset.id, prev.textContent);

            prev.blur();
        }
    }
});

getFromLocalStorage();
createList();
