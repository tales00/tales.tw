<template lang="pug">
  .masonryBlock
    slot
</template>

<script>
function debounce(fn) {
  let frame;
  return (...params)=>{
    if(frame) { cancelAnimationFrame(frame) }
    frame = requestAnimationFrame( ()=>{ fn(...params); } )
  }
}
const createMasonryBlock = ({$el, $spanBasis = 16}) => {
  console.log('createMasonryBlock');
  
  let lastWidth = 0; 
  return ()=>{
    // 寬度沒變的話不動作
    if( $el.clientWidth !== lastWidth ) {
      console.log('re calc masonry');
    
      // 清除所有上次加入的樣式
      [...$el.querySelectorAll('.masonryItem')].forEach(item=>item.removeAttribute('style'));
      
      // 抓出當下有幾個欄位
      const col_count = parseInt( getComputedStyle( $el ).getPropertyValue('--col-count') );
      
      // 只有當下設定為兩欄以上才處理
      if( col_count > 1 ) {
        // 設定格子對齊為 start ，這樣才能得到正確的高度
        $el.style.alignItems = 'start';
        
        // 用迴圈一次設定一直欄內格子的樣式
        for( var col_idx=1; col_idx<=col_count; col_idx++) {
          const items_in_this_column = [...$el.querySelectorAll(`.masonryItem:nth-of-type(${col_count}n+${col_idx})`)];
          
          let row_start = 1;
          items_in_this_column.forEach(item=>{
            const row_span = Math.ceil( item.offsetHeight / $spanBasis );
  
            // 若不設定 gridColumn 跟 gridRowStart 則可以緊密排列
            // item.style.gridColumn = col_idx;
            // item.style.gridRowStart = row_start;
            item.style.gridRowEnd = 'span ' + row_span;
  
            row_start = row_start + row_span;
          });
  
        }
        
        // 把最後一列的 margin-bottom 消除
        [...$el.querySelectorAll(`.masonryItem:nth-last-of-type(-n + ${col_count})`)].forEach(item=>item.style.marginBottom = 0);
      }
      
      // 把格字對齊改回 Stretch
      $el.style.alignItems = 'stretch';
      lastWidth = $el.clientWidth
    }
  }
}
export default {
  name: 'masonryBlock',
  mounted() {
    const calcMasonryBlock = debounce(createMasonryBlock({$el: this.$el}));
    // 各種情況觸發重新計算
    window.addEventListener('resize', calcMasonryBlock, {passive: true} );
    this.$on('hook:updated', calcMasonryBlock );
    if( this.$slots.default ) { calcMasonryBlock(); }

    // 刪掉事件
    this.$once('hook:beforeDestroy', () => { window.removeEventListener('resize', calcMasonryBlock ); });
  },
}
</script>

<style lang="scss" scoped>
.masonryBlock {
  display: grid;
  grid-template-columns: repeat( var(--col-count), 1fr);
  grid-column-gap: var(--col-gap, 0);
  padding-bottom: var(--row-gap, var(--col-gap));

  .masonryItem:not(:last-child) {
    margin-bottom: var(--row-gap, var(--col-gap));
  }
}
</style>