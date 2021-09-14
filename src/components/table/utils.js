export function getElByClass(cls) {
  return document.getElementsByClassName(cls)[0];
}

export function calcTableHeight(tbEl) {
  const { clientHeight } = document.documentElement;
  const tableOffsetTop = tbEl.offsetTop;
  const tableSpace = 30;
  const paginationHeight = getElByClass('el-pagination')?.offsetHeight || 0;
  const footerHeight = getElByClass('el-footer')?.offsetHeight || 0;

  const height = (clientHeight > 1000 ? clientHeight : 1000) - tableOffsetTop - tableSpace - paginationHeight - footerHeight;
  return height > 0 ? height : 0;
}

export function filterHeader(origin, options, checkeds) {
  origin.forEach((item) => {
    const { prop, slot } = item;
    if ((prop || slot) !== 'actions') {
      options.push(item);
      checkeds.push(prop || slot);
    }
  });
}

export function isHide(checkeds, col) {
  const { prop, slot } = col;
  if ((prop || slot) === 'actions') return true;
  return checkeds.includes(prop || slot);
}
