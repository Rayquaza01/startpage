const textarea = document.getElementById("config");

async function main() {
    let config;
    // if (localStorage.hasOwnProperty("config")) {
    //     config = JSON.parse(localStorage.config);
    // } else {
    //     config = await (await fetch("config.json")).json();
    // }
    let res = await browser.storage.local.get();
    config = JSON.stringify(res) !== "{}" ? res : await (await fetch("config.json")).json();
    textarea.value = JSON.stringify(config, null, 4);
}

textarea.addEventListener("change", () => {
    browser.storage.local.set(JSON.parse(textarea.value));
});
document.addEventListener("DOMContentLoaded", main);
