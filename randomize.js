const jsFiles = [
    "app.js",
    "multiple.js",
    "click.js",
    "outrun.js",
    "penrose.js",
    "paradise.js",
    "sphere.js"
];

window.onload = () => {
    var script = document.createElement("script");
    var url = window.location.href;
    var split = url.split("?");
    var param = split[split.length - 1];
    var urlParams = new URLSearchParams(window.location.search);
    if (param != undefined && jsFiles.some((file) => file.includes(param))) {
        script.src = "js/" + jsFiles.find((file) => file.includes(param));
    } else
        script.src =
            "js/" + jsFiles[Math.floor(Math.random() * jsFiles.length)];
    document.getElementsByTagName("footer")[0].appendChild(script);
};
