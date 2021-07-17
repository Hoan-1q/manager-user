import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const UserModel = types
  .model('User model', {
    _id: types.optional(types.string, ''),
    avatar: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    displayName: types.optional(types.string, ''),
    disable: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setName(name: string) {
      self.displayName = name;
    },
    setEmail(email: string) {
      self.email = email;
    },
    setPassword(password: string) {
      self.password = password;
    },
    toggleDisable() {
      self.disable = !self.disable;
    }
  }));

export interface IUserModel extends Instance<typeof UserModel> {}
export interface IUserModelOut extends SnapshotOut<typeof UserModel> {}
  