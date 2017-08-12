import React from 'react';
import ReactDOM from 'react-dom';
import ReactStars from 'react-stars';
import Velocity from 'velocity-animate';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';
import './RateFriend.css';

class RateFriend extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ratee: '',
			rating: 0,
			message: '',
			rater: '',
		};
		this.submitRating = this.submitRating.bind(this);
	}

	// TODO Fade out
	componentWillEnter(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: ['0%', '-500%'] }, 1000).then(callback);
	}

	componentWillLeave(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: '100%' }, 1000).then(callback);
	}

	submitRating = async () => {
		const { ratee, rating, message, rater } = this.state;
		this.props.setRatingState(rater, ratee, rating, message);
		await this.props.addRating({ variables: { ratee, rating, message } });
		this.props.handleClick();
		/// TODO => Loading state
	};

	render() {
		return (
			<Rating>
				<RateMeInput
					placeholder="Your name or @handle"
					value={this.state.rater}
					onChange={e => this.setState({ rater: e.target.value })}
				/>
				<RateMeInput
					placeholder="Friend's name or @handle"
					value={this.state.ratee}
					onChange={e => this.setState({ ratee: e.target.value })}
				/>
				<ReactStars
					className="stars"
					value={this.state.rating}
					half={false}
					color1="#D195A8"
					color2="#e862e4"
					size={40}
					onChange={e => this.setState({ rating: e })}
				/>

				<RateMeInputBttm
					placeholder="Message (optional)"
					value={this.state.message}
					onChange={e => this.setState({ message: e.target.value })}
				/>
				<Link onClick={this.submitRating}>Rate Now</Link>
			</Rating>
		);
	}
}

const addMutation = gql`
	mutation addRating($ratee: String!, $rating: Float!, $message: String!) {
		createRating(ratee: $ratee, rating: $rating, message: $message) {
			id
			ratee
			rating
			message
		}
	}
`;

const PageWithMutation = graphql(addMutation, { name: 'addRating' })(RateFriend);

export default PageWithMutation;

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

const RateMeInputBttm = styled.input`
	background-color: transparent;
	border: none;
	border-bottom: 2px solid #5d3571;
	color: #5d3571;
	box-sizing: border-box;
	margin: 0;
	width: 80%;
	font-size: 21px;
	height: 36px;
	font-weight: 300;
	font-style: italic;
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

const Rating = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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

