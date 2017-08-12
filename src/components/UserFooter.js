import React, { Component } from 'react';
import '../styles/styles.css';
import rate_me_footer from '../assets/rate_me_footer.jpg';
import styled from 'styled-components';

const FooterContainer = styled.div`
	margin-top: 26px;
	width: 100%;
	transition-property: color, text-shadow;
	transition-duration: 0.5s, 0.5s;
	transition-timing-function: initial, initial;
	transition-delay: initial, initial;
	cursor: pointer;
	display: block;
	background-color: transparent;
`;

const FooterImage = styled.img`
	display: block;
  width: 100%;
  border-style: none;
  cursor: pointer;
  white-space: nowrap;
`;

//TODO turn into stateless fuctional component;
export class UserFooter extends Component {
	render() {
		return (
			<FooterContainer>
				<FooterImage src={rate_me_footer} alt="Reputelligent" />
			</FooterContainer>
		);
	}
}

export default UserFooter;
