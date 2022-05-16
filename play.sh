#! /bin/bash

function main() {
  local gameFile="./resources/gameStatus.json"
  node src/setUpGame.js

  while grep -q '"isGameOver": false' ${gameFile}
  do
    read -p "Enter the move: " move
    node src/ticTacToe.js ${move}
    open html/index.html
  done
}

main
