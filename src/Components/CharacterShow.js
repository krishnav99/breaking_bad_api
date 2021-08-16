import React ,{useState, useEffect} from 'react';
import axios from 'axios';
const BASE_URL = "https://www.breakingbadapi.com/api/"

function CharacterShow(props){
    const [details,setDetails] = useState({});
    useEffect(()=>{
        async function getData(){
            try{
                //Getting the character data
                const res = await axios.get(BASE_URL+`characters/${props.id}`);
                if(res.status !==200) throw new Error("Error!! Status code:",res.status)
                setDetails(res.data[0]);

                //Getting the quotes for that character
                let author = res.data[0].name;
                author = author.replace(" ","+");
                const quotes = await axios.get(BASE_URL+`quote?author=${author}`);
                if(res.status !==200) throw new Error("Error!! Status code:",res.status)
                setDetails((st)=>({...st,quotes:quotes.data}));
            }   
            catch(err){
                console.log(err)
            }
        }
        getData()
    },[props.id])

    //Creating the quote element
    let quotes;
    if(details.quotes && details.quotes.length!==0){
        quotes = details.quotes.map((el,i)=><p><i key={i}>"{el.quote}"</i></p>)
    }

    let showData;
    if(Object.keys(details).length===0){
        showData= <h4>Loading...</h4> 
    }else{
        showData = 
            <div className="character-show">
                <div className="container">
                    <img src={details.img} alt={details.name}></img>
                    <div>
                        <h2>{details.name}</h2>
                         <hr/>
                        <p><span>Occupation:</span> {details.occupation.join(", ")}</p>
                        <p><span>Status:</span> {details.status}</p>
                        {details.nickname && <p><span>Nickname: </span>{details.nickname}</p>}
                        <p><span>Portrayed by:</span> {details.portrayed}</p>
                        <p><span>Seasons in which the character appears:</span> {details.appearance.join(", ")}</p>
                       
                    </div>
                </div>
                {quotes&&<div className="quotes"><span>Quotes:</span>{quotes}</div>}
            </div>
    }

    return(
        <div>
            {showData}
        </div>
    )
}

export default CharacterShow