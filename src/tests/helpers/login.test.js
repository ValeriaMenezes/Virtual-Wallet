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
  it('passa pelo amor de deus', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);
    const btnDespesa = screen.getByRole('button', { name: /Adicionar despesa/i });
    const description = screen.getByText(/descrição:/i);
    console.log(description.innerHTML);
    userEvent.type(description, 'primeiradespesa');
    userEvent.click(btnDespesa);

    const text = await screen.findByText('primeiradespesa');
    expect(text).toBeDefined();

    const btnEditar = await screen.findByText(/editar/i);
    expect(btnEditar).toBeDefined();
    userEvent.click(btnEditar);

    userEvent.type(description, 'segundadespesa');
    const btnEditarDespesa = await screen.findByRole('button', { name: /editar despesa/i });
    userEvent.click(btnEditarDespesa);
    const newText = await screen.findByText(/segundadespesa/i);
    expect(newText).toBeDefined();
    expect(btnEditarDespesa).toBeDefined();

    const btnExcluir = await screen.findByRole('button', { name: /excluir/i });
    expect(btnExcluir).toBeDefined();
    userEvent.click(btnExcluir);
  });
});
