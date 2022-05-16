/* eslint-disable no-magic-numbers */

const openTag = (tag, attribute, value) => {
  return '<'.concat(tag, ' ', attribute, '=', '"', value, '"', '>');
};

const closeTag = (tag) => '</'.concat(tag, '>');

const element = (name, attribute, value, content) => {
  return openTag(name, attribute, value) + content + closeTag(name);
};

const div = (attribute, value, content) => {
  return element('div', attribute, value, content);
};

const generateRow = (cells) => {
  return cells.map((cell) => div('class', 'cell', cell)).join(' ');
};

const generateBoard = (boardStatus) => {
  let board = '';
  for (let cells = 0; cells < 9; cells += 3) {
    const rowData = boardStatus.slice(cells, cells + 3);
    board += div('class', 'row', generateRow(rowData));
  }
  return board;
};

const generatePage = (boardStatus, message, template) => {
  const page = template.replace(/__BOARD__/, generateBoard(boardStatus));
  return page.replace(/__MESSAGE__/, message);
};

exports.generatePage = generatePage;
