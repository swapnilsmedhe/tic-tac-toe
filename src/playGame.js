const ticTacToe = require('./ticTacToe.js');
const { playRound, mapMovesToSymbol, getMessage } = ticTacToe;
const { writeToFile, readFile } = ticTacToe;
const { generatePage } = require('./generatePage.js');

const main = (move) => {
  let game = JSON.parse(readFile('./resources/gameStatus.json'));
  game = playRound(game, move);

  const boardStatus = mapMovesToSymbol(game);
  const template = readFile('./resources/template.html');
  const message = getMessage(game);
  const html = generatePage(boardStatus, message, template);

  writeToFile('./html/index.html', html);
  writeToFile('./resources/gameStatus.json', JSON.stringify(game));
};

main(+process.argv[2]);
