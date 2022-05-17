/* eslint-disable no-magic-numbers */
const fs = require('fs');

const writeToFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
  } catch (error) {
    throw 'Unable to start the game';
  }
};

const main = () => {
  const game = {
    player1: [],
    player2: [],
    currentPlayer: 'player1',
    totalMoves: 0,
    isGameOver: false
  };
  writeToFile('./resources/gameStatus.json', JSON.stringify(game));
};

main();
