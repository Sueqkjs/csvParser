(function(){
  global.csvParser = Parser;
}());

function Parser(input){
  if(typeof input !== 'string') return [String(input)];
  return input
  .split("\n")
  .map(function(x){ return x.split(",") })
  .map(function(x) => x.filter(function(y) => y !== ''))
  .map(function(x) => x.map(function(y) => y.replace('\r','')))
  .filter(function(x) => !!x && !!x.length)
};
