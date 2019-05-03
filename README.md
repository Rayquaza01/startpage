# Startpage
A startpage.

# How to use
There is a gear in the bottom left corner that opens a config page. It should also say "change config" in the center.

# Config
The config is JSON.
 - `day` is the hours that day lasts. `[6, 20]` means use the day theme from 6:00 to 20:59.
 - `colorscheme` contains the colors to use in the day and night themes. `bg` is background-color, and `fg` is color.
 - `text` is the text to display above the date. Can be different in day and night themes. First character will be inverted color.
 - `dateformat` is the format of the date/time. Using https://momentjs.com/docs/#/displaying/
 - `sites` is an array of sites to display. The first element should be display text, and the second should be a URL.
