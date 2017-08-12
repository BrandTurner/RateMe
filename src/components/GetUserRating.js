import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';

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
		this.props.handleClick();
		/// page transition
	}
	render() {
		return (
			<RatingContainer>
				<RateMeInput
					placeholder="Your Name or @handle"
					value={this.state.username}
					onChange={e => this.setState({ username: e.target.value })}
				/>
				<Link onClick={this.getUserRating}>Get Your Rating</Link>
			</RatingContainer>
		);
	}
}

export default GetUserRating;

const RateMeInput = styled.input`
	background-color: transparent;
	border: none;
	color: #5d3571;
	border-bottom: 2px solid #5d3571;
	box-sizing: border-box;
	margin: 30px auto 0;
	width: 80%;
	font-size: 21px;
	height: 36px;
	font-weight: 300;
	text-align: center;

	&:focus {
		outline: none;
	}

	&::-webkit-input-placeholder {
		color: #5d3571;
	}

	&:focus + .underline {
		transform: scale(1);
	}
`;

const Link = styled.a`
	color: #5d3571;
	cursor: pointer;
	margin-top: 50px;
	text-shadow: transparent 0 0 10px;
	transition: color .5s, text-shadow .5s;
	-webkit-transition: color .5s, text-shadow .5s;

	@media (min-width: 491px) {
		&:hover {
			color: hsla(0, 0%, 100%, .9);
			text-shadow: rgba(0, 0, 0, .2) 0 0 10px;
		}
		&:active {
			color: #5d3571;
		}
	}

	@media (max-width: 490px) {
		transition: color .1s, text-shadow .1s;
		&:active {
			color: hsla(0, 0%, 100%, .9);
			text-shadow: rgba(0, 0, 0, .2) 0 0 10px;
		}
	}
`;

const Line = styled.div`
	background-color: transparent;
	border: none;
	border-bottom: 2px solid #5d3571;
	box-sizing: border-box;
	width: 80%;
	margin-top: 20px;
	margin-bottom: 20px;
	height: 3px;
`;

const RatingContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
