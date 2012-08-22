function GameOfLife(rows, cols) {
  this.rows = rows || 60;
  this.cols = cols || 40;
  
  // Construct the current generation array
  this.current_generation = Array(this.rows);
  for (var i = 0; i < this.cols; i++) {
    this.current_generation[i] = Array(this.cols);
  }
  
}


GameOfLife.prototype = {
  constructor: GameOfLife,
  
  randomize: function() {
    for (var i = 0; i< this.rows; i++) {
      for(var j = 0; j< this.cols; j++) {
        this.current_generation[i][j] = Math.round(Math.random());
      }
    }
  },

  get: function(row, col) {
    return this.current_generation[row][col];
  },


  /**
   * Here is where the magic happens
   */
  next: function() {
    var next = this.current_generation.slice(0);
    var i, j, ni, nj, current, alive_neighbours;


    for (i = 0; i < this.rows; i++) {
      for (j = 0; j < this.cols; j++) {
        alive_neighbours = 0;
        current_alive = this.current_generation[i][j];

        // Count alive neighbours
        for (ni = (i ? i-1 : i); ni <= (i+1 == this.rows ? i : i+1); ni++) {
          for (nj = (j ? j-1 : j); nj <= (j+1 == this.cols ? j : j+1); nj++) {
            
            if (i == ni && j == nj) { // Skip current cell
              continue;
            }
            if (this.current_generation[ni][nj]) {
              alive_neighbours++;
            }

          }
        }

        switch (alive_neighbours) {
          case 2:
            // Una celula muerta necesita tres vecinos vivos para nacer
            // Una celula viva necesita entre dos y tres vecinos vivos para sobrevivir
            if (!current_alive) { break; }
          case 3:
            next[i][j] = 1;
            break;
          default:
            next[i][j] = 0;
            break;
        }
        
        this.current_generation = next;

      }
    }

    return this;
  }
  


};
