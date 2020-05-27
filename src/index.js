// import Fever from "./Fever.js";
import { insertSVG } from "./SVG.js";

const DOM = {
    drawer: document.querySelector("#drawer"),
    close: document.querySelector("#close"),
    settings: document.querySelector("#settings"),
    name: document.querySelector("#name")
};

function closeDrawer() {
    DOM.drawer.classList.remove("active");
}

function openDrawer() {
    DOM.drawer.classList.add("active");
}

function openSettings() {
    DOM.name.innerText = "Settings";
    openDrawer();
}

async function main() {
    insertSVG();

    // let fever = new Fever(
    //     "",
    //     ""
    // );
    // console.log(await fever.auth());
    // console.log(await fever.groups());
    // const { unread_item_ids: unread } = await fever.unread();
    // const { items } = await fever.items(null, null, unread);
    // console.log(items);
}

DOM.settings.addEventListener("click", openSettings);
DOM.close.addEventListener("click", closeDrawer);
document.addEventListener("DOMContentLoaded", main);
