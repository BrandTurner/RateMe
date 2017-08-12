import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RateFriend from './components/RateFriend';
import Intro from './components/Intro';
import Rating from './components/Rating';
import GetUserRating from './components/GetUserRating';
import UserRatingResult from './components/UserRatingResult';

import ReactTransitionGroup from 'react-addons-transition-group';
import { gql, graphql, ApolloProvider } from 'react-apollo';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

import styled from 'styled-components';

const client = new ApolloClient({
	networkInterface: createNetworkInterface('https://api.graph.cool/simple/v1/cj64w3l7dz5qy01536qrubup0'),
});

const Container = styled.div`
		-ms-flex-align: center;
		-webkit-align-items: center;
		-webkit-box-align: center;
		align-items: center;

		background: linear-gradient(135deg, #f4e9e9, #ebc8bf);
		display: flex;
		align-items: center;
		justify-content: center;
`;

class App extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			start: true,
			rateFriend: false,
			ratingSubmitted: false,

			rater: '',
			ratee: '',
			rating: '',
			message: '',

			getUserRating: false,
			username: '',
			submitUsername: false,
		};

		this.rateFriendClick = this.rateFriendClick.bind(this);
		this.submitRatingClick = this.submitRatingClick.bind(this);
		this.setRatingState = this.setRatingState.bind(this);
		this.getUserRatingClick = this.getUserRatingClick.bind(this);
		this.submitUsernameClick = this.submitUsernameClick.bind(this);
		this.setUsername = this.setUsername.bind(this);
		this.resetRateMe = this.resetRateMe.bind(this);
		//	this.setUserForRating = this.setUserForRating.bind(this);
	}

	resetRateMe() {
		this.setState({
			start: true,
			rateFriend: false,
			ratingSubmitted: false,

			rater: '',
			ratee: '',
			rating: '',
			message: '',

			getUserRating: false,
			username: '',
			submitUsername: false,
		});
	}

	rateFriendClick() {
		this.setState({
			start: false,
			rateFriend: true,
		});
	}

	setUsername(username) {
		this.setState({
			username: username,
		});
	}

	getUserRatingClick() {
		this.setState({
			start: false,
			getUserRating: true,
		});
	}

	submitUsernameClick() {
		this.setState({
			getUserRating: false,
			submitUsername: true,
		});
	}

	submitRatingClick() {
		this.setState({
			rateFriend: false,
			ratingSubmitted: true,
		});
	}

	setRatingState(rater, ratee, rating, message) {
		this.setState({
			rater: rater,
			ratee: ratee,
			rating: rating,
			message: message,
		});
	}

	render() {
		return (
			<ApolloProvider client={client}>
				<div className="container">
					<div className="phone-container">
						<div className="phone-screen">
							<ReactTransitionGroup className="crap">
								{this.state.start &&
									<Intro
										handleClick={this.rateFriendClick}
										getUserRatingClick={this.getUserRatingClick}
									/>}
								{this.state.rateFriend &&
									<RateFriend
										handleClick={this.submitRatingClick}
										setRatingState={this.setRatingState}
									/>}
								{this.state.ratingSubmitted &&
									<Rating
										rater={this.state.rater}
										ratee={this.state.ratee}
										rating={this.state.rating}
										message={this.state.message}
										reset={this.resetRateMe}
									/>}
								{this.state.getUserRating &&
									<GetUserRating
										setUsername={this.setUsername}
										handleClick={this.submitUsernameClick}
									/>}
								{this.state.submitUsername &&
									<UserRatingResult
										reset={this.resetRateMe}
										ratee={this.state.username}
										match={this.state.username}
									/>}
							</ReactTransitionGroup>
						</div>
					</div>
					<div className="phone-bevel" />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
