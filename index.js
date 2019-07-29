/* globals moment RSSParser */
const feedEle = document.getElementById("feed");
const CORS = "https://cors-anywhere.herokuapp.com/";
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
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#9E9E9E",
    "#607D8B"
];

function fillFeed(item, index) {
    // only display 20 items
    if (index > 19) {
        return;
    }

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
    document.getElementById("t").innerText = moment().format("hh:mm A")
    document.getElementById("d").innerText = moment().format("dddd, MMMM Do, YYYY")
}

async function main() {
    // set color
    document.body.style.backgroundColor =
        COLORS[Math.floor(Math.random() * COLORS.length)];

    // change time
    changeTime();
    setInterval(changeTime, 1000);

    // get rss feed
    let parser = new RSSParser();
    let feedURL;
    if (!localStorage.hasOwnProperty("feed")) {
        feedURL = "https://reddit.com/r/popular/.rss";
    } else {
        feedURL = localStorage.feed;
    }
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
    if (e.key === "c") {
        changeRSSFeed();
    }
}

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("keydown", shortcuts);
