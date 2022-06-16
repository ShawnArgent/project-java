import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider,  createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ProductList from './pages/ProductList/ProductList';
import Navbar from './components/Nav/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Recipes from './pages/Recipes';
import CartHistory from './pages/CartHistory';
import Success from './pages/Success';
import { StoreProvider } from './util/GlobalState';

const httpLink =  createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/success' element={<Success />} />
              <Route path='/carthistory' element={<CartHistory />} />
              <Route path='/recipes' element={<Recipes />} />
              <Route path='/shop' element={<ProductList />} />
              <Route path='/products/:id' element={<Detail />} />
              <Route path='*' element={<NoMatch />} />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
