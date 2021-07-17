import { Instance, types } from 'mobx-state-tree';

const CommonModel = types
  .model({
    content: types.maybe(types.string),
    isError: types.maybe(types.boolean),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setContent(content: string, isError?: boolean) {
      self.content = content;
      self.isError = isError;
    },
    setIsError(isError: boolean) {
      self.isError = isError;
    },
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
  }));

export { CommonModel };
export interface ICommonModel extends Instance<typeof CommonModel> {}
