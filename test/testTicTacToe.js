const assert = require('assert');
const { playRound, hasPlayerWon } = require('../src/ticTacToe.js');

describe('playRound', () => {
  it('should play a roud for player 1', () => {
    return assert.deepStrictEqual(playRound({
      player1: [],
      player2: [],
      currentPlayer: 'player1',
      totalMoves: 0,
      isGameOver: false
    }, 1), {
      player1: [1],
      player2: [],
      currentPlayer: 'player2',
      totalMoves: 1,
      isGameOver: false
    });
  });

  it('should play a round for player 2', () => {
    return assert.deepStrictEqual(playRound({
      player1: [1],
      player2: [],
      currentPlayer: 'player2',
      totalMoves: 1,
      isGameOver: false
    }, 5), {
      player1: [1],
      player2: [5],
      currentPlayer: 'player1',
      totalMoves: 2,
      isGameOver: false
    });
  });

  it('should play a round when the played move is winning move', () => {
    return assert.deepStrictEqual(playRound({
      player1: [5, 3],
      player2: [1, 2],
      currentPlayer: 'player1',
      totalMoves: 4,
      isGameOver: false
    }, 7), {
      player1: [5, 3, 7],
      player2: [1, 2],
      currentPlayer: 'player1',
      totalMoves: 5,
      isGameOver: true
    });
  });

  it('should play a round when played move is last move of the game', () => {
    return assert.deepStrictEqual(playRound({
      player1: [5, 1, 6, 2],
      player2: [3, 9, 8, 4],
      currentPlayer: 'player1',
      totalMoves: 8,
      isGameOver: false
    }, 7), {
      player1: [5, 1, 6, 2, 7],
      player2: [3, 9, 8, 4],
      currentPlayer: 'player1',
      totalMoves: 9,
      isGameOver: true
    });
  });

  it('should not play a round when played move is already played', () => {
    return assert.deepStrictEqual(playRound({
      player1: [4, 7],
      player2: [5, 3],
      currentPlayer: 'player1',
      totalMoves: 4,
      isGameOver: false
    }, 3), {
      player1: [4, 7],
      player2: [5, 3],
      currentPlayer: 'player1',
      totalMoves: 4,
      isGameOver: false
    });
  });
});

describe('hasPlayerWon', () => {
  it('should return true if player won', () => {
    return assert.ok(hasPlayerWon([4, 1, 7]));
  });

  it('should return false if player has not won', () => {
    return assert.ok(hasPlayerWon([1, 4, 9, 5]));
  });
});
