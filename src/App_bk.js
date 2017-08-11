import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RateFriend from './components/RateFriend';
import Intro from './components/Intro';
import ReactTransitionGroup from 'react-addons-transition-group';
import { Layout, Menu, Breadcrumb } from 'antd';

import { gql, graphql, ApolloProvider } from 'react-apollo';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
	networkInterface: createNetworkInterface('https://api.graph.cool/simple/v1/cj64w3l7dz5qy01536qrubup0'),
});

const { Header, Content } = Layout;

const RateMeUsersListQuery = gql`
	query RateMeUsersListQuery {
		allRateMeUsers {
			username
		}
	}
`;

const RateMeUsersList = ({ data: { loading, error, allRateMeUsers } }) => {
	if (loading) {
		return <p>...Loading</p>;
	}

	if (error) {
		return (
			<p>
				{error.message}
			</p>
		);
	}

	return (
		<ul>
			{allRateMeUsers.map(ch =>
				<li key={ch.id}>
					{ch.username}
				</li>
			)}
		</ul>
	);
};

const RateMeUsersListWithData = graphql(RateMeUsersListQuery)(RateMeUsersList);

class App extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			start: true,
			rateFriend: false,
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		console.log('Klick!!!');
		this.setState({
			start: false,
			rateFriend: true,
		});
	}
	render() {
		return (
			<ApolloProvider client={client}>
				<div className="container">
					<div className="phone">
						<div className="phone-span">
							<ReactTransitionGroup>
								{this.state.start && <Intro handleClick={this.handleClick} />}
								{this.state.rateFriend && <RateFriend />}
							</ReactTransitionGroup>
						</div>
						<RateMeUsersListWithData />
					</div>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
