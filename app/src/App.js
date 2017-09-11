import React, { Component } from 'react';
import { Admin, Resource } from 'admin-on-rest';
import ListUsers from './resources/users/ListUsers';
import EditUser from './resources/users/EditUser';
import CreateUser from './resources/users/CreateUser';
import ListUserTransactions from './resources/user_transactions/ListUserTransactions';
import xsollaRestClient from './xsollaRestClient';
import { reducer as modalReducer } from './redux/modal';
import RechargeUser from './resources/users/RechargeUser';
import { Route } from 'react-router-dom';

const restClient = xsollaRestClient({
  apiEndpoint: 'https://livedemo.xsolla.com/fe/test-task/',
  projectId: 'baev'
});

const customReducers = {
  modalReducer
};

const customRoutes = [
  <Route path="/users/:id/recharge" component={RechargeUser} />
];

class App extends Component {
  render() {
    return (
      <Admin
        restClient={restClient}
        customReducers={customReducers}
        customRoutes={customRoutes}>
        <Resource name="users"
          list={ListUsers}
          edit={EditUser}
          create={CreateUser}
          />
        <Resource name="user_transactions" list={ListUserTransactions} />
        <Resource name="user_balance" />
      </Admin>
    );
  }
}

export default App;
