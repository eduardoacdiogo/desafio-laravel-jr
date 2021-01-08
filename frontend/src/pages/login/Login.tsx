import React from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/input/Input';

import './login.scss';

export const Login: React.FC = () => {
  function handleSubmit(data: any): void {
    console.log(data);
  }

  return (
    <div className="login-page">
      <Form onSubmit={handleSubmit}>
        <h1>Faça seu login</h1>

        <Input name="email" type="email" placeholder="E-mail" />

        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>
      </Form>
    </div>
  );
};
