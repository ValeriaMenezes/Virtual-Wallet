import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  handleLogin = ({ target }) => {
    const { value, name } = target;
    const { email, password } = this.state;

    this.setState({
      [name]: value,
    }, () => {
      const validation = /\S+@\S+\.\S+/;
      const emailInput = validation.test(email);
      const seis = 5;
      const passwordInput = password.length >= seis;

      const total = emailInput && passwordInput;
      this.setState({
        disabled: !total,
      });
    });
  };

  handleClick = () => {
    const { email } = this.state;
    const { emailUser } = this.props;
    const { history } = this.props;
    emailUser(email);
    history.push('/carteira');
  };

  render() {
    const { disabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="email"
            name="email"
            onChange={ this.handleLogin }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ this.handleLogin }
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  emailUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailUser: (xable) => dispatch(userAction(xable)),
});

export default connect(null, mapDispatchToProps)(Login);
