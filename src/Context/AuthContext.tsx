import React, { ReactNode, createContext, useState } from "react";

interface AuthContextInterface {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextInterface>(undefined);

export const AuthContextProvider = (props: ProviderProps) => {
  const { children } = props;
  const [token, setToken] = useState<string | null>(null);
  
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
