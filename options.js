const shuffle = document.getElementById("shuffle");
const colors = document.getElementById("colors");
const feed = document.getElementById("feed");
const date = document.getElementById("date");
const time = document.getElementById("time");

async function load() {
    let res = await browser.storage.local.get();
    shuffle.value = res.shuffle;
    colors.value = res.colors.join(",");
    feed.value = res.feed;
    date.value = res.date;
    time.value = res.time;
}

function save() {
    browser.storage.local.set({
        shuffle: JSON.parse(shuffle.value),
        colors: colors.value.split(","),
        feed: feed.value,
        date: date.value,
        time: time.value
    });
}

document.addEventListener("DOMContentLoaded", load);
document.addEventListener("change", save);
