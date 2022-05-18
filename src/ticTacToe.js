/* eslint-disable no-magic-numbers */
const fs = require('fs');

const registerMove = (game, move) => {
  const currentPlayersMoves = game[game.currentPlayer];
  currentPlayersMoves.push(move);
  game.totalMoves++;
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

  return winningMoves.some((winningMove) =>
    isSubsetOf.call(winningMove, playedMoves)
  );
};

const isGameDrawn = (game) => {
  const currentPlayersMoves = game[game.currentPlayer];
  return game.totalMoves === 9 && !hasPlayerWon(currentPlayersMoves);
};

const isGameOver = (game) => {
  const currentPlayersMoves = game[game.currentPlayer];
  return hasPlayerWon(currentPlayersMoves) || isGameDrawn(game);
};

const changeCurrentPlayer = ({ currentPlayer }) => {
  return currentPlayer === 'player1' ? 'player2' : 'player1';
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
  if (isGameOver(game)) {
    game.isGameOver = true;
    return game;
  }
  game.currentPlayer = changeCurrentPlayer(game);
  return game;
};

const getSymbol = (position, player1Moves, player2Moves) => {
  if (player1Moves.includes(position)) {
    return 'X';
  }
  return player2Moves.includes(position) ? 'O' : ' ';
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

const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    throw 'File not found';
  }
};

const writeToFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
  } catch (error) {
    throw 'Unable to save the game';
  }
};

exports.playRound = playRound;
exports.mapMovesToSymbol = mapMovesToSymbol;
exports.getMessage = getMessage;
exports.writeToFile = writeToFile;
exports.readFile = readFile;
exports.hasPlayerWon = hasPlayerWon;
