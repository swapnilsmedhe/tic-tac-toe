/* eslint-disable no-magic-numbers */
const { writeFileSync, readFileSync } = require('fs');
const { generatePage } = require('./generatePage.js');

const registerMove = (game, move) => {
  const currentPlayersMoves = game[game.currentPlayer];
  currentPlayersMoves.push(move);
  return game;
};

const incrementMoves = (game) => {
  game.totalMoves += 1;
  return game;
};

const isSubsetOf = function (superset) {
  return this.every((element) => superset.includes(element));
};

const hasPlayerWon = (playedMoves) => {
  const winningMoves = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
    [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
  ];

  const winningMove = winningMoves.find((winningMove) =>
    isSubsetOf.call(winningMove, playedMoves)
  );
  return !!winningMove;
};

const isGameDrawn = (game) => {
  const currentPlayersMoves = game[game.currentPlayer];
  return game.totalMoves === 9 && !hasPlayerWon(currentPlayersMoves);
};

const isGameOver = (game) => {
  const currentPlayersMoves = game[game.currentPlayer];
  return hasPlayerWon(currentPlayersMoves) || isGameDrawn(game);
};

const updateCurrentPlayer = (game) => {
  const nextPlayer = 'player2';
  const currentPlayer = game.currentPlayer;
  game.currentPlayer = currentPlayer === nextPlayer ? 'player1' : nextPlayer;

  return game;
};

const isValidMove = ({ player1, player2 }, playedMove) => {
  if (playedMove < 1 || playedMove > 9) {
    return false;
  }
  return [...player1, ...player2].every((move) => move !== playedMove);
};

const playRound = (game, move) => {
  if (!isValidMove(game, move)) {
    return game;
  }
  game = registerMove(game, move);
  game = incrementMoves(game);
  if (isGameOver(game)) {
    game.isGameOver = true;
    return game;
  }
  return updateCurrentPlayer(game);
};

const getSymbol = (position, player1Moves, player2Moves) => {
  if (player1Moves.includes(position)) {
    return 'X';
  }
  if (player2Moves.includes(position)) {
    return 'O';
  }
  return ' ';
};

const mapMovesToSymbol = ({ player1: player1Moves, player2: player2Moves }) => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((position) =>
    getSymbol(position, player1Moves, player2Moves)
  );
};

const getMessage = (game) => {
  const currentPlayer = game.currentPlayer;
  if (!game.isGameOver) {
    return currentPlayer.concat(' please enter the next move');
  }

  let message = 'Congratulations '.concat(currentPlayer, ' you won the game!');
  if (isGameDrawn(game)) {
    message = 'Game drawn';
  }
  return message;
};

const readFile = (filePath) => readFileSync(filePath, 'utf-8');

const prettyStringify = (value) => JSON.stringify(value, null, 1);

const main = (move) => {
  let game = JSON.parse(readFile('./resources/gameStatus.json'));
  game = playRound(game, move);

  const boardStatus = mapMovesToSymbol(game);
  const template = readFile('./resources/template.html');
  const message = getMessage(game);
  const html = generatePage(boardStatus, message, template);

  writeFileSync('./html/index.html', html, 'utf-8');
  writeFileSync('./resources/gameStatus.json', prettyStringify(game), 'utf-8');
};

main(+process.argv[2]);
