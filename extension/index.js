/* globals moment */
const date = document.getElementById("date");
const text = document.getElementById("text");
const sites = document.getElementById("sites");

function setDate(format) {
    date.innerText = moment().format(format);
}

async function main() {
    let config;
    // if (localStorage.hasOwnProperty("config")) {
    //     config = JSON.parse(localStorage.config);
    // } else {
    //     config = await (await fetch("config.json")).json();
    // }
    let res = await browser.storage.local.get();
    config = JSON.stringify(res) !== "{}" ? res : await (await fetch("config.json")).json();

    // change date/time
    let bound = setDate.bind(null, config.dateformat);
    bound();
    setInterval(bound, 1000);

    let hour = moment().hour();
    // set mode to day if hour is within day range
    let mode = hour >= config.day[0] && hour <= config.day[1] ? "day" : "night";
    document.body.style.color = config.colorscheme[mode].fg;
    document.body.style.backgroundColor = config.colorscheme[mode].bg;

    text.innerText = config.text[mode];

    // add style options for pseudoclasses
    document.styleSheets[0].insertRule(`#text:first-letter { color: ${config.colorscheme[mode].bg}; background-color: ${config.colorscheme[mode].fg}; }`);
    document.styleSheets[0].insertRule(`a:hover { color: ${config.colorscheme[mode].bg}; background-color: ${config.colorscheme[mode].fg}; }`);

    config.sites.forEach(item => {
        let link = document.createElement("a");
        link.innerText = item[0];
        link.href = item[1];
        sites.appendChild(link);
    });
}

document.addEventListener("DOMContentLoaded", main);
