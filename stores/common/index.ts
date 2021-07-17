import React from 'react';
import { CommonModel } from './instance';

const commonStore = CommonModel.create();

const CommonContext = React.createContext(commonStore);

export { commonStore, CommonContext };
