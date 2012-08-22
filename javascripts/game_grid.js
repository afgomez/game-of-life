function GameGrid(canvas) {

  if (typeof(canvas) == "string") {
    this.canvas = document.getElementById(canvas);
  } else {
    this.canvas = canvas;
  }
  
  this.opts = {
    cellSize: 5,
    borderSize: 1
  };


  this.rows = this.cellsIn(this.canvas.height);
  this.cols = this.cellsIn(this.canvas.width);

}

GameGrid.prototype = {
  constructor: GameGrid,

  /**
   * Calculate how many cells enter in the px length
   */
  cellsIn: function(px) {
    var usable_width = px - 1; // left border
    return Math.floor(usable_width / (this.opts.cellSize + this.opts.borderSize));
  },

  /**
   * Renders the grid in the canvas
   */
  renderGrid: function() {
    var ctx = this.canvas.getContext('2d');
    
    ctx.strokeStyle = '#ccc';
    this.cols = this.cellsIn(this.canvas.width);
    this.rows = this.cellsIn(this.canvas.height);

    // Usable width and height
    this.width  = (this.opts.cellSize + this.opts.borderSize) * this.cols;
    this.height = (this.opts.cellSize + this.opts.borderSize) * this.rows;


    // Real painting of the grid
    if (this.opts.borderSize > 0) {
      ctx.beginPath();
      ctx.lineWidth = this.opts.borderSize;
      var i, x, y;

      // Paint cols
      for (i = 0; i <= this.cols; i++) {
        x = i * (this.opts.cellSize + this.opts.borderSize) + 0.5; // https://developer.mozilla.org/en/Canvas_tutorial%3AApplying_styles_and_colors#A_lineWidth_example
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.height);
      }

      // Paint rows
      for (i = 0; i <= this.rows; i++) {
        y = i * (this.opts.cellSize + this.opts.borderSize) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(this.width, y);
      }

      ctx.stroke();
    }
  },

  mark: function(x, y) {
    var ctx = this.canvas.getContext('2d');

    if (x >= this.cols || y >= this.rows) { return; }

    x = Math.floor(x) * (this.opts.cellSize + this.opts.borderSize) + 1;
    y = Math.floor(y) * (this.opts.cellSize + this.opts.borderSize) + 1;
    ctx.fillRect(x, y, this.opts.cellSize, this.opts.cellSize);
  },

  clear: function(x, y) {
    var ctx = this.canvas.getContext('2d');

    if (x >= this.cols || y >= this.rows) { return; }

    /* Ensure x and y are integers */
    x = Math.floor(x) * (this.opts.cellSize + this.opts.borderSize) + 1;
    y = Math.floor(y) * (this.opts.cellSize + this.opts.borderSize) + 1;
    ctx.clearRect(x, y, this.opts.cellSize, this.opts.cellSize);
  },

  clearAll: function() {
    var ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderGrid();
  }

};
