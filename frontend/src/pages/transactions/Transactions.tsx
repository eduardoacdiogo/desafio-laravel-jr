import React, { useState, useEffect } from 'react';
import { FiTrash2, FiBookOpen, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import formatValue from '../../utils/formatValue';

import './transactions.scss';

interface Transaction {
  id: number;
  value: number;
  status: 'Aprovado' | 'Em processamento';
  date: Date;
  time: string;
  created_at: Date;
}

export const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      const transactionsFormatted = response.data.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString(
            'pt-br',
          ),
        }),
      );
      setTransactions(transactionsFormatted);
    }
    loadTransactions();
  }, []);

  async function handleDeleteTransaction(id: number) {
    await api.delete(`/transaction/${id}`);

    setTransactions(transactions.filter(transaction => transaction.id !== id));
  }

  return (
    <div className="transactions-page">
      <div className="header">
        <h1>Transações</h1>
        <Link to="/add">Adicionar transação</Link>
      </div>

      <div className="transactions">
        {transactions.map(transaction => (
          <ul className="transaction">
            <div className="info">
              <li>{transaction.value}</li>
              <li>{transaction.status}</li>
              <li>{transaction.date}</li>
              <li>{transaction.time}</li>
            </div>
            <div className="actions">
              <Link to={`/transaction/${transaction.id}`}>
                <FiBookOpen />
              </Link>
              <Link to={`/transaction/update/${transaction.id}`}>
                <FiEdit />
              </Link>
              <button
                type="submit"
                onClick={() => {
                  handleDeleteTransaction(transaction.id);
                }}
                className="delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};
