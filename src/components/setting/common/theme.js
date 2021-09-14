let ctheme = '#409EFF';

async function changeTheme(val) {
  const oldVal = ctheme; // 上一个主题色
  ctheme = val; // 当前主题色
  if (typeof val !== 'string') return;
  const themeCluster = getThemeCluster(val.replace('#', ''));
  const originalCluster = getThemeCluster(oldVal.replace('#', ''));

  // const getHandler = (variable, id) => {
  //   // eslint-disable-next-line no-shadow
  //   const originalCluster = getThemeCluster('#409eff'.replace('#', ''));
  //   // console.log('-----------', originalCluster);
  //   const newStyle = updateStyle(variable, originalCluster, themeCluster);

  //   let styleTag = document.getElementById(id);
  //   if (!styleTag) {
  //     styleTag = document.createElement('style');
  //     styleTag.setAttribute('id', id);
  //     document.head.appendChild(styleTag);
  //   }
  //   styleTag.innerText = newStyle;
  // };

  // getHandler('chalk', 'chalk-style');

  const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
    const text = style.innerText;
    return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text);
  });

  styles.forEach((style) => {
    const { innerText } = style;
    if (typeof innerText !== 'string') return;
    style.innerText = updateStyle(innerText, originalCluster, themeCluster);
  });
}

function getThemeCluster(theme) {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    // when primary color is in its rgb space
    if (tint === 0) {
      return [red, green, blue].join(',');
    }
    red += Math.round(tint * (255 - red));
    green += Math.round(tint * (255 - green));
    blue += Math.round(tint * (255 - blue));

    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);

    return `#${red}${green}${blue}`;
  };

  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    red = Math.round((1 - shade) * red);
    green = Math.round((1 - shade) * green);
    blue = Math.round((1 - shade) * blue);

    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);

    return `#${red}${green}${blue}`;
  };

  const clusters = [theme];
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(theme, 0.1));
  return clusters;
}

function updateStyle(style, oldCluster, newCluster) {
  let newStyle = style;
  newStyle = newStyle.replace(new RegExp('0d84ff', 'ig'), '66b1ff');
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
  });
  return newStyle;
}

export default changeTheme;
