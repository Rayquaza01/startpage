/* globals RSSParser, moment */
const cptitle = document.getElementById("cptitle");
const cpdesc = document.getElementById("cpdesc");
const time = document.getElementById("time");
const date = document.getElementById("date");
const feed = document.getElementById("feed");
const CORS = "https://cors-anywhere.herokuapp.com/";

function updateTime() {
    time.innerText = moment().format("hh:mm");
    date.innerText = moment().format("MMMM Do, YYYY");
}

function fillFeed(item, index) {
    // only display 20 items
    if (index > 19) {
        return;
    }
    let ele = document.createElement("span");
    ele.className = "item";

    let name = document.createElement("a");
    name.className = "title";
    name.href = item.link;
    name.innerText = item.title;
    if (item.hasOwnProperty("creator")) {
        name.innerText += " • " + item.creator;
    }

    ele.appendChild(name);
    feed.appendChild(ele);
}

async function main() {
    // get image from bing
    let info = await (await fetch(
        CORS + "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"
    )).json();
    console.log(info.images[0].url)
    document.body.style.background = "url(https://bing.com" + info.images[0].url + ")";
    cptitle.innerText = info.images[0].title;
    cpdesc.innerText = info.images[0].copyright;

    // update clock
    updateTime();
    setInterval(updateTime, 1000);

    // get rss feed
    let parser = new RSSParser();
    let feedURL;
    if (!localStorage.hasOwnProperty("feed")) {
        feedURL = "https://reddit.com/r/popular/.rss";
    } else {
        feedURL = localStorage.feed;
    }
    let feed = await parser.parseURL(CORS +feedURL);
    feed.items.forEach(fillFeed);
}

function changeRSSFeed() {
    let feed = prompt("New RSS Feed:");
    if (feed !== null) {
        localStorage.feed = feed;
        location.reload();
    }
}

document.getElementById("changeFeed").addEventListener("click", changeRSSFeed);
document.addEventListener("DOMContentLoaded", main);
