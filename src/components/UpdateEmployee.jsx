import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import UPDATE_EMPLOYEE from '../graphQl/mutation/updateEmployee';
import GET_EMPLOYEE_BY_ID from '../graphQl/querie/employeeById';
import { compose, graphql, Query } from "react-apollo";

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  cin: '',
};
const validationSchema = Yup.object().shape({
  firstName: Yup.string('firstName non valide').required(),
  lastName: Yup.string('lastName non valide').required(),
  email: Yup.string().email('Email non valide').required(),
  cin: Yup.number().min(8).required('8 characteres'),
});



function UpdateEmployee({updateEmployee, match: { params: { employeeId } }}) {
  return (
    <div>
       <Query query={GET_EMPLOYEE_BY_ID} variables={ {id: employeeId} }>
            {
              ({data, loading}) => {
                if (loading) return <p>Chargement ...</p>
                return (
                  <Formik
                    initialValues={{
                      firstName: data.Employee.firstName,
                      lastName: data.Employee.lastName,
                      email: data.Employee.email,
                      cin: data.Employee.cin,
                      type: data.Employee.type,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {updateEmployee(employeeId ,values)}}
                  >
                    {({
                      handleChange,
                      handleSubmit,
                      values,
                      handleBlur,
                      errors
                    }
                    ) => (
                    
                        <form onSubmit={handleSubmit}>
                          <div>
                            <label htmlFor="name" className="list">FirstName:</label>
                            <input
                              type="text"
                              onChange={handleChange}
                              value={values.firstName}
                              onBlur={handleBlur}
                              name="firstName" />
                              { errors.firstName && <div id="feedback">Don't give a shit </div>}
                          </div>
                          <div>
                            <label htmlFor="name" className="list">Type:</label>
                              <select className="type"
                                onChange={handleChange}
                                value={values.type}
                                onBlur={handleBlur}
                                name="type"
                              >
                                <option value="employee">employee</option>
                                <option value="administrator">administrator</option>
                                <option value="manager">manager</option>
                              </select>
                              { errors.type && <div id="feedback">Don't give a shit </div>}
                          </div>
                          <div>
                            <label htmlFor="name" className="list">LastName:</label>
                            <input
                              type="text"
                              onChange={handleChange}
                              name="lastName"
                              value={values.lastName}
                              onBlur={handleBlur}
                            />

                          </div>
                          <div>
                            <label htmlFor="name" className="list">Cin:</label>
                            <input
                              type="number"
                              id="name"
                              onChange={handleChange}
                              name="cin"
                              value={values.cin}
                              onBlur={handleBlur}
                            />
                            { errors.cin && <div id="feedback">Don't give a shit </div>}
                          </div>

                          <div>
                            <label htmlFor="mail" className="list">E-mail:</label>
                            <input
                              type="email"
                              onChange={handleChange}
                              name="email"
                              value={values.email}
                              onBlur={handleBlur}
                            />
                          </div>

                          <div className="button">
                            <button type="submit" className="buttonValide" >Valide</button>
                          </div>
                        </form>
                      )}
                  </Formik>
                )
              }
            }
          </Query>
    </div>

  );
}


export default compose(
  graphql(UPDATE_EMPLOYEE, {
    props: ({ mutate }) => ({
      updateEmployee: (id, values) => mutate({
        variables: { 
          id,
          employee: values 
        }
      })
    }),
  }
),)
(UpdateEmployee);
