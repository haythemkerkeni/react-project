import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import './App.css';
import ListEmployee from './components/ListEmployee';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';



const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache,
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router> 
        <Header/>
        <Route path="/" exact component={ListEmployee} />
        <Route path="/add-employee" component={AddEmployee} />
        <Route path="/update-employee/:employeeId" component={UpdateEmployee} />
        <Footer/>
      </Router>
      
    </ApolloProvider>
  );
}

export default App;
