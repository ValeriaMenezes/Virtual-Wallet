import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    // REFERÊNCIAS: Romulo Silva, Sérgio Ruza me ajudaram nos requisitos 1, 4, 7, 8
    // Regex de validação de email: https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
