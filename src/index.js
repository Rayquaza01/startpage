import moment from "moment";
import RSSParser from "rss-parser";

const $ = q => document.querySelector(q);
const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
const feedEle = $("#feed");

function changeColor(colors) {
    document.body.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
}

async function openItem(e) {
    e.preventDefault();
    if (hasProperty(e.target.dataset, "freshrssId")) {
        await markRead(e.target.dataset.freshrssId);
    }
    switch (e.which) {
        case 1:
            location.href = e.target.dataset.url;
            break;
        case 2:
            browser.tabs.create({
                url: e.target.dataset.url,
                active: true
            });
            break;
    }
    e.target.remove();
}

async function markRead(id) {
    let res = await browser.storage.local.get("fever");
    await feverRequest(
        res.fever.endpoint,
        res.fever.api_key,
        "mark=item&as=read&id=" + id
    );
}

function fillFeed(mode = "rss", item) {
    let name = document.createElement("a");

    name.className = "item";
    name.innerText = item.title;
    name.dataset.url = item.link;
    name.href = item.link;
    if (hasProperty(item, "creator")) {
        name.innerText += " • " + item.creator;
    }
    if (mode === "freshrss") {
        name.dataset.freshrssId = item.guid;
        name.addEventListener("mouseup", openItem);
        name.addEventListener("contextmenu", e => e.preventDefault());
    }

    feedEle.appendChild(name);
}

function changeTime(time, date) {
    $("#t").innerText = moment().format(time);
    $("#d").innerText = moment().format(date);
}

async function feverRequest(endpoint, api_key, args) {
    let response = await fetch(endpoint + "?api&" + args, {
        body: "api_key=" + api_key,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post"
    });
    return await response.json();
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
    let feed = await parser.parseURL(res.feed);
    feed.items.forEach(fillFeed.bind(null, res.feedMode));
}

document.addEventListener("DOMContentLoaded", main);
