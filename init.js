// JSON structured as "name-of-file": ["possible", "search", "terms"]
// TODO put search terms for each file here
const jsFiles = {
  'app.js': [],
  'multiple.js': [],
  'click.js': [],
  'outrun.js': [],
  'penrose.js': [],
  'paradise.js': [],
  'global.js': [],
  'graph.js': [],
  'energy.js': [],
};

var debug = false;

window.onload = () => {
  var script = document.createElement('script');
  script.type = 'module';
  var url = window.location.href;
  var split = url.split('?');
  var param = split[split.length - 1];
  var visited = Object.keys(sessionStorage);
  var files = Object.keys(jsFiles);
  var unvisited = files.filter((v) => !visited.includes(v));

  if (param != undefined && files.some((file) => file.includes(param))) {
    script.src = 'js/' + files.find((file) => file.includes(param));
  } else {
    if (unvisited.length == 0) {
      sessionStorage.clear();
      unvisited = files;
    }
    var source = unvisited[Math.floor(Math.random() * unvisited.length)];
    script.src = 'js/' + source;
    sessionStorage.setItem(source, 'visited');
  }
  document.getElementsByTagName('footer')[0].appendChild(script);
};
