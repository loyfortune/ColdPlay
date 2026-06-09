import {Navigate} from 'react-router';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = UserAuth();
if (!user) {
    return <Navigate to='/login' />;
} else {
    return children;
}
};

export default ProtectedRoute