var jsfiles = [
	"app.js",
	"multiple.js",
	"click.js",
	"outrun.js"
];

window.onload = () => {
    var script = document.createElement("script");
    script.src = "js/" + jsfiles[Math.floor(Math.random() * jsfiles.length)];
    document.getElementsByTagName("footer")[0].appendChild(script);
};
