module.exports = function (source) {
  return source
    .replace(/(\d+(\.\d+)?)px/g, function (match, p1, p2, offset, str) {
      return `${p1 * 0.02}rem`;
    })
    .replace(/apx/g, "px");
};
