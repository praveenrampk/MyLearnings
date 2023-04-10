import React, { Component } from 'react';

export default class Counter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    handleClick () {
        this.setState({count: this.state.count + 1});
    }

    render () {
        if (this.state.count === 5) {
            throw new Error('Manual Error');
        }
        return (
            <div>
                Counter: {this.state.count}
                <button onClick={this.handleClick.bind(this)}>+</button>
            </div>
        )
    }
}