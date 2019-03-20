import React from 'react';
import './tetris.css';
import { Tetris } from '../tetris';


export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.canvas = null;
        this.tetris = new Tetris();
        this.start = 0;
    }

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeypress);
        document.addEventListener('keydown', this.handleKeypress);
        this.canvas = this.refs.canvas;
        this.tetris.generateItem();  
        this.startLoop();
    }
    componentWillUnmount(){
        document.removeEventListener('keypress', this.handleKeypress);
        document.removeEventListener('keydown', this.handleKeypress);
    }

    startLoop = () => {
        requestAnimationFrame(this.update);
        this.update();
    }

    update = () => {
        let ctx = this.canvas.getContext('2d');
        this.tetris.gameBoard.forEach((row, index) => {
            this.drawRect(ctx, row, index);
        }) 
        this.step(120);
        requestAnimationFrame(this.update);     
    }

    step = (timestamp) => {
        this.start++;
        let progress = timestamp - this.start;
        if (progress  === 0) {
            this.start = 0;
            this.tetris.moveItemDown();
        }
      }

    drawRect = (context, row, index) => {
        for(let col=0; col<row.length; col++){
            switch(row[col]){
                case 0:
                context.fillStyle = "white";
                break;
                case 1:
                context.fillStyle = "#622362";
                break;
                case 2:
                context.fillStyle = "#616333";
                break;
                case 3:
                context.fillStyle = "#622333";
                break;
                case 4:
                context.fillStyle = "#611333";
                break;
                case 5:
                context.fillStyle = "#622344";
                break;
                case 6:
                context.fillStyle = "#422333";
                break;
                case 7:
                context.fillStyle = "#522333";
                break;
                default:
                context.fillStyle = "black";
            }           
        context.fillRect(col*25, index*25, 25, 25);
        }
    }

    handleKeypress = (e) => {
        switch(e.key){
            case "ArrowDown":
                this.tetris.moveItemDown();
                break;
            case "ArrowRight":
                this.tetris.moveItemRight();
                break;
            case "ArrowLeft":
                this.tetris.moveItemLeft();
                break;
            default:
                break;
        }
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
