import React, { createContext, useState } from 'react'
export const Context=createContext();
import run from '../config/gemini';

const ContextProvider = (props) => {
    const [input, setinput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompts, setprevPrompts] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setloading] = useState(false);
    const [resultData, setresultData] = useState("");

    const delayPara=(index,nextword)=>{
        setTimeout(() => {
            setresultData(prev=>prev+nextword)
        }, 75*index);
    }
    const newChat=()=>{
        setloading(false);
        setshowResult(false);
    }
    const onSent=async(prompt)=>{
        setresultData("");
        setloading(true);
        setshowResult(true);
        let response;
        if(prompt !== undefined){
            response=await run(prompt);
            setrecentPrompt(prompt);
        }
        else{
            setprevPrompts(prev=>[...prev,input]);
            setrecentPrompt(input);
            response=await run(input);
        }
        let responseArray=response.split("**");
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i===0||i%2!==1){//when i is even
                newResponse+=responseArray[i];
            }
            else{
                newResponse+="<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2=newResponse.split("*").join("</br>");
        // setresultData(newResponse2);

        let newResposeArray=newResponse2.split(" ");
        for(let i=0;i<newResposeArray.length;i++){
            const nextword=newResposeArray[i];
            delayPara(i,nextword+" ");
        }
        setloading(false);
        setinput("");
    }
    // onSent("what is react js")

    const contextValue={
        prevPrompts,
        setprevPrompts,
        onSent,
        setrecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setinput,
        newChat
    }
  return (
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
  )
}

export default ContextProvider