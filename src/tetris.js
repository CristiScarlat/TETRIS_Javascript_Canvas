import { items, gameBoard } from './tetrisItems';


export class Tetris {
    constructor() {
        this.gameBoard = gameBoard;
        this.item = {};
    }

    deleteItemFromBoard = () => {
        this.item.shape.forEach((row, index) => {
            for (let col = 0; col < row.length; col++) {
                if (row[col]) {
                    this.gameBoard[index + this.item.y][col + this.item.x] = 0;
                }
            }
        })
    }

    placeItemOnBoard = (position) => {
        let itemPosition = position;
        this.item.shape.forEach((row, index) => {
            for (let col = 0; col < row.length; col++) {
                if (row[col]) {
                    this.gameBoard[index + itemPosition.y][col + itemPosition.x] = row[col];
                }
            }
        })

        this.item.x = itemPosition.x;
        this.item.y = itemPosition.y;
    }

    generateItem = () => {
        let itemsKeys = Object.keys(items);
        let item = items[itemsKeys[Math.floor(Math.random() * Math.floor(itemsKeys.length))]]
        let generatedItem = {
            shape: item,
            x: this.gameBoard[0].length/2 - 1,
            y: -1,
            r: 0
        }
        this.item = generatedItem;
    }

    checkCollision = (position) => {
        if ((position.y + this.item.shape.length - 1) >= this.gameBoard.length) return true;
        let collision = false;
        this.deleteItemFromBoard();
        this.item.shape.forEach((row, index) => {
            for (let col = 0; col < row.length; col++) {
                if (row[col] > 0) {
                    collision |= (this.gameBoard[index + position.y][col + position.x] > 0) || col + position.x < 0 || col + position.x > this.gameBoard[0].length-1;
                }
            }
        })         
        return collision;
    }

    moveItemDown = () => {        
        if (this.checkCollision({ x: this.item.x, y: this.item.y + 1, r: this.item.r })) {
            this.placeItemOnBoard({ x: this.item.x, y: this.item.y, r: this.item.r });
            this.generateItem();
        }
        this.placeItemOnBoard({ x: this.item.x, y: this.item.y + 1, r: this.item.r });
    }

    moveItemRight = () => {
        if (this.checkCollision({ x: this.item.x + 1, y: this.item.y, r: this.item.r })) {
            this.placeItemOnBoard({ x: this.item.x, y: this.item.y, r: this.item.r });
            return
        }
        this.placeItemOnBoard({ x: this.item.x + 1, y: this.item.y, r: this.item.r });
    }

    moveItemLeft = () => {
        if (this.checkCollision({ x: this.item.x - 1, y: this.item.y, r: this.item.r })) {
            this.placeItemOnBoard({ x: this.item.x, y: this.item.y, r: this.item.r });
            return
        }
        this.placeItemOnBoard({ x: this.item.x - 1, y: this.item.y, r: this.item.r });
    }
}