import React, { useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
import Card from "./Card"

const BASE_URL = "https://www.breakingbadapi.com/api/";


function List(props){
    const [keyword, setKeyword] = useState("");
    const [filter, setFilter] = useState({})
    const [charactersData, setCharactersData] = useState([])
 
    //getting the data from the API
    useEffect(() => {
        async function getData(){
            try{
                const res = await axios.get(BASE_URL+"characters");
                if(res.status !==200) throw new Error("Error!! Status code:",res.status)
                setCharactersData(res.data)
            }   
            catch(err){
                console.log(err)
            }
        }
        getData()
    },[])

    //Filtering data by keywords
    let data =  charactersData.filter(el=>{
        if(keyword === "") return el
        if(el.name.toLowerCase().includes(keyword.toLowerCase())) return el
        return null
    })
    
    function changeFilter(evt){
        setFilter((st)=>({...st,
            [evt.target.name] : evt.target.checked?true:false,
        }))
    }
    
    //Filterting through status
    if(filter.alive) data = data.filter(el=> el.status==="Alive")
    if(filter.deceased) data = data.filter(el=>el.status==="Deceased")

    //Showing 10 profiles per page
    let pageNumber = parseInt(props.pageNumber);
    data = data.slice((pageNumber-1)*10,pageNumber*10)
    let cards =   data.map(el=><Card {...el} key={el.char_id}/>)

    return(
        <div className="list">
            <span>🔍 </span><input type="text" value={keyword} onChange={(evt)=>{setKeyword(evt.target.value)}}></input>
            <div className="filter">
                <span><b>Status</b></span>: 
                <span>
                    <input type="checkbox"  name="alive" value ="true" onChange={(evt)=>changeFilter(evt)}/>Alive🙂
                </span>
                <span>
                    <input type="checkbox"  name="deceased" value ="true" onChange={(evt)=>changeFilter(evt)}/>Deceased💀
                </span>
               

            </div>
            {charactersData.length===0?<h4>Loading....</h4>:cards}
            <div className="pagnation">
                {pageNumber!==1&&<button><Link to={`/${pageNumber-1}`}>Previous</Link></button>}
                <span>{pageNumber}</span>
                {pageNumber<7 && <button><Link to={`/${pageNumber+1}`}>Next</Link></button>}
            </div>
            
        </div>
        
    )
}

export default List;