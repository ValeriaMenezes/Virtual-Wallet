import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDelete, actionEditor } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { expenses, remove } = this.props;
    const filterRemove = expenses.filter((item) => item.id !== id);
    remove(filterRemove);
  };

  handleClickEdit = (id) => {
    const { editorButton } = this.props;
    editorButton(id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((
                { id, value, description, currency, method, tag, exchangeRates },
              ) => (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2)}</td>
                  <td>{ exchangeRates[currency].name}</td>
                  <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>
                    {
                      Number(value * exchangeRates[currency].ask).toFixed(2)
                    }
                  </td>
                  <td>{ exchangeRates[currency].codein }</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.handleClick(id) }
                    >
                      Excluir
                    </button>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.handleClickEdit(id) }
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  editorButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (remove) => dispatch(actionDelete(remove)),
  editorButton: (id) => dispatch(actionEditor(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
