const actions = {
  init: "INIT",
  addContract: "ADD_CONTRACT"
};

const initialState = {
  artifacts: new Map(),
  web3: null,
  accounts: null,
  networkID: null,
  contracts: new Map()
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      
      return { ...state, ...data,  };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
