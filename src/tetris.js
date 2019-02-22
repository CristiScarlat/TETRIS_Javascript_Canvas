import {items, gameBoard} from './tetrisItems';


export class Tetris {
    constructor(){
        this.gameBoard = gameBoard;
        this.item =  {};
    }
    
    showTable = () => {
        //console.table(this.gameBoard)
        return this.gameBoard;
    }

    deleteItemFromBoard = () => {
        this.item.shape.forEach((row, index) => {
            for(let col=0; col<row.length; col++){ 
                if(row[col]){
                this.gameBoard[index + this.item.y][col + this.item.x] = 0;   
                }                                     
            }
        })
    }

    placeItemOnBoard = (position) => {
        this.item.shape.forEach((row, index) => {
            for(let col=0; col<row.length; col++){ 
                if(row[col]){
                    this.gameBoard[index + position.y][col + position.x] = row[col]; 
                }                                       
            }
        })
        this.showTable();
    }

    generateItem = () => {
        let itemsKeys = Object.keys(items);
        let item = items[itemsKeys[Math.floor(Math.random() * Math.floor(itemsKeys.length))]]
        let generatedItem = {
            shape: item,
            x: 0,
            y: 0,
            r: 0
        }
        this.item = generatedItem;      
    }

    moveItemUp = () => {
        let collisionY = this.item.y + this.item.shape.length;   
        if(collisionY === this.gameBoard.length) {
            this.generateItem();
            return;
        }  
        this.deleteItemFromBoard()
        this.item.y++;
        this.placeItemOnBoard({x: this.item.x, y: this.item.y, r: this.item.r});
    }

    moveItemRight = () => {
        this.deleteItemFromBoard()
        this.item.x++;
        this.placeItemOnBoard({x: this.item.x, y: this.item.y, r: this.item.r});
    }

    moveItemLeft = () => {
        this.deleteItemFromBoard()
        this.item.x--;
        this.placeItemOnBoard({x: this.item.x, y: this.item.y, r: this.item.r});
    }
}