import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ADD_EMPLOYEE from '../graphQl/mutation/addEmployee';
import GET_EMPLOYEE from '../graphQl/querie/getEmployee';
import { compose, graphql } from "react-apollo";

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



function AddEmployee({addEmployee, history}) {
  return (
    <div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          addEmployee(values)
          history.push('/')
        }}
      >
        
        {({
          handleChange,
          handleSubmit,
          values,
          handleBlur,
          errors
        }
        ) => console.log(errors) || (

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="list">Nom:</label>
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
                <label htmlFor="name" className="list">Prénom:</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                />

              </div>
              <div>
                <label htmlFor="name" className="list">CIN:</label>
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

    </div>

  );
}


export default compose(graphql(ADD_EMPLOYEE, {
  props: ({ mutate }) => ({
    addEmployee: (values) => mutate({
      variables: {
        employee : values
      }
    })
  }),
   options: {
      refetchQueries: [{ query: GET_EMPLOYEE }],
    },

}
))
(AddEmployee);
