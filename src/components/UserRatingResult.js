import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';
import { gql, graphql } from 'react-apollo';

export class UserRatingResult extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
		};

		this.getRating = this.getRating.bind(this);
    this.getAverageRating = this.getAverageRating.bind(this);
    this.handleClick = this.handleClick.bind(this);
	}

	componentWillEnter(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(
			element,
			{
				translateY: ['0%', '-100%'],
			},
			1000
		).then(callback);
	}

	componentWillLeave(callback) {
		const element = ReactDOM.findDOMNode(this);
		Velocity(
			element,
			{
				translateY: '100%',
			},
			1000
		).then(callback);
	}

	getRating = async () => {
		const { ratee, rating, message, rater } = this.state;
		this.props.setRatingState(rater, ratee, rating, message);
		await this.props.addRating({
			variables: {
				ratee,
				rating,
				message,
			},
		});
	};

	getAverageRating() {
    let ratingTotal = 0;
    for (let i=0;i < this.props.data.allRatings.length; i++) {
      ratingTotal += this.props.data.allRatings[i].rating
    }

		return ratingTotal / this.props.data.allRatings.length;
  }

  handleClick() {
    this.props.reset();
    console.log('rarrrr')
  }

	render() {
		console.log('Props', this.props);
		if (this.props.data.loading) {
			return (
				<div>
					<div>
						Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
					</div>
				</div>
			);
		}
    const avg = this.getAverageRating()
		return (
      <div>
      <button onClick={this.handleClick}>
        Reset
      </button>
				<p>
					user {this.props.ratee}
					has a rating of
				</p>
				<h3>{avg} stars</h3>
			</div>
		);
	}
}

const RatingQuery = gql`
	query rating($ratee: String!) {
		allRatings(filter: { ratee: $ratee }) {
			ratee
			rating
			message
		}
	}
`;

const RatingPagewithData = graphql(RatingQuery, {
	options: ({ match }) => ({
		variables: {
			ratee: match,
		},
	}),
})(UserRatingResult);

export default RatingPagewithData;
