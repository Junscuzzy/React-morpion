import React, {Component} from 'react';
import './canvas.css';

function Case(props) {
    return <div className="case" onClick={() => props.onClick()}>{props.value}</div>;
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
            mode: this.props.mode
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
        return <Case key={i} value={this.state.cases[i]} onClick={() => this.handleClick(i)}/>;
    }

    reload() {
        this.setState({
            cases: Array(9).fill(null),
            xIsNext: true,
        });
    }

    back = (e) => {
        console.log(e);
        this.props.onBack('home');
        this.setState({mode: "home"});
    }

    render() {
        const winner = calculateWinner(this.state.cases);
        const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const reload = <img className="Morpion__reload" src={"icons/reload.svg"} alt=""/>;
        const back = <img className="Morpion__back" src={"icons/back.svg"} alt=""/>;
        let status;

        if (winner) {
            status = "Le vainqueur est : " + winner;
        } else {
            status = "C'est à " + (this.state.xIsNext ? 'X' : 'O');
        }

        console.log(this.state);

        return (
            <div>
                <div className="Morpion__status">
                    <span onClick={this.back}>{back}</span>
                    <span>{status}</span>
                    <span onClick={() => this.reload()}>{reload}</span>
                </div>
                <div className="Morpion__canvas">
                    {cases.map(i => this.renderCase(i))}
                </div>
                <p>Mode de jeu: {this.state.mode}</p>
            </div>

        );
    }
}

export default Canvas;