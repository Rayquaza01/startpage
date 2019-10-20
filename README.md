# Startpage
A startpage.  
[Video Demo](https://www.youtube.com/watch?v=Sf7xl_V9sr0), [Web Demo](https://Rayquaza01.github.io/startpage)

# How to use
Install the extension from the [Releases](https://github.com/Rayquaza01/startpage/releases) page.  
Configure the options in about:addons

# Config
 - Colors : a comma separated list of CSS colors to use as the background. Can be HEX or names.
 - Color Shuffle : if enabled, will shuffle between the colors listed above every 5 seconds.
 - Time : the format for the time using [moment.js](https://momentjs.com). https://momentjs.com/docs/#/displaying/format/
 - Date : the format for the date using moment.js.
 - Feed : the RSS feed that the startpage pulls from.
 - Feed Mode : whether to pull directly from the RSS, or to use another service (FreshRSS).
 - Fever Endpoint : the location for a Fever compatible api.
 - Fever API Key : a Fever api key.

# Permissions
The extension requires the following permissions:
 - `storage` : for storing user settings
 - `tabs` : for opening items in a new tab
 - `<all_urls>` : for getting RSS feeds and communicating with FreshRSS via Fever

# FreshRSS / Fever
[FreshRSS](https://freshrss.org) is a self hosted RSS aggregator. It can combine multiple RSS feeds into one, and has and API for marking items as read. This extension can pull items from FreshRSS and mark them as read when you open them, removing them from the feed.

To use this:
 - [enable the Fever API in FreshRSS](https://freshrss.github.io/FreshRSS/en/users/06_Mobile_access.html).
 - set the Feed to a FreshRSS feed (something like `your-server/FreshRSS/i/?a=rss&user=user&token=token&nb=20`).
 - set Feed Mode to FreshRSS.
 - set the Fever Endpoint to your FreshRSS (something like `your-server/FreshRSS/api/fever.php`).
 - [set the Fever API Key to the your FreshRSS Fever API key](https://freshrss.github.io/FreshRSS/en/users/06_Fever_API.html).

Now clicking/middle clicking will open the item and mark it as read. Right clicking will mark it as read, but won't open it.

# Acknowledgements
 - [moment.js](https://momentjs.com) (MIT)
 - [rss-parser](https://www.npmjs.com/package/rss-parser) (MIT)
