import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [text,setText]=useState('');
  const [countries,setCountries]=useState([]);
const fetchData=async()=>{
  const result=await axios.get('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries');
console.log(result.data);
setData(result.data);
setCountries(result.data);
}

const handleChange=(e)=>{
setText(e.target.value);
}

const filteredData=data.filter((country)=>{
      return country.common.toLowerCase().includes(text.toLowerCase());
    })

    useEffect(()=>{
      fetchData();
    },[]);

useEffect(()=>{
 const timer=setTimeout(()=>{
if(text===''){
  setData(countries);
}
else{
  const filtered=countries.filter((newdata)=>{
return newdata.common.toLowerCase().includes(text.toLowerCase());
  })
setData(filtered);
}
 },2000);

 return ()=>{
  clearTimeout(timer);
 }
},[countries,text])
  return (
    <>
      <div>
        <input type="text" onChange={handleChange} placeholder="Type something..." style={{padding:'10px', border:'solid 1px black', width:'200px', marginBottom:'10px'}} />
      </div>
      <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
        {data.map((img)=>{
          return <div key={img.common} style={{border:'1px solid black', margin:'10px', padding:'10px', height:'150px', width:'150px'}}>
            <img src={img.png} alt="country-flag" style={{height:'100px', width:'100%'}}/>
            <h3 style={{height:'50px', width:'100%'}}>{img.common}</h3>
            
   </div>         
        })}
      </div>
    </>
  )
}

export default App
