import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserFooter from './UserFooter';
import Velocity from 'velocity-animate';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';
import ReactStars from 'react-stars';

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
		for (let i = 0; i < this.props.data.allRatings.length; i++) {
			ratingTotal += this.props.data.allRatings[i].rating;
		}

		return ratingTotal / this.props.data.allRatings.length;
	}

	handleClick() {
		this.props.reset();
		console.log('rarrrr');
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
		const avg = this.getAverageRating();
		const length = this.props.data.allRatings ? this.props.data.allRatings.length : 0;
		return (
			<RatingContainer>
				<Reset onClick={this.handleClick} />
				<RatingHeader>
					<SpanBlock>Your Rating</SpanBlock>
					<RatingScore>
						<RatingScoreStrong>
							{avg.toFixed(1)}
						</RatingScoreStrong>
						<RatingScoreSpan>
							{length}
						</RatingScoreSpan>
					</RatingScore>
					<SpanBlock>
						{this.props.ratee}
					</SpanBlock>
				</RatingHeader>
				<ReactStars
					className="stars"
					value={Math.round(avg)}
					half={false}
					color1="#D195A8"
					color2="#e862e4"
					size={40}
					onChange={e => this.setState({ rating: e })}
				/>
				<UserFooter />
			</RatingContainer>
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

const RatingContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Reset = styled.div`
	transition: opacity .3s;
	cursor: pointer;
	text-shadow: transparent 0 0 10px;
	background: url(data:image/png;base64,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UmVhZHlxyWU8AAADKmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJBRUFBMDRCOTg3QzExRTZCRjEwQUE1MDAwNzk1NDlCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJBRUFBMDRDOTg3QzExRTZCRjEwQUE1MDAwNzk1NDlCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkFFQUEwNDk5ODdDMTFFNkJGMTBBQTUwMDA3OTU0OUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkFFQUEwNEE5ODdDMTFFNkJGMTBBQTUwMDA3OTU0OUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4cPZi5AAAHx0lEQVR42sxbfWhXVRg++6nhNk2Z6aws02LaNHWKIyg10xBz/whS0KZBqZDp7EP7mlKgk/yo0FJrZpA6wqz8w1lR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)
		no-repeat 0 50%;
	background-size: 100% auto;
	height: 30px;
	width: 30px;
	margin-top: 70px;
`;

const RatingHeader = styled.div`
	font-size: 26px;
	font-style: italic;
	margin-top: 20px;
	width: 100%;
`;

const SpanBlock = styled.div`display: block;`;

const RatingScore = styled.div`
	display: inline-block;
	background: url(/assets/user_icon.png) 100% 15% no-repeat;
	background-size: auto 30%;
	font-style: normal;
	line-height: 1;
	margin: 20px 0;
	position: relative;
`;

const RatingScoreStrong = styled.strong`
	font-size: 120px;
	distplay: inline-block;
	font-weight: 100;
	line-height: 1;
	vertical-align: initial;
`;

const RatingScoreSpan = styled.div`
  font-size: 55px;
  padding: 0 0 0 14px;
  display: inline-block
  font-weight: 100;
  line-height: 1;
  vertical-align: initial;
  display: inline-block;
`;
