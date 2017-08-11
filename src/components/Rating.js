import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactStars from 'react-stars';
import Footer from './Footer';
import Velocity from 'velocity-animate';
import { gql, graphql } from 'react-apollo';

export class Rating extends Component {
	// TODO Fade out
	componentWillEnter(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: ['0%', '-100%'] }, 1000).then(callback);
	}

	componentWillLeave(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: '100%' }, 1000).then(callback);
	}

	setContainer(c) {
		this.container = c;
	}
	render() {
    const {handleRestart, rater, ratee, rating, message } = this.props;

		return (
			<div ref={this.setContainer.bind(this)}>
				<button>Restart</button>
				<h3>
					{rater} rated
				</h3>
				<img src="http://lorempixel.com/100/100" />
				<h3>
					{ratee} {rating} stars
				</h3>
				<ReactStars value={rating} disabled />
				<h2>
					"{message}"
				</h2>
				<span>Share icons</span>
				<Footer />
			</div>
		);
	}
}

export default Rating;
