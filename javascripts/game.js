function GameOfLife(canvas) {
  this.grid = new GameGrid(canvas);
  this.cols = this.grid.cols;
  this.rows = this.grid.rows;

  this.engine = new GameEngine(this.cols, this.rows);
  
  this.grid.renderGrid();
  this.engine.randomize();

  this.paintCurrent();
}

GameOfLife.prototype = {
  constructor: GameOfLife,
  paintCurrent: function() {
    var current = this.engine.get();

    for (var x = 0; x < this.cols; x++) {
      for (var y = 0; y < this.rows; y++) {
        this.grid[current[x][y] ? 'mark' : 'clear'](x, y);
      }
    }

  },
  next: function() {
    this.engine.next();
    this.paintCurrent();
  }
};
