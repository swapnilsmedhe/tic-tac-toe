/* eslint-disable no-magic-numbers */
const { writeFileSync } = require('fs');

const prettyStringify = (value) => {
  return JSON.stringify(value, null, 1);
};

const main = () => {
  const game = {
    player1: [],
    player2: [],
    currentPlayer: 'player1',
    totalMoves: 0,
    isGameOver: false
  };
  writeFileSync('./resources/gameStatus.json', prettyStringify(game), 'utf-8');
};

main();
