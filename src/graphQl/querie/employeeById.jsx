import gql from 'graphql-tag';

const GET_EMPLOYEE = gql`
query Employee ($id : ID!){
    Employee(id: $id) {
      id
      firstName
      lastName
      cin
      email
      type
    }
  }
`;

export default GET_EMPLOYEE;