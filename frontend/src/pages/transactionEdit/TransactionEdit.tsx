import React, { FormEvent, useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import api from '../../services/api';

import './transactionEdit.scss';

interface ParamsTypes {
  id: string;
}

interface Transaction {
  id: number;
  value: number;
  status: 'Aprovado' | 'Em processamento';
  date: Date;
  time: string;
  cpf: string;
  image: string;
  created_at: Date;
}

export const TransactionEdit: React.FC = () => {
  const { id } = useParams<ParamsTypes>();
  const [transaction, setTransaction] = useState<Transaction>();

  const history = useHistory();
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [image, setImage] = useState('');
  const [time, setTime] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get(`/transaction/${id}`);

      setTransaction(response.data);
    }
    loadTransactions();
  });

  async function handleAddTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const dados = {
        value,
        status,
        date,
        time,
        cpf,
        image,
      };
      await api.put(`/transaction/update/${id}`, {
        value: dados.value,
        status: dados.status,
        date: dados.date,
        time: dados.time,
        cpf: dados.cpf,
        image: dados.image,
      });
      setInputError('');
      history.push('/');
    } catch (err) {
      setInputError('Erro ao adicionar a transação');
    }
  }

  return (
    <div className="edit-transaction-page">
      <div className="header">
        <h1 className="edit-transaction">Edite os dados da sua transação</h1>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </div>
      <form onSubmit={handleAddTransaction}>
        {inputError && <span className="error">{inputError}</span>}
        <input
          type="number"
          name="value"
          id="value"
          placeholder={String(transaction?.value) || 'Valor'}
          onChange={e => setValue(e.target.value)}
          className="value"
        />
        <input
          type="text"
          name="cpf"
          id="cpf"
          placeholder={transaction?.cpf || 'Digite o CPF'}
          onChange={e => setCpf(e.target.value)}
          className="value"
        />
        <input
          type="text"
          name="image"
          id="image"
          placeholder={image || 'Digite o caminho do comprovante'}
          onChange={e => setImage(e.target.value)}
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
              <option disabled selected defaultValue={transaction?.status}>
                {transaction?.status}
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
        <button type="submit">Salvar alterações</button>
      </form>
    </div>
  );
};
