import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';

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
			<div>
				<a onClick={this.props.handleClick}>Rate a Friend</a>
				<hr />
				<a onClick={this.props.getUserRatingClick}>Get Your Rating</a>
			</div>
		);
	}
}

export default Intro;
