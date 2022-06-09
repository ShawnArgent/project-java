import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import RequireAuth from './components/RequireAuth';
import CartHistory from "./pages/CartHistory";
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedPageExample from './pages/ProtectedPageExample';
import SignUp from './pages/SignUp';
import { client } from './util/apolloClient';
import { AuthProvider } from './util/auth';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/carthistory" element={<CartHistory />} />
            {/* Use <RequiredAuth> for pages that should only be accessible to a
            user that has logged in.*/}

            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPageExample />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
