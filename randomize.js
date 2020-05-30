const jsFiles = {
    "app.js":[],
    "multiple.js":[],
    "click.js":[],
    "outrun.js":[],
    "penrose.js":[],
    "paradise.js":[],
    // "sphere.js":["onresize","init"]
};

var debug = false;

window.onload = () => {
    var script = document.createElement("script");
    var url = window.location.href;
    var split = url.split("?");
    var param = split[split.length - 1];
    // var urlParams = new URLSearchParams(window.location.search);
    if (param != undefined && Object.keys(jsFiles).some((file) => file.includes(param))) {
    	var file = Object.keys(jsFiles).find((file) => file.includes(param));
    	var loaded = 0;
    	var date;
    	if (debug) date = Date.now();
    	
    	jsFiles[file].forEach((file) => {
    	    var script = document.createElement("script");
    	    script.src = "js/utils/" + file + ".js";
    	    script.onload = () => {
    	        loaded++;
    	        if (debug) console.log("Loaded " + file);
    	    };
    	    document.getElementsByTagName("footer")[0].appendChild(script);
    	});
    	
    	var wait = () => {
    	    if (loaded != jsFiles[file].length) {
    	        setTimeout(wait, 1);
    	    } else {
    	        if (debug)
    	            console.log(
    	                "Loaded " +
    	                    loaded +
    	                    " of " +
    	                    jsFiles[file].length +
    	                    " requirements in " +
    	                    (Date.now() - date) +
    	                    " milliseconds."
    	            );
    	    }
    	}
    	wait();
        script.src = "js/" + file;
    } else
        script.src =
            "js/" + Object.keys(jsFiles)[Math.floor(Math.random() * Object.keys(jsFiles).length)];
    document.getElementsByTagName("footer")[0].appendChild(script);
};
