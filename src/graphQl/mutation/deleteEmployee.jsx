import gql from 'graphql-tag';

const DELETE_EMPLOYEE = gql`
mutation deleteEmployee($id: ID!){
  deleteEmployee(id: $id)
}
`;

export default DELETE_EMPLOYEE;