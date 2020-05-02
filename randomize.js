const jsFiles = [
	"app.js", 
	"multiple.js", 
	"click.js", 
	"outrun.js"
	];

window.onload = () => {
    var script = document.createElement("script");
    var urlParams = new URLSearchParams(window.location.search);
    if (
        urlParams.has("js") &&
        jsFiles.some((file) => file.includes(urlParams.get("js")))
    ) {
        script.src =
            "js/" +
            jsFiles.find((file) => file.includes(urlParams.get("js")));
    } else
        script.src =
            "js/" + jsFiles[Math.floor(Math.random() * jsFiles.length)];
    document.getElementsByTagName("footer")[0].appendChild(script);
};
