const { createContext, useContext, useState } = require('react');

const AuthContext = createContext();

function AuthProvider(props) {
    const [userInfo, setUserInfo] = useState({});
    const value = {
        userInfo,
        setUserInfo,
    };
    return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);
    if (typeof context === 'undefine') throw new Error('useAuth must be used within AuthProvider');
    return context;
}

export { AuthProvider, useAuth };
