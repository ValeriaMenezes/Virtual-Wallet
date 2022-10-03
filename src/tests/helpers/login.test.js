import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';
import Wallet from '../../pages/Wallet';

describe('Testa a página de login', () => {
  it('Testa input de email, password e botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(btn).toBeDefined();

    userEvent.type(email, 'valeria@menezes.com');
    userEvent.type(password, 'musicalofi');
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');
  });
  it('testa global fetch', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
