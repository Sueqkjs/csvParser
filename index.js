(function(){
  try {
    if(window.console) void 0;
    window.csvParser = Parser;
  } catch {
    global.csvParser = Parser;
  };
}());

function Parser(input){
  if(typeof input !== 'string') return [String(input)];
  return input
  .split("\n")
  .map(function(x){ return x.split(",") })
  .map(function(x){ return x.filter(function(y){ return y !== '' }) })
  .map(function(x){ return x.map(function(y){ return y.replace('\r','') }) })
  .filter(function(x){ return !!x && !!x.length })
};
