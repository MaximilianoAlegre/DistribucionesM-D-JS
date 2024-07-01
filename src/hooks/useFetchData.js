// import { useState, useEffect } from "react";

// export const useFetchData = (urls) => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responses = await Promise.all(urls.map(url => fetch(url)));
//         const data = await Promise.all(responses.map(res => res.json()));
//         setData(data);
//       } catch (err) {
//         setError(err);
//       }
//     };

//     fetchData();
//   }, [urls]);

//   return { data, error };
// };
