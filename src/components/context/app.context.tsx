import { createContext, useContext, useState } from "react";



interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUser) => void;
    user: IUser | null;
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;
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
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

    return (
        <CurrentAppContext.Provider value={{
            isAuthenticated, user, setIsAuthenticated, setUser, isAppLoading, setIsAppLoading
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