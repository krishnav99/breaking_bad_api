import React ,{useState, useEffect} from 'react';
import axios from 'axios';
const BASE_URL = "https://www.breakingbadapi.com/api/"

function CharacterShow(props){
    const [details,setDetails] = useState({});
    useEffect(()=>{
        async function getData(){
            try{
                const res = await axios.get(BASE_URL+`characters/${props.id}`);
                if(res.status !==200) throw new Error("Error!! Status code:",res.status)
                setDetails(res.data[0]);
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

    let quotes;
    if(details.quotes){
        quotes = details.quotes.map((el,i)=><i key={i}>{el.quote}</i>)
    }

    let showData;
    if(Object.keys(details).length===0){
        showData= <h4>Loading...</h4> 
    }else{
        showData = 
            <div className="character-show">
                <h2>{details.name}</h2>
                <img src={details.img} alt={details.name}></img>
                <p>Occupation: {details.occupation.join(", ")}</p>
                <p>Status: {details.status}</p>
                {details.nickname && <p>Nickname: {details.nickname}</p>}
                <p>Portrayed by: {details.portrayed}</p>
                <p>Seasons in which the character appears: {details.appearance.join(", ")}</p>
                {quotes!==""&&<p>Quotes: {quotes}</p>}
            </div>
    }

    return(
        <div>
            {showData}
        </div>
    )
}

export default CharacterShow