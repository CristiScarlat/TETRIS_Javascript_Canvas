import React from 'react';
import './tetris.css';

import { items } from './tetrisItems';


export default class Tetris extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.gameBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.item =  {};
        this.canvas = null;
        this.timer = null;
    }

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeypress);
        document.addEventListener('keydown', this.handleKeypress);
        this.canvas = this.refs.canvas;
        this.drawBoard();
        this.generateItem();
        this.timer = setInterval(() => {
            this.moveItemOnCanvas(this.item, "ArrowDown");
            this.drawBoard();
        }, 500);        
    }


    handleKeypress = (e) => {
        console.log(e.key)
        switch(e.key){
            case "ArrowUp":
            console.log("up");
            
            break;
            case "ArrowDown":
            console.log("down");
            this.moveItemOnCanvas(this.item, e.key)
            break;
            case "ArrowLeft":
            console.log("<-");
            break;
            case "ArrowRight":
            console.log("->");
            break;
            default:
            break;
        }
    }

    clearBoard = () => {
        let board = this.gameBoard;
        board.forEach(row => {
            for(let col=0;col<this.canvas.width/25;col++){
                row[col] = 0;
            }
        })
        return board;
    }

    drawBoard = () => {
        let ctx = this.canvas.getContext('2d');
        for(let row=0; row<this.canvas.height/25; row++){
            this.drawRect(ctx, row);
        }       
    }

    drawRect = (context, row) => {
        for(let col=0; col<this.canvas.width/25; col++){
            switch(this.gameBoard[row][col]){
                case 0:
                context.fillStyle = "white";
                break;
                case 1:
                context.fillStyle = "#616365";
                break;
                default:
                context.fillStyle = "black";
            }
            context.fillRect(col*25, row*25, 25, 25);    
        }
    }
    //TODO placeItemOnCanvas can receive as parameters , position coordinates also than the update of the screen is done by setState
    generateItem = () => {
        let itemsKeys = Object.keys(items);
        let item = items[itemsKeys[Math.floor(Math.random() * Math.floor(itemsKeys.length))]]
        let newBoard = this.gameBoard;
        for(let row=0; row<4; row++){
            for(let col=0; col<3; col++){
                newBoard[row][col+4] = item[row][col]
            }
        }
        let generatedItem = {
            shape: item,
            x: 4,
            y: 0,
            r: 0
        }
        this.gameBoard = newBoard;
        this.item = generatedItem;      
    }

    moveItemOnCanvas = (item, direction) => {
        if(direction === "ArrowDown" && item.y >= (this.canvas.height/25)-4){
            this.generateItem();
            return;
        }
        let newBoard = this.gameBoard;
        let newItem = item;
        if(direction === "ArrowDown"){
            newItem.y++;
            for(let row=0; row<4; row++){
                for(let col=0; col<3; col++){
                    newBoard[newItem.y - 1][col + item.x] = 0;
                    newBoard[row + newItem.y][col + newItem.x] = item.shape[row][col]
                }
            }          
        }
        this.gameBoard = newBoard;
        this.item = newItem;
    }


    render(){
        console.log("render")
        return(
            <div>
                <canvas ref="canvas" width={300} height={400} className="canvas"/>
            </div>
        )
    }
}
