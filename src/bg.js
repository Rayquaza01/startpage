function defaultValues(object, settings) {
    for (let key in settings) {
        if (!object.hasOwnProperty(key)) {
            object[key] = settings[key];
        }
    }
    return object;
}

async function setOpts() {
    let res = await browser.storage.local.get();
    let defaults = await (await fetch("options.json")).json();
    res = defaultValues(res, defaults);
    browser.storage.local.set(res);
}

browser.runtime.onInstalled.addListener(setOpts);
