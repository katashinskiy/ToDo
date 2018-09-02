let ulChildren = document.querySelector("ul").children;
let img = document.createElement("img");
img.src = "https://www.google.com.ua/search?q=%D1%85%D0%B0%D1%80%D0%BB%D0%B0%D0%BC%D0%BE%D0%B2&tbm=isch&source=lnms&sa=X&ved=0ahUKEwjEtYfmmJbdAhULkSwKHaETBBYQ_AUICygC&biw=1396&bih=662&dpr=1.38#imgrc=5Kj2BV3j8pe82M:";
img.width = 500;
img.height = 200;

document.body.insertAdjacentElement("afterbegin", img);
for (let i = 0; i < ulChildren.length; i++) {
    let strong = document.createElement("strong");
    strong.textContent = i.toString() + " ";

    ulChildren[i].insertAdjacentElement("afterbegin", strong);
}
