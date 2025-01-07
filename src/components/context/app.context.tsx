import { createContext, useContext, useState } from "react";



interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUser) => void;
    user: IUser | null;
}


//B1: Tạo Context
const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
    children: React.ReactNode
}

//B2: Tạo Provider ( wrap component)
export const AppProvider = (props: TProps) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <CurrentAppContext.Provider value={{
            isAuthenticated, user, setIsAuthenticated, setUser
        }}>
            {props.children}
        </CurrentAppContext.Provider>
    );
};

//Hook để lấy nhanh các trường truyền qua context 
export const useCurrentApp = () => {

    const currentAppContext = useContext(CurrentAppContext);
    
    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentAppContext.Provider>"
        );
    }
    return currentAppContext;
};