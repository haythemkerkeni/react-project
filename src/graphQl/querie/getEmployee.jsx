import gql from 'graphql-tag';

const GET_EMPLOYEE = gql`
query Employees ($offset : Int! , $searchKeyWord: String){
    Employees(offset: $offset , searchKeyWord: $searchKeyWord) {
      id
    email
    cin
    firstName
    lastName
    type
    }
  }
`;

export default GET_EMPLOYEE;