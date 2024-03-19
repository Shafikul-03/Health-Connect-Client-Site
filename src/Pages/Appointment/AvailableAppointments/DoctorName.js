// import React, { useState, useEffect } from 'react';

// function DoctorName() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:5000/getDoctorsBySpecialty/:specialty`)
//       .then(response => response.json())
//       .then(data => {
//         setData(data);
//         console.log(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {data.map(post => (
//             <li key={post.id}>{post.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default DoctorName;
