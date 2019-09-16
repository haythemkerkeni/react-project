import gql from 'graphql-tag';

const ADD_EMPLOYEE = gql`
 mutation addEmployee($employee: EmployeeInput!) {
  addEmployee(employeeInput: $employee) {
    email
    cin
    firstName
    lastName
    type
  }
}

`;

export default ADD_EMPLOYEE;