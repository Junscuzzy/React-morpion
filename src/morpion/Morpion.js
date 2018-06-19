import React, {Component} from 'react';
import Canvas from './canvas';
import Home from './home';
import './Morpion.css';

class Morpion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldVal: "home",
            cases: Array(9).fill(null),
            xIsNext: true,
        };
    }

    onUpdate = (val) => {
        this.setState({
            fieldVal: val
        });
    };

    onBack = (val) => {
        this.setState({
            fieldVal: val
        });
    };


    render() {
        let screen;
        if (this.state.fieldVal === "friend") {
            screen = <Canvas onBack={this.onBack} mode="friend"/>
        } else if (this.state.fieldVal === "bot") {
            screen = <Canvas onBack={this.onBack} mode="bot"/>
        } else {
            screen = <Home onUpdate={this.onUpdate}/>
        }

            return (
            <div className="Morpion">
                <h1 className="Morpion__title">Morpion</h1>
                <div className="Morpion__box">
                    {screen}
                </div>
            </div>
        );
    }
}

export default Morpion;