type Move = "piedra" | "papel" | "tijera";
export const state = {
  data: {
    currentGame: {
      playerMove: "",
      machineMove: "",
    },
    history: [],
  },
  listeners: [],
  init() {
    const stateSaved = localStorage.getItem("state-saved-game");
    if (JSON.parse(stateSaved) != null) {
      this.setState(JSON.parse(stateSaved));
    }
  },
  getState() {
    return this.data;
  },
  setState(newState: {}) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state-saved-game", JSON.stringify(newState));
  },
  subscribe(cb: () => any) {
    this.listeners.push(cb);
  },
  setMove(move: Move) {
    const currentState = this.getState();
    currentState.currentGame.playerMove = move;
    currentState.currentGame.machineMove = this.chooseAleatoryMove();
    currentState.history.push({
      playerMove: currentState.currentGame.playerMove,
      machineMove: currentState.currentGame.machineMove,
    });
    this.setState(currentState);
  },
  chooseAleatoryMove() {
    const movesList = ["piedra", "papel", "tijera"];
    const randomMove = Math.floor(Math.random() * movesList.length);
    return movesList[randomMove];
  },
  getCurrentPlay() {
    const currentState = this.getState();
    return currentState.currentGame;
  },
  getCurrentWhoWins() {
    const currentState = this.getState();
    const currentPlayerMove = currentState.currentGame.playerMove;
    const currentMachineMove = currentState.currentGame.machineMove;
    return this.getWhoWins(currentPlayerMove, currentMachineMove);
  },
  getWhoWins(playerMove: Move, machineMove: Move): number {
    const win = [
      playerMove == "piedra" && machineMove == "tijera",
      playerMove == "papel" && machineMove == "piedra",
      playerMove == "tijera" && machineMove == "papel",
    ];
    const lose = [
      playerMove == "piedra" && machineMove == "papel",
      playerMove == "papel" && machineMove == "tijera",
      playerMove == "tijera" && machineMove == "piedra",
    ];
    if (win.includes(true)) {
      return 1;
    } else if (lose.includes(true)) {
      return -1;
    } else {
      return 0;
    }
  },
  getHistoryOfPoints() {
    let playerPoints = 0;
    let machinePoints = 0;
    const historyGames = this.getState().history;
    for (const game of historyGames) {
      if (this.getWhoWins(game.playerMove, game.machineMove) == 1) {
        playerPoints++;
      }
      if (this.getWhoWins(game.playerMove, game.machineMove) == -1) {
        machinePoints++;
      }
    }
    return {
      playerPoints,
      machinePoints,
    };
  },
};
