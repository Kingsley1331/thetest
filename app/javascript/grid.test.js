import { Block, COLOURS, BlockGrid } from './grid';
import { assert } from 'chai';

describe('Block', () => {
  it('should be created with correct coordinates and one of the valid colours', () => {
    let testCoords = [[1, 2], [4, 9], [0, 0]];

    testCoords.forEach(testCoord => {
      let block = new Block(...testCoord);
      assert.equal(block.x, testCoord[0], 'x is set correctly');
      assert.equal(block.y, testCoord[1], 'y is set correctly');
      assert.ok(COLOURS.indexOf(block.colour) > -1, 'colour is valid');
    });
  });
});

describe('BlockGrid', () => {
  it('should be implemented!', () => {
      let blockGrid = new BlockGrid();
      let colNumber = blockGrid.grid.length;
      let rowNumber = blockGrid.grid[0].length;
      assert.equal(colNumber, 10, 'there should be 10 columns');
      assert.equal(rowNumber, 10, 'there should be 10 rows');
  });
  it('should remove block', () => {
      let blockGrid = new BlockGrid();
      blockGrid.removeBlock(blockGrid.grid[0][0]);
      let rowNumber = blockGrid.grid[0].length;
      assert.equal(rowNumber, 9, 'there should be 9 rows');
  });
  it('should update y value of block', () => {
      let blockGrid = new BlockGrid();
      blockGrid.updateData(0, 5);
      assert.equal(blockGrid.grid[0][5].y, 4, 'the y value should be updated from 5 to 4');
      assert.equal(blockGrid.grid[0][9].y, 8, 'the y value should be updated from 9 to 8');
      assert.equal(blockGrid.grid[0][2].y, 2, 'y values below 5 should be unchanged');
  });
});
