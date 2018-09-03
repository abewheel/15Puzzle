const adjacencies = {
    0: [1, 4],
    1: [0, 2, 5],
    2: [1, 3, 6],
    3: [2, 7],
    4: [0, 5, 8],
    5: [1, 4, 6, 9],
    6: [2, 5, 7, 10],
    7: [3, 6, 11],
    8: [4, 9, 12],
    9: [5, 8, 10, 13],
    10: [6, 9, 11, 14],
    11: [7, 10, 15],
    12: [8, 13],
    13: [12, 9, 14],
    14: [10, 13, 15],
    15: [11, 14],
};

const Tile = (props) => {  
    return(
        <div className="col-3 tile"
        onClick={() => props.handleClick(props.number)}>
        {props.number}
        </div>
    );
};

const Board = (props) => {  
    return(
        <div className="row board">
        {props.tiles.map((tile) =>
            <Tile number={tile}
            handleClick={props.handleTileClick} />
        )}
        </div>
    );
}

const Shuffle = (props) => {    
    return(
        <button className={"btn btn-default mt-3"}
        onClick={() => props.handleShuffle()}>
            Shuffle
        </button>
    );
}

class Game extends React.Component {
    state = {  
        tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '],
    };
    
    handleTileClick = (num) => {
        let clickIndex = this.state.tiles.indexOf(num);
        let emptyIndex = this.state.tiles.indexOf(' ');
        if(adjacencies[clickIndex].includes(emptyIndex)) {
            let newTiles = this.state.tiles;
            newTiles[emptyIndex] = num;
            newTiles[clickIndex] = ' ';
            this.setState((prevState) => ({
                tiles: newTiles
            }));
        }
    };
    
    handleShuffle = () => {
        this.setState((prevState, props) => {
            let newOrder = [];
            for(var i = prevState.tiles.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = prevState.tiles[i];
                prevState.tiles[i] = prevState.tiles[j];
                prevState.tiles[j] = temp;
            }
            return {
                tiles: prevState.tiles
            }
        });
    };
    
    render() {
        return(
            <div className={"text-center"}>
            <Board handleTileClick={this.handleTileClick}
            tiles={this.state.tiles}/>
            <Shuffle handleShuffle={this.handleShuffle}/>
            </div>
        );
    }
}

ReactDOM.render(<Game/>, mountNode);