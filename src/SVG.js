const dom = new DOMParser();

function svgparse(svg) {
    return dom.parseFromString(svg, "image/svg+xml").documentElement;
}

export const icons = {
    close: svgparse(require("svg-inline-loader?!./icons/close.svg")),
    cog: svgparse(require("svg-inline-loader?!./icons/cog.svg"))
};

export function insertSVG() {
    [...document.querySelectorAll(".svg")].forEach(
        item => item.appendChild(icons[item.dataset.icon])
    );
}
