import React, { useContext, useReducer } from "react";
import reducer from '../reducers/sidebar_reducer';

import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from '../actions'

const initialState = {
   isSidebarOpen: false,
}

const SidebarContext = React.createContext();

export const SidebarProvider = ({ children }) => {
   const [ state, dispatch] = useReducer(reducer, initialState)

   const openSidebar = () => {
      dispatch({ type: SIDEBAR_OPEN})
   }

   const closeSidebar = () => {
      dispatch({ type: SIDEBAR_CLOSE})
   }

   return (
      <SidebarContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
         { children }
      </SidebarContext.Provider>
   )
}

export const useSidebarContext = () => {
   return useContext(SidebarContext)
}