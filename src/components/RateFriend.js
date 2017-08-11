import React from 'react';
import ReactDOM from 'react-dom';
import ReactStars from 'react-stars';
import Velocity from 'velocity-animate';
import { gql, graphql } from 'react-apollo';
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
		Velocity(element, { translateY: ['0%', '-100%'] }, 1000).then(callback);
	}

	componentWillLeave(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(element, { translateY: '100%' }, 1000).then(callback);
	}

	submitRating = async () => {
		const { ratee, rating, message, rater } = this.state;
		this.props.setRatingState(rater, ratee, rating, message);
		await this.props.addRating({ variables: { ratee, rating, message } });

		/// page transition
	};

	render() {
		return (
			<div>
				<input
					className="input"
					placeholder="Your name or @handle"
					value={this.state.rater}
					onChange={e => this.setState({ rater: e.target.value })}
				/>

				<input
					className="input"
					placeholder="Friend's name or @handle"
					value={this.state.ratee}
					onChange={e => this.setState({ ratee: e.target.value })}
				/>

				<ReactStars
					value={this.state.rating}
					half={false}
					color2="#e862e4"
					size="40px"
					onChange={e => this.setState({ rating: e })}
				/>
        <input
          className="input"
					placeholder="Message (optional)"
					value={this.state.message}
					onChange={e => this.setState({ message: e.target.value })}
				/>

				<div onClick={this.submitRating}>
					<h2>Rate Now</h2>
				</div>
				<div onClick={this.props.handleClick}>RAR</div>
			</div>
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
