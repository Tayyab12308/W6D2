class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", (e) => {
      const $square = e.target;
      console.log($square);
      this.makeMove($square);
    })
  }

  makeMove(square) {
    const $square = $(square);
    // Attempts to make a move, alert if move is illegal
    try {
      const currentPlayer = this.game.currentPlayer;
      this.game.playMove($square.data("pos"))
      $square.addClass("played")
      $square.html(currentPlayer);
      if (currentPlayer === "x") {
        $square.addClass("x-player");
      } else {
        $square.addClass("o-player");
      }
    } catch (e) {
      alert(e.msg);
    }

    // Checks if game is over
    if (this.game.isOver()) {
      const winner = this.game.winner();
      if (winner === "x") {
        $(".x-player").addClass("winner");
        $(".o-player").addClass("loser");
      } else {
        $(".o-player").addClass("winner");
        $(".x-player").addClass("loser");
      }
      this.$el.off(); // Remove event handler when game is over
      this.$el.append(`<div>${winner} has won!</div>`)
      this.$el.addClass('game-over')
    }
  }

  setupBoard() {
    const board = $("<ul>");
    board.addClass("board");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = $("<li>");
        square.addClass("square");
        square.data("pos", [i, j]);
        board.append(square);
      }
    }
    this.$el.append(board);
  };
};

module.exports = View;
