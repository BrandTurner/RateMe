import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';
import styled from 'styled-components';

class Intro extends React.Component {
	componentWillEnter(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: ['0%', '-100%'] }, 1000).then(callback);
	}

	componentWillLeave(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: '400px' }, 1000).then(callback);
	}

	render() {
		return (
			<IntroScreen>
				<Link onClick={this.props.handleClick}>Rate a Friend</Link>
				<Line />
				<Link onClick={this.props.getUserRatingClick}>Get Your Rating</Link>
			</IntroScreen>
		);
	}
}

export default Intro;

const IntroScreen = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
  align-items: center;
  margin-top: 215px;
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

const Link = styled.a`
	color: #5d3571;
	cursor: pointer;
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
