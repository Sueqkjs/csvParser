# csvParser
 
## これはなに

csvParser で察しろ、2次元配列で返す奴だ

## 使い方

### node.js

まずcloneしようか

```bash
 git clone https://github.com/Sueqkjs/csvParser.git
```

なんと！読み込むだけで使えます！

```js
 require('./csvParser/index.js');
 const csv = new csvParser();
 const fs = require('fs');
 // parse
 const bots = fs.readFileSync('./2000kBots.csv');
 console.log(csv.parse(bots));
 // stringify
 const commasplit = [ [ 'a', 'b', 'c' ], [ 'n', 'o', 'p' ] ];
 console.log(csv.stringify(commasplit));
```

### Webでの使用例
ローカルにファイル持ってこよう

```html
 <script src="csvParser/index.js"></script>
```
