import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import GET_EMPLOYEE from '../graphQl/querie/getEmployee';
import DELETE_EMPLOYEE from '../graphQl/mutation/deleteEmployee';
import { compose, graphql } from "react-apollo";
import Pagination from '../Pagination';


function ListEmployee(props) {
  const { Employees, deleteEmployee, setSafePage,  setSearchKeyWord, history } = props;
  // console.log("TCL: ListEmployee -> searchKeyWord", searchKeyWord)
  
  const pages = Array.apply(null, new Array(5)).map((child, index) => <a type="button" onClick={() => console.log('xxxxxxxxx') || setSafePage(index)}>{index + 1}</a>);
  return (
    <div className="table_add">
      <div className="search_content">
        <Link to="/add-employee">
          <button className="button-add"> 
            + Ajouter un employée
      </button>
        </Link>
        <div class="search-container">
          <input type="text" placeholder="Recherche.." name="search" className="search" onChange={({ target: { value } }) => setSearchKeyWord(value)} />
          <button type="submit"><i class="fa fa-search"></i></button>
        </div>
      </div>



      <table class="tg">
        <tr>
          <th className="tg-0lax">Nom</th>
          <th className="tg-0lax">Prénom</th>
          <th className="tg-0lax">CIN</th>
          <th className="tg-0lax">Type</th>
          <th className="tg-0lax">E-mail</th>
          <th className="tg-0lax">Action</th>
        </tr>
        {
          Employees.map((employee) => (
            <tr>
              <td className="tg-0lax">{employee.firstName}</td>
              <td className="tg-0lax">{employee.lastName}</td>
              <td className="tg-0lax">{employee.cin}</td>
              <td className="tg-0lax">{employee.type}</td>
              <td className="tg-0lax">{employee.email}</td>
              <td className="tg-0lax"> <i class="fas fa-edit" onClick={() => history.push(`/update-employee/${employee.id}`)} ></i>  <i class="fas fa-trash-alt" onClick={() => deleteEmployee(employee.id)}></i>
              </td>
            </tr>
          ))
        }
      </table>
      <div class="center">
        <div class="pagination">
          {pages}
        </div>
      </div>

    </div>
  );
}

const ComponentWithData = compose(
  withRouter,
  graphql(GET_EMPLOYEE, {
    options: ({ offset, searchKeyWord }) => ({ variables: { offset: offset * 10, searchKeyWord } }),
    props: ({ data }) => {
      const { Employees, loading, error } = data;
      console.log(data);
      if (!loading && !error) {
        return ({ Employees });

      }
      return { Employees: [] };
    }
  }),

  graphql(DELETE_EMPLOYEE, {
    props: ({ mutate }) => ({
      deleteEmployee: (id) => mutate({
        variables: { id }
      })
    }),
    options: {
      refetchQueries: [{ query: GET_EMPLOYEE }],
    },
  }
  ),
)(ListEmployee);

const com = () => (
  <Pagination>
    {({ page, setSafePage, setSearchKeyWord, searchKeyWord }) => (<ComponentWithData offset={page} setSafePage={setSafePage} setSearchKeyWord={setSearchKeyWord} searchKeyWord={searchKeyWord} />)}
  </Pagination>
)

export default com;





// import React from 'react';
// import { Link, withRouter } from "react-router-dom";
// import GET_EMPLOYEE from '../graphQl/querie/getEmployee';
// import DELETE_EMPLOYEE from '../graphQl/mutation/deleteEmployee';
// import { compose, graphql } from "react-apollo";

// function ListEmployee({ Employees, deleteEmployee, history }) {
//   return (
//     <div className="table_add">
//       <Link to="/add-employee">
//         <button className="button-add">
//           + Ajouter un employee
//       </button>
//       </Link>
//       <div class="topnav">
//   <div class="search-container">
//       <input type="text" placeholder="Search.." name="search"/>
//       <button type="submit"><i class="fa fa-search"></i></button>
//   </div>
// </div>


//       <table class="tg">
//         <tr>
//           <th className="tg-0lax">FirstName</th>
//           <th className="tg-0lax">LastName</th>
//           <th className="tg-0lax">cin</th>
//           <th className="tg-0lax">Type</th>
//           <th className="tg-0lax">email</th>
//           <th className="tg-0lax">Action</th>
//         </tr>
//         {
//           Employees.map((employee) => (
//             <tr>
//               <td className="tg-0lax">{employee.firstName}</td>
//               <td className="tg-0lax">{employee.lastName}</td>
//               <td className="tg-0lax">{employee.cin}</td>
//               <td className="tg-0lax">{employee.type}</td>
//               <td className="tg-0lax">{employee.email}</td>
//               <td className="tg-0lax"> <i class="fas fa-edit"  onClick={() => history.push(`/update-employee/${employee.id}`) } ></i>  <i class="fas fa-trash-alt" onClick={() => deleteEmployee(employee.id)}></i>
//               </td>
//             </tr>
//           ))
//         }
//       </table>
//       <div class="center">
//   <div class="pagination">
//   <a href="#">&laquo;</a>
//   <a href="#">1</a>
//   <a href="#" >2</a>
//   <a href="#">3</a>
//   <a href="#">4</a>
//   <a href="#">5</a>
//   <a href="#">6</a>
//   <a href="#">&raquo;</a>
//   </div>
// </div>

//     </div>


//   );
// }

// const ComponentWithData = compose(
//   withRouter,
//   graphql(GET_EMPLOYEE, {
//   variables: { () => }, 
//   props: ({ data: { Employees, loading, error } }) => {
//     if (!loading && !error) {
//       return ({ Employees });

//     }
//     return { Employees: [] };
//   }
// }),

//   graphql(DELETE_EMPLOYEE, {
//     props: ({ mutate }) => ({
//       deleteEmployee: (id) => mutate({
//         variables: { id }
//       })
//     }),
//     options: {
//       refetchQueries: [{ query: GET_EMPLOYEE }],
//     },
//   }
//   ),
// )(ListEmployee);








// export default ComponentWithData;