import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';
import './Intro.css'
import styled from 'styled-components';



class Intro extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillEnter(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: ['0%', '-100%'] }, 1000).then(callback);
	}

	componentWillLeave(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: '800px' }, 1000).then(callback);
	}

	render() {
		return (
			<div className='intro-screen'>
				<a className="links" onClick={this.props.handleClick}>Rate a Friend</a>
				<div className='line'></div>
				<a className="links" onClick={this.props.getUserRatingClick}>Get Your Rating</a>
			</div>
		);
	}
}

export default Intro;
