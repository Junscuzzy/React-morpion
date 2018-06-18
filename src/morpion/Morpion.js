import React, {Component} from 'react';
import './Morpion.css';

function InputBot() {
    return (
        <div className="Morpion__bot">
            <form action="">
                <select name="bot" id="bot" onChange={() => alert('bot')}>
                    <option value="0" selected>Jouer avec un ami</option>
                    <option value="1">Jouer contre un bot</option>
                </select>
                <input type="submit" value="Jouer"/>
            </form>
        </div>
    );
}

function Case(props) {
    return (
        <div className="case" onClick={() => props.onClick()}>
            {props.value}
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Canvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cases: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const cases = this.state.cases.slice();
        if (calculateWinner(cases) || cases[i]) {
            return;
        }
        cases[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            cases: cases,
            xIsNext: !this.state.xIsNext
        });
    }

    renderCase(i) {
        return <Case value={this.state.cases[i]} onClick={() => this.handleClick(i)}/>;
    }

    reload() {
        this.setState({
            cases: Array(9).fill(null),
            xIsNext: true,
        });
    }

    render() {
        const winner = calculateWinner(this.state.cases);
        const reload = <img className="Morpion__reload" src={"icons/reload.svg"} alt=""/>;
        let status;

        if (winner) {
            status = "Le vainqueur est : " + winner;
        } else {
            status = "C'est à " + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div>
                <div className="Morpion__status">
                    <span>{status}</span>
                    <span onClick={() => this.reload()}>{reload}</span>
                </div>
                <div className="Morpion__canvas">
                    {this.renderCase(0)}
                    {this.renderCase(1)}
                    {this.renderCase(2)}
                    {this.renderCase(3)}
                    {this.renderCase(4)}
                    {this.renderCase(5)}
                    {this.renderCase(6)}
                    {this.renderCase(7)}
                    {this.renderCase(8)}
                </div>
                <InputBot />
            </div>

        );
    }
}

class Morpion extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Morpion">
                <h1 className="Morpion__title">Morpion</h1>
                <Canvas/>
            </div>
        );
    }
}

export default Morpion;