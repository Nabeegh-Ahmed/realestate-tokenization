import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

import SimpleStorageArtifact from "../../contracts/SimpleStorage.json"
import AuthKeeperArtifact from "../../contracts/AuthKeeper.json"
import PropertyKeeperArtifact from "../../contracts/PropertyKeeper.json"

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (artifact, web3) => {
      if (artifact) {
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        return contract
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        
        let contracts = new Map(), artifacts = new Map()

        const [SimpleStorageContract, AuthKeeperContract, PropertyKeeperContract] = await Promise.all([
          init(SimpleStorageArtifact, web3),
          init(AuthKeeperArtifact, web3),
          init(PropertyKeeperArtifact, web3),
        ])

        contracts.set("simple-storage", SimpleStorageContract)
        artifacts.set("simple-storage", SimpleStorageArtifact)
        
        contracts.set("auth-keeper", AuthKeeperContract)
        artifacts.set("auth-keeper", AuthKeeperArtifact)

        contracts.set("property-keeper", PropertyKeeperContract)
        artifacts.set("property-keeper", PropertyKeeperArtifact)

        dispatch({
          type: actions.init,
          data: { artifacts, web3, accounts, networkID, contracts }
        });
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
