/* globals moment RSSParser */
const feedEle = document.getElementById("feed");

function changeColor(colors) {
    document.body.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
}

function fillFeed(item) {
    let name = document.createElement("a");
    name.className = "item";
    name.href = item.link;
    name.innerText = item.title;
    if (item.hasOwnProperty("creator")) {
        name.innerText += " • " + item.creator;
    }

    feedEle.appendChild(name);
}

function changeTime(time, date) {
    document.getElementById("t").innerText = moment().format(time);
    document.getElementById("d").innerText = moment().format(date);
}

async function getOpt(opt) {
    if (window.hasOwnProperty("browser")) {
        let res = await browser.storage.local.get(opt);
        return res[opt];
    } else {
        if (["colors", "shuffle"].includes(opt)) {
            return JSON.parse(localStorage[opt]);
        } else {
            return localStorage[opt];
        }
    }
}

async function main() {
    // for web demo
    if (!window.hasOwnProperty("browser")) {
        console.log("WEB DEMO");
        console.log("Change settings in browser console");
        console.log("Ex: localStorage.feed = 'https://reddit.com/r/popular/.rss'");
        let storage = await (await fetch("options.json")).json();
        if (localStorage !== null) {
            localStorage.colors = JSON.stringify(storage.colors);
            localStorage.feed = storage.feed;
            localStorage.date = storage.date;
            localStorage.time = storage.time;
            localStorage.shuffle = storage.shuffle;
        }
    }

    // set color
    let colors = await getOpt("colors");
    let shuffle = await getOpt("shuffle");
    changeColor(colors);
    // change color every 5s if shuffle is enabled
    if (shuffle) {
        setInterval(changeColor.bind(null, colors), 5000);
        document.body.style.transition = "5s";
    }

    // change time
    let date = await getOpt("date");
    let time = await getOpt("time");
    changeTime(time, date);
    setInterval(changeTime.bind(null, time, date), 1000);

    // get rss feed
    let parser = new RSSParser();
    // use cors proxy on web demo
    let CORS = !window.hasOwnProperty("browser")
        ? "https://cors-anywhere.herokuapp.com/"
        : "";
    let feedURL = await getOpt("feed");
    let feed = await parser.parseURL(CORS + feedURL);
    feed.items.forEach(fillFeed);
}

function changeRSSFeed() {
    let feed = prompt("New RSS Feed:");
    if (feed !== null) {
        localStorage.feed = feed;
        location.reload();
    }
}

function shortcuts(e) {
    if (e.key === "r") {
        changeRSSFeed();
    }
    if (e.key === "c") {
        changeColor();
    }
}

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("keydown", shortcuts);
