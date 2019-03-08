import {items, gameBoard} from './tetrisItems';


export class Tetris {
    constructor(){
        this.gameBoard = gameBoard;
        this.item =  {};
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
        let item = position;
        this.deleteItemFromBoard();
        if(this.checkCollision(position)){
            item = this.item;
            
            this.item.shape.forEach((row, index) => {
                for(let col=0; col<row.length; col++){ 
                    if(row[col]){
                        this.gameBoard[index + item.y][col + item.x] = row[col]; 
                    }                                      
                }
            })
            this.generateItem();
            return;
        }  
        this.item.shape.forEach((row, index) => {
            for(let col=0; col<row.length; col++){ 
                if(row[col]){
                    this.gameBoard[index + item.y][col + item.x] = row[col]; 
                }                                      
            }
        })
        this.item.x = item.x;
        this.item.y = item.y;
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

    checkCollision = (position) => {
        if((position.y + this.item.shape.length - 1) >= this.gameBoard.length)return true; 
        let collision = false;
        this.item.shape.forEach((row, index) => {
            for(let col=0; col<row.length; col++){ 
                if(row[col] > 0){
                    collision |= this.gameBoard[index + position.y][col + position.x] > 0;  
                }                                                 
            }
        })
        return collision;
    }

    moveItemDown = () => {                
        this.placeItemOnBoard({x: this.item.x, y: this.item.y + 1, r: this.item.r});
    }

    moveItemRight = () => {
        this.placeItemOnBoard({x: this.item.x + 1, y: this.item.y, r: this.item.r});
    }

    moveItemLeft = () => {
        this.placeItemOnBoard({x: this.item.x - 1, y: this.item.y, r: this.item.r});
    }
}