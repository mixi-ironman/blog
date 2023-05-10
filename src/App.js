import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import SigUpPage from './pages/SigupPage';

function App() {
    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/sign-up" element={<SigUpPage />}></Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
