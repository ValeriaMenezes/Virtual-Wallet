import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionClick, fetchWithThunk, actionThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    valor: 0,
    descrição: '',
    moeda: 'USD',
    pagamento: 'Dinheiro',
    categoria: 'Alimentação',
  };

  componentDidMount() {
    const { currenciesFetch } = this.props;
    currenciesFetch();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    const { valor, descrição, moeda, pagamento, categoria } = this.state;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { id, valor, descrição, moeda, pagamento, categoria } = this.state;
    const { exchangeRates } = this.props;
    // expenses({ id, valor, descrição, moeda, pagamento, categoria });
    exchangeRates({ id, valor, descrição, moeda, pagamento, categoria });
  };

  render() {
    const { currencies } = this.props;
    // console.log('2', currencies);
    return (
      <div>
        <form onChange={ this.handleChange }>
          <label htmlFor="valor">
            Valor:
            <input
              data-testid="value-input"
              type="text"
              name="valor"
            />
          </label>
          <label htmlFor="descrição">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="descrição"
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              data-testid="currency-input"
              name="moeda"
            >
              {currencies.map((item, index) => (
                (<option key={ index }>{item}</option>)
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento:
            <select data-testid="method-input" name="pagamento">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="pagamento">
            Categoria:
            <select data-testid="tag-input" name="categoria">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar Despesa
          </button>
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
  // expenses: (expenses) => dispatch(actionClick(expenses)),
  exchangeRates: (payload) => dispatch(actionThunk(payload)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
