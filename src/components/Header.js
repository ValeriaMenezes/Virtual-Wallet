import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  calculation = () => {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach((item) => {
      const currency = item.value;
      const curr = item.currency;
      const { ask } = item.exchangeRates[curr];
      sum += Number(currency) * Number(ask);
    });
    return Number(sum).toFixed(2);
  };

  render() {
    const { emailUser, expenses } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">
          {emailUser}
        </h3>
        <h3 data-testid="total-field">
          {
            expenses.length === 0 ? Number(0).toFixed(2) : this.calculation()
          }

        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

Header.propTypes = {
  emailUser: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
