// optional chaining
export const pick = (input, chaining=null, cb, defaultVal) => [cb].reduce(
  // target 就是最後要得到的物件，
  // cb 是（如果 target 是函數的話）要傳入的參數
  // 如果 target 是函數，並且 cb 是陣列而且有內容，就執行函數
  // 如果 target 不是函數，又或者 cb 是空的，
  // 再看 target 跟最初傳入的 input 是否"不同"
  // 不同的話就回傳 target  或 defaultVal
  // 相同的話就回傳 defaultVal 或是 false
  target=>(target && typeof cb==='function')
    ? cb(target)
    : (target!==input)
      ? (typeof target!=='undefined')
        ? target
        : defaultVal
      : defaultVal
  ,
  // 傳給上面用的參數 target：
  // 如果 chaining 沒東西或不是字串，就是 input 本身
  // 如果 chaining 是字串而且有內容，就把 chaining 拆開，一個一個測試
  // 測試到最後一個就是 target 
  (!chaining || typeof chaining!=='string')
    ? input 
    : chaining
      .replace(/(\])/g, '$1.').replace(/\.$/, '').split('.')
      .reduce( (ac, key)=>/^(\w*)\[(['|"]?)(.+)(\2)\]$/.test(key)
        ? key.match(/^(\w*)\[(['|"]?)(.+)(?:\2)\]$/).splice(1).filter(val=>!/^'|"$/.test(val))
          .reduce((a_prop, c_prop)=>(!a_prop)
            ? ac[c_prop]
            : (typeof a_prop==='string')
              ? (typeof ac[a_prop][c_prop]==='function')
                ? ac[a_prop][c_prop]
                : ac[a_prop]
              : a_prop[c_prop]
          )
        : (typeof ac==='object' && key in ac)
          ? ac[key]
          : undefined
      , input )
);

/*

pick( <查找的物件>[, <要查找的路徑>, [ <callback>, [ <沒找到時的預設值: undefind> ]]] )；

const someObj = {
  some: {
    prop: {
      valA: 'this is val A',
      valB: 'this is val B',
      valC: greeting=>`hello ${greeting} !`
    },
    attr: [ '111', '222', '333',
      { qqq: 'you find QQQ' }
    ],
    fn() { return 'fn no need params'; }
  }
};

console.log(
  pick(someObj, 'some.prop.valC', fn=>fn('world')), // 'hello world'
  pick(someObj, 'some.prop["valC"]', fn=>fn('eirth')), // 'hello eirth'
  pick(someObj.some.prop.valC, '', fn=>fn('space')), // 'hello space'
  pick(someObj, 'some.attr[3]["qqq"]'), // 'you find QQQ'
  pick(someObj.some.attr[3], '["qqq"]'), // 'you find QQQ'
  pick(someObj.some.attr, '[0]'), // 111
  pick(someObj, 'aaa.bbb.ccc', null, 'default value'), // 'default value'
  pick(someObj, 'some.fn'), // 得到 fn 本身
  pick(someObj, 'some.fn', fn=>{fn()}), // 執行 fn： 'fn no need params'
  pick(someObj, 'some.fn2', fn=>{fn()}), // undefind
  pick(someObj, 'some.fn2', fn=>{fn()}, 'can't find function'), // 'can't find function'
)
*/