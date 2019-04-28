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
        let item = itemsKeys[Math.floor(Math.random() * Math.floor(itemsKeys.length))]
        let shapes = items[item]
        let generatedItem = {
            shapes,
            shape: shapes['0'],
            x: 0,
            y: 0,
            r: 0
        }
        this.item = generatedItem;
    }

    isTouchingGround = (position, shape) => { 
        let collition = false      
        function findBottomOfShape(raw) {
            let bottomElem = false;
            raw.map(elem => {
                return bottomElem |= elem;
            })
            return bottomElem;
        }
        shape.map((raw, index) => {
            if(findBottomOfShape(raw)){
                collition = position.y + index - 1 >= this.gameBoard.length-1;
            }
        })
        return collition;
    }

    checkCollision = (position, shape) => {
        if(this.isTouchingGround(position, shape))return true;
        let collision = false;
        this.deleteItemFromBoard();
        shape.forEach((row, index) => {
            for (let col = 0; col < row.length; col++) {
                if (row[col] > 0) {
                    collision |= (this.gameBoard[index + position.y][col + position.x] > 0) || col + position.x < 0 || col + position.x > this.gameBoard[0].length-1;
                }
            }
        })         
        return collision;
    }

    moveItemDown = () => {        
        if (this.checkCollision({ x: this.item.x, y: this.item.y + 1, r: this.item.r }, this.item.shape)) {
            this.placeItemOnBoard({ x: this.item.x, y: this.item.y, r: this.item.r });
            this.generateItem();
        }
        this.placeItemOnBoard({ x: this.item.x, y: this.item.y + 1, r: this.item.r });
    }

    moveItemRight = () => {
        if (this.checkCollision({ x: this.item.x + 1, y: this.item.y, r: this.item.r }, this.item.shape)) {
            this.placeItemOnBoard({ x: this.item.x, y: this.item.y, r: this.item.r });
            return
        }
        this.placeItemOnBoard({ x: this.item.x + 1, y: this.item.y, r: this.item.r });
    }

    moveItemLeft = () => {
        if (this.checkCollision({ x: this.item.x - 1, y: this.item.y, r: this.item.r }, this.item.shape)) {
            this.placeItemOnBoard({ x: this.item.x, y: this.item.y, r: this.item.r });
            return
        }
        this.placeItemOnBoard({ x: this.item.x - 1, y: this.item.y, r: this.item.r });
    }

    rotateItem = () => {
        let angle = this.item.r;
        angle += 90;
        if(angle>270)angle=0;
        this.deleteItemFromBoard();
        let newShape = this.item.shapes[angle];
        if (!this.checkCollision({ x: this.item.x, y: this.item.y + 1, r: this.item.r }, newShape)) {
            this.item.r = angle;
            this.item.shape = newShape;
        }
        this.placeItemOnBoard({ x: this.item.x, y: this.item.y, r: this.item.r});
    }
}