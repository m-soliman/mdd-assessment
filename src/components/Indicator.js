import React from "react";
import Level from "./Level";

class Indicator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLevel: props.selectedLevel
        };
        this.selectLevel = this.selectLevel.bind(this);

    }

    selectLevel(event) {
        this.setState({
            selectedLevel: event.target.value
        });
        this.props.select(event.target.value);
    }

    render() {
        return (
                <ul>
                    <h3>{this.props.description}</h3>
                    {this.props.levels.map((level, i) =>
                        <Level
                            description={level.description}
                            indicatorId={this.props.id}
                            grade={level.grade}
                            checked={level.grade === this.state.selectedLevel}
                            key={i}
                            onLevelSelect={this.selectLevel}
                        />
                    )}
                </ul>
        )
    };

}

export default Indicator;