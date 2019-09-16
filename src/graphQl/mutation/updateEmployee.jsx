import gql from 'graphql-tag';

const UPDATE_EMPLOYEE = gql`
mutation updateEmployee($id: ID!, $employee: EmployeeInput!){
  updateEmployee(id: $id, employee: $employee){
    id
    firstName
    lastName
    type
    email
    cin
  }
}
`;

export default UPDATE_EMPLOYEE;