import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWithThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { currenciesFetch } = this.props;
    currenciesFetch();
  }

  render() {
    const { currencies } = this.props;
    console.log('1', currencies);
    return (
      <div>
        <form>
          <label htmlFor="valor">
            Valor:
            <input
              data-testid="value-input"
              type="text"
            />
          </label>
          <label htmlFor="descrição">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select data-testid="currency-input">
              {currencies.map((item, index) => (
                (<option key={ index }>{item}</option>)
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento:
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="pagamento">
            Categoria:
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currenciesFetch: PropTypes.func.isRequired,
  currencies: PropTypes.shape.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currenciesFetch: () => dispatch(fetchWithThunk()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
