// // to make sure that a user is logged in
// import { getCurrentUser } from "@/lib/appwrite/api";
// import { IUser } from "@/types";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";


// export const INITIAL_USER = {
//     id: "",
//     name: "",
//     username: "",
//     email: "",
//     imageUrl: "",
//     bio: "",
// };

// // to know that we have a logged in user at all times

// const INITIAL_STATE = {
//     user: INITIAL_USER,
//     isLoading: false,
//     isAuthenticated: false,
//     setUser: () => { },
//     setIsAuthenticated: () => { },
//     checkAuthUser: async () => false as boolean,
// };

// type IContextType = {
//     user: IUser;
//     isLoading: boolean;
//     setUser: React.Dispatch<React.SetStateAction<IUser>>; // setStateAction indicates that the state can be of type IUser
//     // React.Dispatch indicates that setUser is a function that can accept values of type React.SetStateAction<IUser>
//     isAuthenticated: boolean;
//     setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//     checkAuthUser: () => Promise<boolean>;
// };

// // IContextType is the type of data that will be stored in this context
// // (INITIAL_STATE): This is setting an initial value for the context. 
// // When a component uses this context but doesn't have a matching provider it will use this INITIAL_STATE as the default value.

// const AuthContext = createContext<IContextType>(INITIAL_STATE);
// // AuthProvider will wrap entire app and provide access to the context
// // every context will have children like other components will go as children as authProvider will be wrapping them

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//     // we are setting the type of the children to React.ReactNode which indicates that the children prop can accept any kind of React content.

//     const [user, setUser] = useState<IUser>(INITIAL_USER);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const navigate = useNavigate();

//     const checkAuthUser = async () => {
//         try {
//             const currentAccount = await getCurrentUser();

//             if (currentAccount) {
//                 setUser({
//                     id: currentAccount.$id,
//                     name: currentAccount.name,
//                     username: currentAccount.username,
//                     email: currentAccount.email,
//                     imageUrl: currentAccount.imageUrl,
//                     bio: currentAccount.bio,
//                 })

//                 setIsAuthenticated(true);
//                 return true;
//             }

//             return false;

//         } catch (error) {

//             console.log(error);
//             return false;

//         } finally {

//             setIsLoading(false);

//         }
//     };
//     // using useEffect so that whenever we reload the page we check for authenticated users

//     useEffect(() => {
//         const cookieFallback = localStorage.getItem("cookieFallback");
//         if (
//             cookieFallback === "[]" ||
//             cookieFallback === null ||
//             cookieFallback === undefined
//         ) {
//             navigate("/sign-in");
//         }

//         checkAuthUser();
//     }, []);
//     const value = {
//         user,
//         setUser,
//         isLoading,
//         isAuthenticated,
//         setIsAuthenticated,
//         checkAuthUser
//     }

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
// export default AuthProvider
// export const useUserContext = () => useContext(AuthContext);


// basically jo user login kra hai uska profile, uske posts voh hum context kr rhe hai
// jaise sidebar and topbar me profile pic and kaise aayga 
// useContext se pure application me user ko bhejne se aayga na

import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);