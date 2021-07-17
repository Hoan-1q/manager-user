import React from 'react';
import { applySnapshot, flow, getSnapshot, Instance, types } from 'mobx-state-tree';
import { UserModel } from './model/User';
import axios from 'axios';

export const StoreModel = types
  .model({
    user: types.optional(UserModel, {}),
    listUser: types.optional(types.array(UserModel), []),
  })
  .actions((self) => ({
    onLogin(usename: string, password: string) {
      if (usename && password === 'admin') {
        console.log(usename, password);
        return 'done'
      }
    },
    addUser: flow(function* addUser(id: string) {
      const { data } = yield axios.post(`/api/user/${id}`, getSnapshot(self.user));
    }),
    getUsers: flow(function* getUsers() {
      const { data } = yield axios.get('/api/users');
      console.log(data);
      applySnapshot(self.listUser, data);
    }),
    getUserByID: flow(function* getUserByID(id: string | string[]) {
      console.log(id);
      const { data } = yield axios.get(`/api/user/${id}`);
      applySnapshot(self.user, data);
    }),
    deleteUser: flow(function* deleteUser(id: string) {
      const { data } = yield axios.delete(`/api/user/${id}`);
      if (data) return 'done'
    }),
  }));

const store = StoreModel.create();

const StoreContext = React.createContext<IStoreModel>(store);

export { store, StoreContext };

export interface IStoreModel extends Instance<typeof StoreModel> {};
