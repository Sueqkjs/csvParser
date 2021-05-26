(function(){
  try {
    if(window.console) void 0;
    window.csvParser = Parser;
  } catch {
    global.csvParser = Parser;
  };
}());

function Parser(){
  var that = {};
  
  that["parse"] = function parse(input, reviver){
    if(typeof reviver !== "function") reviver = new Function('return void 0;');
    return input.split("\n")
      .map(function(x){ return reviver(x, 0) || x.split(",") })
      .map(function(x){ return reviver(x, 1) || x.filter(function(y){ return reviver(y, 2) || y !== '' }) })
      .map(function(x){ return reviver(x, 3) || x.map(function(y){ return reviver(y, 4) || y.replace('\r','') }) })
      .filter(function(x){ return !!x && !!x.length });
  };
  that["stringify"] = function stringify(input){
    return input.map(x => x.join())
    .join('\n');
  };
  
  return that;
};
