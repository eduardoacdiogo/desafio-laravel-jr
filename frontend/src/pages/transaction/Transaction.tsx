import React, { useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

import api from '../../services/api';

import './transaction.scss';

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

export const Transaction: React.FC = () => {
  const { id } = useParams<ParamsTypes>();
  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get(`/transaction/${id}`);

      setTransaction(response.data);
    }
    loadTransactions();
  });

  return (
    <div className="transaction-page">
      <div className="header">
        <h1 className="title">Detralhes da transação</h1>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </div>
      <div className="details">
        <ul className="transaction">
          {transaction && (
            <div className="info">
              <li>Valor: R$ {transaction.value}</li>
              <li>Status: {transaction.status}</li>
              <li>Data: {transaction.date}</li>
              <li>Hora: {transaction.time}</li>
              {transaction.cpf && <li>CPF: {transaction.cpf}</li>}
              {transaction.image && <li>Comprovante: {transaction.image}</li>}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
