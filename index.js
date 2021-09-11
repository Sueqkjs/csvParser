"use strict";

(function(self) {
  self = Object.create(null);
  
  function Parser(type) {
    var sep = "";
    type = type.toLowerCase();
    if(type === "tsv") {
      sep = "\t"
    } else if(type === "csv") {
      sep = ","
    };
  
    Object.defineProperty(self, "parse", {
      value: function parse(input, reviver) {
        if(typeof reviver !== "function") reviver = new Function('return void 0;');
          return input.split("\n")
            .map(
              function(x) {
                return reviver(x, 0) || x.split(sep)
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
  
    Object.defineProperty(self, "stringify", {
      value: function stringify(input){
        return input.map(
          function(x) {
            return x.map(
              function(y) {
                if(safe) return y.replace(RegExp(sep, "g"), "");
                return y;
              }
            )
            .join();
          }
        )
          .join("\n");
      }
    });
  
    Object.freeze(self);
  };
})((global && global.csvParser) || (window && window.csvParser));
