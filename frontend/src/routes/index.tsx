import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import { Login } from './pages/login/Login';
import { Transactions } from '../pages/transactions/Transactions';
import { AddTransaction } from '../pages/addTransaction/AddTransaction';
import { Transaction } from '../pages/transaction/Transaction';
import { TransactionEdit } from '../pages/transactionEdit/TransactionEdit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Transactions} />
    <Route path="/add" exact component={AddTransaction} />
    <Route path="/transaction/:id" exact component={Transaction} />
    <Route path="/transaction/update/:id" exact component={TransactionEdit} />
  </Switch>
);

export default Routes;
