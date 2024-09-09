// "use client"
// import React, { useContext, createContext } from "react";

// const GlobalContext = createContext();

// export const GlobalProvider = ({ children }) => {
//     const initialState = {
//         allPokemon: [],
//         pokemon: {},
//         pokemonDatabase: [],
//         searchResults: [],
//         next: "",
//         loading: false,
//     }

//     return (
//         <GlobalContext.Provider value={{ ...initialState }}>
//             {children}
//         </GlobalContext.Provider >
//     )
// }

// export const useGlobalContext = () => {
//     return useContext(GlobalContext);
// }