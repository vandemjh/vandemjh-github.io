// JSON structured as "name-of-file": ["possible", "search", "terms"]
// TODO put search terms for each file here
const jsFiles = {
    "app.js": [],
    "multiple.js": [],
    "click.js": [],
    "outrun.js": [],
    "penrose.js": [],
    "paradise.js": [],
    "global.js": [],
};

var debug = false;

window.onload = () => {
    var script = document.createElement("script");
    script.type = "module"
    var url = window.location.href;
    var split = url.split("?");
    var param = split[split.length - 1];

    if (
        param != undefined &&
        Object.keys(jsFiles).some((file) => file.includes(param))
    ) {
    	script.src = "js/" + Object.keys(jsFiles).find((file) => file.includes(param))
    } else {
        var source = Object.keys(jsFiles)[
            Math.floor(Math.random() * Object.keys(jsFiles).length)
        ];
        script.src = "js/" + source;
    }
    document.getElementsByTagName("footer")[0].appendChild(script);
};
