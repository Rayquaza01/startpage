const $ = q => document.querySelector(q);
const shuffle = $("#shuffle");
const colors = $("#colors");
const date = $("#date");
const time = $("#time");
const feed = $("#feed");
const feedMode = $("#feedMode");
const fever_api_key = $("#fever-api_key");
const fever_endpoint = $("#fever-endpoint");

async function load() {
    let res = await browser.storage.local.get();
    shuffle.value = res.shuffle;
    colors.value = res.colors.join(",");
    feed.value = res.feed;
    date.value = res.date;
    time.value = res.time;
    feedMode.value = res.feedMode;
    fever_api_key.value = res.fever.api_key;
    fever_endpoint.value = res.fever.endpoint;
}

function save() {
    browser.storage.local.set({
        shuffle: JSON.parse(shuffle.value),
        colors: colors.value.split(","),
        feed: feed.value,
        date: date.value,
        time: time.value,
        feedMode: feedMode.value,
        fever: {
            endpoint: fever_endpoint.value,
            api_key: fever_api_key.value
        }
    });
    switch (feedMode.value) {
        case "rss":
            fever_endpoint.disabled = true;
            fever_api_key.disabled = true;
            feed.disabled = false;
            break;
        case "fever":
            fever_endpoint.disabled = false;
            fever_api_key.disabled = false;
            feed.disabled = true;
            break;
    }
}

document.addEventListener("DOMContentLoaded", load);
document.addEventListener("change", save);
