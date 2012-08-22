function GameEngine(cols, rows) {
  this.rows = rows || 40;
  this.cols = cols || 60;
  
  // Construct the current generation array
  this.init();
}


GameEngine.prototype = {
  constructor: GameEngine,
  init: function() {
    this.current_generation = this.createEmptyArray();
  },
  randomize: function() {
    for (var i = 0; i< this.cols; i++) {
      for(var j = 0; j< this.rows; j++) {
        this.current_generation[i][j] = Math.random() > 0.8 ? 1 : 0;
      }
    }
  },

  get: function(col, row) {
    if (arguments.length >= 2) {
      return this.current_generation[col][row];
    } else {
      return this.current_generation;
    }
  },


  /**
   * Here is where the magic happens
   */
  next: function() {
    var next = this.createEmptyArray();
    var i, j, current, alive_neighbours;

    for (i = 0; i < this.cols; i++) {
      for (j = 0; j < this.rows; j++) {
        alive_neighbours = this.aliveNeighboursFor(i, j);
        current_alive = this.current_generation[i][j];
        
        if (alive_neighbours == 3 || (alive_neighbours == 2 && current_alive)) {
          next[i][j] = 1;
        } else {
          next[i][j] = 0;
        }
        

      }
    }
    
    this.current_generation = next;
    return this;
  },

  aliveNeighboursFor: function(i, j) {
    var neighbour, ni, limit_i, nj, limit_j, alive_count = 0;
  
    limit_i = (i+1 == this.cols ? i : i+1);
    limit_j = (j+1 == this.rows ? j : j+1);
    
    for (ni = (i === 0 ? i : i-1); ni <= limit_i; ni++) {
      for (nj = (j === 0 ? i : j-1); nj <= limit_j; nj++) {
        if (ni == i && nj == j) {
          continue;
        }
        neighbour = this.current_generation[ni][nj];
        if (neighbour) {
          alive_count += 1;
        }
      }
    }

    return alive_count;
  },

  createEmptyArray: function() {
    var arr = Array(this.cols);
    for (var i = 0; i < this.cols; i++) {
      arr[i] = Array(this.rows);
    }
    return arr;
  }
  



};
