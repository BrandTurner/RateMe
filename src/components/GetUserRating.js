import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';
import { gql, graphql } from 'react-apollo';

export class GetUserRating extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
		};

		this.getUserRating = this.getUserRating.bind(this);
	}

	// TODO Fade out
	componentWillEnter(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: ['0%', '-300%'] }, 1000).then(callback);
	}

	componentWillLeave(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: '100%' }, 1000).then(callback);
	}

	getUserRating() {
		//const { ratee, rating, message, rater } = this.state;
		//this.props.setRatingState(rater, ratee, rating, message);
    //await this.props.addRating({ variables: { ratee, rating, message } });
    this.props.setUsername(this.state.username);
    this.props.handleClick()
		/// page transition
	};
	render() {
		return (
			<div>
				<input
					placeholder="Your Name or @handle"
					value={this.state.username}
					onChange={e => this.setState({ username: e.target.value })}
				/>
        <hr />
        <div onClick={this.getUserRating}>
          <h3>Get Your Rating</h3>
        </div>
			</div>
		);
	}
}

export default GetUserRating;
