"use strict";

(function(){
  try {
    if(window.console) void 0;
    window.csvParser = Parser;
  } catch {
    global.csvParser = Parser;
  };
}());

function Parser(options) {
  var that = Object.create(null);
  
  if(!options) options = {};
  var safe = options.safe;
  
  Object.defineProperty(that, "parse", {
    value: function parse(input, reviver) {
      if(typeof reviver !== "function") reviver = new Function('return void 0;');
        return input.split("\n")
          .map(
            function(x) {
              return reviver(x, 0) || x.split(",")
            }
          )
          .map(
            function(x) {
              return reviver(x, 1) || 
              x.filter(
                function(y) {
                  return reviver(y, 2) ||
                    y !== ""
                }
              )
            }
          )
          .map(
            function(x) {
              return reviver(x, 3) || 
                x.map(
                  function(y) {
                    return reviver(y, 4) ||
                      y.replace("\r", "")
                  }
              )
            }
          )
          .filter(
            function(x) {
              return !!x && !!x.length
            }
        );
    }
  });
  
  Object.defineProperty(that, "stringify", {
    value: function stringify(input){
      return input.map(
        function(x) {
          return x.map(
            function(y) {
              if(safe) return y.replace(/,/g, "");
              return y;
            }
          )
          .join();
        }
      )
        .join("\n");
    }
  });
  
  Object.freeze(that);
  Object.seal(that);
  return that;
};
