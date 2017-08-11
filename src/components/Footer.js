import React, { Component } from 'react';
import '../styles/styles.css';
import rate_me_footer from '../assets/rate_me_footer.jpg';

//TODO turn into stateless fuctional component;
export class Footer extends Component {
  render() {
    return (
      <a className="tip" href="brandturner.com" target="_blank">
        <img src={rate_me_footer} alt="Reputelligent" />
      </a>
    );
  }
}

export default Footer;
