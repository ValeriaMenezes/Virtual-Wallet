import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { emailUser } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">
          {emailUser}
        </h3>
        <h3 data-testid="total-field">0</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

Header.propTypes = {
  emailUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
});

export default connect(mapStateToProps)(Header);
