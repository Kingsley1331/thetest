export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
}

export class BlockGrid {
  constructor() {
    this.grid = [];
    this.deleteList = [];

    for (let x = 0; x < MAX_X; x++) {
      let col = [];
      for (let y = 0; y < MAX_Y; y++) {
        col.push(new Block(x, y));
      }
      this.grid.push(col);
    }
    return this;
  }

  render(el = document.querySelector('#gridEl')) {
    this.clearGrid();
    for (let x = 0; x < MAX_X; x++) {
      let id = 'col_' + x;
      let colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.id = id;
      el.appendChild(colEl);

      for (let y = 0; y < MAX_Y; y++) {
        let block = this.grid[x][y],
          id = `block_${x}x${y}`,
          blockEl = document.createElement('div');

        if(block) {
          blockEl.id = id;
          blockEl.className = 'block';
          blockEl.style.background = block.colour;
          blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
          colEl.appendChild(blockEl);
        }
      }
    }
    return this;
  }

  blockClicked(e, block) {
    console.log(e, block);
    let x = block.x;
    let y = block.y;
    let colour = block.colour;
    this.deleteList = [];
    this.addToDeleteList(block, colour);
    this.deleteColour(this.deleteList);
    this.render();
  }

  removeBlock(x, y) {
     this.grid[x].splice(y, 1);
     this.updateIds(x, y);
  }

  updateIds(x, y) {
    for(let i = y; i < this.grid[x].length; i++) {
      this.grid[x][i].y -= 1;
    }
  }

  addToDeleteList(block, colour) {
    if(this.deleteList.indexOf(block) === -1){
      this.deleteList.push(block);
    }
    let directions = {up: true, left: true, down: true, right: true};
    this.buildList(block, directions, 'up');
    this.buildList(block, directions, 'down');
    this.buildList(block, directions, 'left');
    this.buildList(block, directions, 'right');
    console.log('deleteList=>', this.deleteList);
  }

  deleteColour(list){console.log('deleteColour deleteList', list);
    let length = list.length;
    for(let i = 0; i < length; i++) {
      this.removeBlock(list[i].x, list[i]. y);
    }
  }

  clearGrid() {
    let el = document.querySelector('#gridEl');
    let col = document.querySelectorAll('.col');
    for(let i = 0; i < col.length; i++) {
      el.removeChild(col[i]);
    }
  }

  buildList(block, directions, direction) {
    let x = block.x;
    let y = block.y;
    let grid = this.grid;
    let colour = block.colour;
    let col;
    let row;
    if(direction === 'up') {
      col = x;
      row = y+1;
    }
    if(direction === 'down') {
      col = x;
      row = y-1;
    }
    if(direction === 'left') {
      col = x-1;
      row = y;
    }
    if(direction === 'right') {
      col = x+1;
      row = y;
    }

    if(directions[direction]) {
      if(grid[col] && grid[col][row] && grid[col][row].colour === colour && this.deleteList.indexOf(grid[col][row]) === -1) {
        this.deleteList.push(grid[col][row]);
        this.addToDeleteList(grid[col][row], colour);
      } else {
        directions[direction] = false;
      }
    }
  }

}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
