const textarea = document.getElementById("config");

async function main() {
    let config;
    if (localStorage.hasOwnProperty("config")) {
        config = JSON.parse(localStorage.config);
    } else {
        config = await (await fetch("config.json")).json();
    }
    textarea.value = JSON.stringify(config, null, 4);
}

textarea.addEventListener("change", () => {
    localStorage.config = JSON.stringify(JSON.parse(textarea.value));
});
document.addEventListener("DOMContentLoaded", main);
