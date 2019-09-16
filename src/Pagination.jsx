import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ children, count }) => {
const [page, setPage] = useState(0);
const [searchKeyWord, setSearchKeyWord ] =  useState('')
const setSafePage = (index) => {
setPage(index);
 };
return children({ page, setSafePage, searchKeyWord, setSearchKeyWord })

};

export default Pagination ;
// export default 
// graphql(GET_COUNT, {
//     options: ({ offset }) =>({ variables: {offset: offset * 10} }), 
//     props: ({ data }) => {
//       const { Employees, loading, error } = data;
//       console.log(data);
//       if (!loading && !error) {
//         return ({ Employees });
  
//       }
//       return { Employees: [] };
//     }
//   })(Pagination);


// const pages = children.slice(0, Math.ceil(children.length / count)).map((child, index) => <button type="button" onClick={() => setPage(index)}>{index + 1}</button>);
// return (
//     <div>
//          {childrenView}
//           <div className="pagination">
//             <button type="button" className='pageButton' onClick={() => setSafePage(page - 1)} > | &#9664; </button>
//             {pages}
//            <button type="button" className='pageButton' onClick={() => setSafePage(page + 1 )}>&#9658; |</button>
//          </div>
//         </div>
//       );