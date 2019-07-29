/* globals moment RSSParser */
const feedEle = document.getElementById("feed");
const COLORS = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    // "#8BC34A",
    // "#CDDC39",
    // "#FFEB3B",
    // "#FFC107",
    // "#FF9800",
    "#FF5722",
    "#795548",
    // "#9E9E9E",
    "#607D8B"
]; // material design colors, colors that white text doesn't look good on removed

function changeColor() {
    document.body.style.backgroundColor =
        COLORS[Math.floor(Math.random() * COLORS.length)];
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

function changeTime() {
    document.getElementById("t").innerText = moment().format("hh:mm A");
    document.getElementById("d").innerText = moment().format("dddd, MMMM Do, YYYY");
}

async function main() {
    // set color
    changeColor();

    // change time
    changeTime();
    setInterval(changeTime, 1000);

    // get rss feed
    let parser = new RSSParser();
    // use cors proxy on web demo
    let CORS = !window.hasOwnProperty("browser")
        ? "https://cors-anywhere.herokuapp.com/"
        : "";
    let feedURL = !localStorage.hasOwnProperty("feed")
        ? "https://reddit.com/r/popular/.rss"
        : localStorage.feed;
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
