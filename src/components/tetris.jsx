import React from 'react';
import './tetris.css';

import { items } from './tetrisItems';


export default class Tetris extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gameBoard: [
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
            ]
        }
        this.canvas = null;
    }

    componentDidMount(){
        this.canvas = this.refs.canvas;
        this.drawMatrix();
        this.placeItemOnCanvas(items.L);
    }

    componentWillUpdate() {
        this.drawMatrix();
    }

    drawMatrix = () => {
        let ctx = this.canvas.getContext('2d');
        for(let raw=0; raw<this.canvas.height/25; raw++){
            this.drawRect(ctx, raw);
        }       
    }

    drawRect = (context, raw) => {
        for(let col=0; col<this.canvas.width/25; col++){
            switch(this.state.gameBoard[raw][col]){
                case 0:
                context.fillStyle = "white";
                break;
                case 1:
                context.fillStyle = "#616365";
                break;
                default:
                context.fillStyle = "black";
            }
            context.fillRect(col*25, raw*25, 25, 25);    
        }
    }
    //TODO placeItemOnCanvas can receive as parameters , position coordinates also than the update of the screen is done by setState
    placeItemOnCanvas = (item) => {
        let newBoard = this.state.gameBoard;
        for(let raw=0; raw<3; raw++){
            for(let col=0; col<3; col++){
                newBoard[raw][col+4] = item[raw][col]
            }
        }
        this.setState({ gameBoard: newBoard})
    }

    render(){
        return(
            <div>
                <canvas ref="canvas" width={300} height={400} className="canvas"/>
            </div>
        )
    }
}
