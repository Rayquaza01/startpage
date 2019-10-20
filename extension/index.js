/* globals moment RSSParser */
const $ = q => document.querySelector(q);
const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
const feedEle = $("#feed");

function changeColor(colors) {
    document.body.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
}

function fillFeed(item) {
    let name = document.createElement("a");
    name.className = "item";
    name.href = item.link;
    name.innerText = item.title;
    if (hasProperty(item, "creator")) {
        name.innerText += " • " + item.creator;
    }

    feedEle.appendChild(name);
}

function changeTime(time, date) {
    $("#t").innerText = moment().format(time);
    $("#d").innerText = moment().format(date);
}

async function main() {
    let res = await browser.storage.local.get();

    // set color
    let colors = res.colors;
    let shuffle = res.shuffle;
    changeColor(colors);
    // change color every 5s if shuffle is enabled
    if (shuffle) {
        setInterval(changeColor.bind(null, colors), 5000);
        document.body.style.transition = "5s";
    }

    // change time
    let date = res.date;
    let time = res.time;
    changeTime(time, date);
    setInterval(changeTime.bind(null, time, date), 1000);

    // get rss feed
    let parser = new RSSParser();
    let feedURL = res.feed;
    let feed = await parser.parseURL(feedURL);
    feed.items.forEach(fillFeed);
}

document.addEventListener("DOMContentLoaded", main);
