// showing image directly from mongoDB using base64 also image will store in mongoDB with base64 encoded data
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/getData')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('email', email);
    formData.append('image', image);

    axios.post('http://localhost:3001/api/saveData', formData, {
      headers: {
        ' Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        setData([...data, { name, age, email }]);
        setName('');
        setAge('');
        setEmail('');
        setImage(null);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/deleteData/${id}`)
      .then(res => {
        setData(data.filter(item => item._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='p-5 over overscroll-auto'>
      <h1 className='text-4xl p-3 text-center text-green-600 font-bold'>Save Data by user</h1>
      <form onSubmit={handleSubmit} className='flex flex-wrap gap-5 p-5 justify-center'>
        <input className='border p-2 rounded' type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
        <input className='border p-2 rounded' type="number" placeholder="Age..." value={age} onChange={(e) => setAge(e.target.value)} />
        <input className='border p-2 rounded' type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className='border p-2 px-5 font-bold text-white bg-slate-500 rounded' type="submit">Save</button>
      </form>

      <h1 className='text-xl font-semibold text-blue-500 p-5 underline underline-offset-8'>Saved Data in mongoDB</h1>
      <ul className='px-4 md:px-10 list-disc flex flex-col gap-2'>
        {data.map((item, index) => (
          <li key={index} className='text-xl '>
            <div className='overflow-scroll'>
              <p>Name:- {item.name} </p>
              <p>Age:- {item.age}</p>
              <p>Email-id:- {item.email}</p>
            </div>
            <div className='flex flex-col items-center'>
              {item.image && (
                <img
                  src={`data:image/*;base64,${btoa(
                    new Uint8Array(item.image.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                  )}`}
                  alt={`Image for ${item.name}`}
                  className='h-[18rem] w-[28rem] rounded'
                />
              )}
              <button onClick={() => handleDelete(item._id)} className='border p-2 px-5 mt-2 font-bold text-white bg-red-600 rounded '>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;











// showing image from uploads file from local computer
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [email, setEmail] = useState('');
//   const [image, setImage] = useState(null);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/api/getData')
//       .then(res => {
//         setData(res.data);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('age', age);
//     formData.append('email', email);
//     formData.append('image', image);

//     axios.post('http://localhost:3001/api/saveData', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//       .then(res => {
//         setData([...data, { name, age, email }]);
//         setName('');
//         setAge('');
//         setEmail('');
//         setImage(null);
//       })
//       .catch(err => console.error(err));
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:3001/api/deleteData/${id}`)
//       .then(res => {
//         setData(data.filter(item => item._id !== id));
//       })
//       .catch(err => console.error(err));
//   };

//   return (
//     <div className='p-5'>
//       <h1 className='text-4xl p-3 text-center text-green-600 font-bold'>Save Data by user</h1>
//       <form onSubmit={handleSubmit} className='flex flex-wrap gap-5 p-5'>
//         <input className='border p-2 rounded' type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
//         <input className='border p-2 rounded' type="number" placeholder="Age..." value={age} onChange={(e) => setAge(e.target.value)} />
//         <input className='border p-2 rounded' type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <button className='border p-2 px-5 font-bold text-white bg-slate-500 rounded' type="submit">Save</button>
//       </form>

//       <h1 className='text-xl font-semibold text-blue-500 p-5 underline underline-offset-8'>Saved Data in mongoDB</h1>
//       <ul className='px-10 list-disc flex flex-col gap-2'>
//         {data.map((item, index) => (
//           <li key={index}>
//             Name:- {item.name}, Age:- {item.age}, Email-id:- {item.email}
//             {item.image && <img src={`http://localhost:3001/uploads/${item.image}`} alt={`Image for ${item.name}`} className='h-60 w-60 rounded'/>}
//             <button onClick={() => handleDelete(item._id)} className='border p-2 px-5 mt-2 font-bold text-white bg-red-500 rounded'>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
