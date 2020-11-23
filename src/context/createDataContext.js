import React, { useReducer } from "react";
//how to automate context
//creating an arbitrary version that can work with many resources
//used so we dont have to keep repeating the context process
export default (reducer, actions, initialState) => {
  //create context
  const Context = React.createContext();
  //create Provider function that within contains useReducer
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //this code makes sure that our functions will be called with dispatch
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      //pass into value state, and spreadout actions object so we can have access to all our action functions
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  //return the Context and Provider
  return { Context, Provider };
};
