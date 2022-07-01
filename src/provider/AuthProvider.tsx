import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store";

interface AuthProps {
    children: JSX.Element
}

interface AuthProviderProps {
    children: React.ReactNode
}

interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
}

const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider: FC<AuthProviderProps> = (props) => {
    const username = useSelector<RootState, string>((state) => {
        let name = "";
        console.log("*STATE*:", state);
        if (!!state.auth.user) {
            name = state.auth.user.username
        };
        
        console.log("STATE RESULT:", name);
        return name;
    });
        
    const [user, setUser] = useState<any>(null);

    const signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
        setUser(newUser);
        callback();
        });
    };

    const signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
        setUser(null);
        callback();
        });
    };

    const value = { user, signin, signout };

    useEffect(() => {
        setUser(username);
    }, []);

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

function useAuth() {
    return React.useContext(AuthContext);
}

const RequireAuth: FC<AuthProps> = (authProps) => {
    let auth = useAuth();
    let location = useLocation();
    let username = useSelector<RootState, boolean>((state) => {
        return !!state.auth.user && !!state.auth.user.username;
    });    

    return (auth.user || username) ? authProps.children : (<Navigate to="/login" state={{ from: location }} replace />);
}

export { AuthProvider, useAuth, RequireAuth };