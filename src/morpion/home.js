import React, {Component} from 'react';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {fieldVal: ""};
    }

    update = (e) => {
        console.log(e.target.value);
        this.props.onUpdate(e.target.value);
        this.setState({fieldVal: e.target.value});
    };

    render() {
        return (
            <div className="Morpion__home">
                <p>Bienvenue dans le Jeu du Morpion! Pour jouer, commencez par choisir si vous voulez jouer avec un ami
                    ou contre un bot:</p>
                <select
                    name="fiendOrBot"
                    value={this.state.fieldVal}
                    onChange={this.update}
                >
                    <option value="home">Choisir</option>
                    <option value="friend">Jouer avec un ami</option>
                    <option value="bot">Jouer contre un bot</option>
                </select>
            </div>
        )
    }
}

export default Home;