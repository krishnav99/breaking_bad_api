import React, { useState,useEffect} from 'react'
import axios from "axios"
import Card from "./Card"

const BASE_URL = "https://www.breakingbadapi.com/api/";


function List(){
    const [keyword, setKeyword] = useState("");
    const [charactersData, setCharactersData] = useState([])
    const [pageNumber, setPageNumber] = useState(1);
 
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
    
    data = data.slice((pageNumber-1)*10,pageNumber*10)
    let cards =   data.map(el=><Card {...el} key={el.char_id}/>)

    return(
        <div className="list">
            <span>🔍 </span><input type="text" value={keyword} onChange={(evt)=>{setKeyword(evt.target.value)}}></input>
            {charactersData.length===0?<h4>Loading....</h4>:cards}
            {pageNumber!==1&&<button onClick={()=>setPageNumber(pageNumber-1)}>Previous</button>}
            <span>{pageNumber}</span>
            {pageNumber<7 && <button onClick={()=>setPageNumber(pageNumber+1)}>Next</button>}
        </div>
        
    )
}

export default List;