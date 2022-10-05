import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWithThunk, actionThunk, actionIdEdit } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    valor: '',
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
    // const { valor, description, currency, method, tag } = this.state;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { id, valor, descrição, moeda, pagamento, categoria } = this.state;
    const { exchangeRates } = this.props;
    exchangeRates({
      id,
      value: valor,
      description: descrição,
      currency: moeda,
      method: pagamento,
      tag: categoria,
    });
    this.setState((prevState) => ({
      id: prevState.id + 1,
      valor: '',
      descrição: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      categoria: 'Alimentação',
    }));
  };

  handleClickId = () => {
    const { expenses, idToEdit, expensesEdit } = this.props;
    const { valor, descrição, moeda, pagamento, categoria } = this.state;
    const findIndex = expenses.findIndex((element) => element.id === idToEdit);
    expenses[findIndex] = {
      id: idToEdit,
      value: valor,
      description: descrição,
      currency: moeda,
      method: pagamento,
      tag: categoria,
      exchangeRates: expenses[findIndex].exchangeRates,
    };
    expensesEdit(expenses);
    this.setState({
      valor: '',
      descrição: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      categoria: 'Alimentação',
    });
  };

  render() {
    const { valor, descrição, moeda, pagamento, categoria } = this.state;
    const { currencies, editor } = this.props;
    return (
      <div>
        <form onChange={ this.handleChange }>
          <label htmlFor="valor">
            Valor:
            <input
              data-testid="value-input"
              type="text"
              name="valor"
              value={ valor }
            />
          </label>
          <label htmlFor="descrição">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="descrição"
              value={ descrição }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              data-testid="currency-input"
              name="moeda"
              value={ moeda }
            >
              {currencies.map((item, index) => (
                (<option key={ index }>{item}</option>)
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento:
            <select data-testid="method-input" name="pagamento" value={ pagamento }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="pagamento">
            Categoria:
            <select data-testid="tag-input" name="categoria" value={ categoria }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          {
            editor
              ? (
                <button
                  type="button"
                  id="testdogui"
                  onClick={ this.handleClickId }
                >
                  Editar despesa
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={ this.handleClick }
                >
                  Adicionar despesa
                </button>
              )
          }
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currenciesFetch: PropTypes.func.isRequired,
  currencies: PropTypes.shape.isRequired,
  exchangeRates: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  editor: PropTypes.func.isRequired,
  idToEdit: PropTypes.func.isRequired,
  expensesEdit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currenciesFetch: () => dispatch(fetchWithThunk()),
  exchangeRates: (payload) => dispatch(actionThunk(payload)),
  expensesEdit: (payload) => dispatch(actionIdEdit(payload)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
