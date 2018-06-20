import React, {Component} from 'react';
import './canvas.css';

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

function Case(props) {
    return <div className="case" onClick={() => props.onClick()}>{props.value}</div>;
}

function calculateWinner(squares) {
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

        if (calculateWinner(cases) || cases[i])
            return;

        cases[i] = this.state.xIsNext ? 'X' : '0';

        if (this.state.mode === 'friend') {
            this.setState({cases: cases, xIsNext: !this.state.xIsNext});
            return
        } else
            this.setState({cases: cases});

        // Tour du bot
        if (this.state.mode === 'bot' && calculateWinner(cases) === null) {
            cases[this.botPlay(cases)] = 'O';
            this.setState({cases: cases});
        }
    }

    botPlay(cases) {
        let emptyCases = [];
        let i = 0;

        // To win, if 2/3, complete the line
        // Look only 'O' position
        let response = null;

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (cases[a] === null || cases[b] === null || cases[c] === null) {
                if ((cases[a] === 'O' && cases[b] === 'O') || (cases[a] === 'X' && cases[b] === 'X'))
                    response = c;
                if ((cases[a] === 'O' && cases[c] === 'O') || (cases[a] === 'X' && cases[c] === 'X'))
                    response = b;
                if ((cases[b] === 'O' && cases[c] === 'O') || (cases[b] === 'X' && cases[c] === 'X'))
                    response = a;
            }
        }
        if (response !== null && cases[response] === null)
            return response;

        // get empty cases
        cases.map((Case) => {
            if (Case === null)
                emptyCases.push(i);
            i++
        });

        // Bot choices
        // 1. Prefer the center
        if (cases[4] === null)
            return 4;

        // 2. prefer the corner
        let corner = [0, 2, 6, 8];
        let cornerCases = [];
        corner.map((c) => {
            if (cases[c] === null)
                cornerCases.push(c)
        });
        if (cornerCases.length > 0)
            emptyCases = cornerCases;

        // Return Random choice using empty case
        return emptyCases[Math.floor(Math.random() * emptyCases.length)];
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

    back = () => {
        this.props.onBack('home');
        this.setState({mode: "home"})
    };

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
            </div>

        );
    }
}

export default Canvas;