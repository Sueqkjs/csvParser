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
    if(!reviver) reviver = new Function('return void 0;');
    return input.split("\n")
      .map(function(x){ return reviver(x) || x.split(",") })
      .map(function(x){ return reviver(x) || x.filter(function(y){ return y !== '' }) })
      .map(function(x){ return reviver(x) || x.map(function(y){ return y.replace('\r','') }) })
      .filter(function(x){ return !!x && !!x.length });
  };
  that["stringify"] = function stringify(input){
    return input.map(x => x.join(','))
    .join('\n');
  };
  return that;
};
