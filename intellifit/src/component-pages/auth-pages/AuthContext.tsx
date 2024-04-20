import { ReactNode, createContext, useState } from "react";


type AuthContextType = {
  loggedInUser: string | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  loggedInUser: null,
  setLoggedInUser: () => null,
});


export const AuthProvider = ({ children }:{children:ReactNode}) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); // Specify the type for useState

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};