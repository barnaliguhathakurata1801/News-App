import React, { useEffect, useRef , useState } from 'react'
import News from "./News"
import './News.css'
function getDate()
{
  const date=new Date();
  const y=date.getFullYear();
  const m=date.getMonth();
  const d=date.getDate();

  const res=y+'-'+m+'-'+d;
  return res;
  console.log(res);
}
function NewsApp() {
    console.log("entered here");
    const date=getDate();
    const [newsList,setnewsList]=useState([]);
    const [query,setQuery]=useState('football');
    const apiKey='a19c301f76d842e7a53d6b4ccff8e330';
    const apiUrl=`https://newsapi.org/v2/everything?q=${query}&from=${date}&sortBy=publishedAt&apiKey=${apiKey}`;
    

    const queryInputRef = useRef(null);
    useEffect(()=>{
      fetchData();

    },[query]);

    async function fetchData()
    {
      try
      {
        const response =await fetch(apiUrl);
        const jsonData =await response.json();

        setnewsList(jsonData.articles);
      }
      catch(exeption)
      {

        console.log(exeption);
      }
    }
  
    function handleSubmit(event){
      event.preventDefault();
        const queryvalue=queryInputRef.current.value;
        setQuery(queryvalue);
    }
    return (
      <div>
        <h1 className='titledesign'>NEWS DAILY</h1>
        <form className='formdesign' onSubmit={handleSubmit}>
          <input className="query-input" type="text" ref={queryInputRef}/>
          <input className="btn-submit" onClick={handleSubmit} type="submit" value="Search" />
          <hr />
        </form>

        <div className='newsbox' >
              {newsList.map(news=>{
                return <News key={news.url} news={news}/>
              })}
            </div>
      </div>
    
  );
}


/*
return (
  <div>
    <p> list of all the products</p>
    {products.map((product)=>{
      console.log(product);
      return (
        <div key={product.id}>
          <h1>{product.name}</h1>
        </div>);
    })}
  </div>
)


*/

export default NewsApp;




//use effect takes the responsibility of re rendering your componenet 
//after it has already been rendererd
/*import { useEffect } from 'react';

function User({ name }) {
  useEffect(() => {
    document.title = name;
  }, [name]);
    
  return <h1>{name}</h1>;   
}*/