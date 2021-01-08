import React, { FormEvent, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import api from '../../services/api';

import './addTransaction.scss';

export const AddTransaction: React.FC = () => {
  const history = useHistory();
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [inputError, setInputError] = useState('');

  async function handleAddTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value || !status || !date || !time) {
      setInputError('Complete todos os campos');
      return;
    }

    try {
      const transaction = { value, status, date, time };
      const response = await api.post('/transaction', {
        value: transaction.value,
        status: transaction.status,
        date: transaction.date,
        time: transaction.time,
      });
      console.log(response);
      setInputError('');
      history.push('/');
    } catch (err) {
      setInputError('Erro ao adicionar a transação');
    }
  }

  return (
    <div className="add-transaction-page">
      <div className="header">
        <h1 className="add-transaction">Adicione os dados da sua transação</h1>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </div>
      <form onSubmit={handleAddTransaction}>
        {inputError && <span className="error">{inputError}</span>}
        <input
          type="text"
          name="value"
          id="value"
          placeholder="Digite o valor da sua transação"
          onChange={e => setValue(e.target.value)}
          className="value"
        />
        <div className="seletores">
          <div>
            <select
              name="status"
              id="status"
              onChange={e => setStatus(e.target.value)}
              className="selecao"
            >
              <option disabled selected defaultValue="0">
                Status
              </option>
              <option value="Em processamento">Em processamento</option>
              <option value="Aprovado">Aprovado</option>
            </select>
          </div>
          <div className="selecao">
            <input
              type="date"
              name="date"
              id="date"
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="selecao">
            <input
              type="time"
              name="time"
              id="time"
              onChange={e => setTime(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Salvar transação</button>
      </form>
    </div>
  );
};
