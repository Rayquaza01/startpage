/* globals moment RSSParser */
const $ = q => document.querySelector(q);
const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
const feedEle = $("#feed");

function changeColor(colors) {
    document.body.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
}

async function markReadAndOpenFever(e) {
    let res = await browser.storage.local.get("fever");
    await feverRequest(
        res.fever.endpoint,
        res.fever.api_key,
        "mark=item&as=read&id=" + e.target.dataset.id
    );
    location.href = e.target.dataset.url;
}

function fillFeed(item) {
    let name = document.createElement("a");

    if (hasProperty(item, "feed_id")) {
        name.className = "item";
        name.dataset.id = item.id;
        name.dataset.url = item.url;
        name.innerText = item.title;
        if (item.author !== "") {
            name.innerText += " • " + item.author.substring(1);
        }
        name.addEventListener("click", markReadAndOpenFever);
    } else {
        name.className = "item";
        name.href = item.link;
        name.innerText = item.title;
        if (hasProperty(item, "creator")) {
            name.innerText += " • " + item.creator;
        }
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
    if (res.feedMode === "rss") {
        let parser = new RSSParser();
        let feed = await parser.parseURL(res.feed);
        feed.items.forEach(fillFeed);
    } else if (res.feedMode === "fever") {
        let items = (await feverRequest(
            res.fever.endpoint,
            res.fever.api_key,
            "items"
        )).items;
        items.reverse().filter(item => !item.is_read).forEach(fillFeed);
    }
}

document.addEventListener("DOMContentLoaded", main);
