import React, { useEffect, useState } from 'react';
import Cards from './Profile';
import './App.css';

// const cardsData = [
//   {
//     key: 1,
//     name: 'bharat',
//     email: 'tamp@gmail.com',
//     phone: '7789879898',
//     website: 'websitw.com'
//   },
// ]


export default function App(){ 

  const [cardsData, setcardsData] = useState([])

  const getData = () => {fetch('https://jsonplaceholder.typicode.com/users')
                    .then((res) => res.json())
                    .then((data) => {setcardsData(data)})
                    .catch((err)=> {
                      console.log(err)
                    })}

  useEffect(() => {
    getData()
  }, [])

  return (
  <div className='cards'>
    <div className='cards_wrapper'>
      <Cards cardsData={cardsData} setcardsData={setcardsData} />
    </div>
  </div>
  )};
