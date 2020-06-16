// 模仿 optional chaining
// input: 要檢查的物件
// chainString: 要檢查的路徑 'aaa.bbb['ccc'][0].ddd[1]' 像這樣的東西
// fallback: 找不到的話要返回什麼
// call: 如果找到的是函數的話要不要直接執行
// props: 如果要執行函數的話要給的參數，必須是 Array
const pick = (input, chaingString, {fallback, call, props=[]}={}) => {
  // input 若不是物件 或 chaingString 不是字串 ，就 return input
  if (
    (typeof input !== 'object')
    || (!chaingString || typeof chaingString !== 'string')
  ) { return input; }

  // 將 chaingString 拆成以 '.' 為分隔的字串，再轉成陣列
  const $chainingArray = chaingString
  .replace(/(\[(['"])?|(['"])?\])/g, '.') // 將 [' 或 '] 改成 . （包含單/雙引號有無）
  .replace(/\.+/g, '.') // 將連續多個的 . 改成只有一個
  .replace(/^\.+|\.+$/g, '') // 將頭尾的 . 刪掉
  .split('.');

  // 遞迴取出目標
  const $result = $chainingArray.reduce((acc, key) => {
    if (
      (acc !== null || acc !== undefined)
      && (typeof acc === 'object')
    ) { return acc[key]; }
  }, input);

  // 回傳或者執行目標
  return fallback && $result === undefined 
    ? ( call && typeof fallback === 'function'? fallback(...props) : fallback )
    : ( call && typeof $result === 'function'? $result(...props) : $result )
}

// const someObj = {
//   prop: {
//     valA: 'this is val A',
//     valB: 'this is val B',
//     valC: greeting=>`hello ${greeting} !`
//   },
//   attr: [ '111', '222', '333',
//     { qqq: 'you find QQQ' }
//   ],
//   fn() { return 'fn no need params'; }
// };