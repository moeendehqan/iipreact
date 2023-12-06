import { useEffect, useState } from "react"
import axios from "axios"
import { OnRun } from "../config/OnRun"
import {getCookie, setCookie} from '../componets/cookie/cookie'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
 
const Longin = () =>{
    const [input, setInput] = useState({username:'', password:''})
    const navigate = useNavigate()

    const submit = () =>{
        axios.post(OnRun+'/login',{username:input.username, password:input.password})
        .then(response=>{
            console.log(response.data)
            if (response.data.reply) {
                setCookie('id',response.data.id,1)
                navigate('/desk')
            }else{
                toast.warning(response.data.msg, {position:"bottom-right"})
            }
        })
    }
    
    const checkCookie = () =>{
        const id = getCookie('id')
        if (id.length>0) {
            axios.post(OnRun+'/cookie', {id:id})
            .then(response=>{
                if(response.data){
                    navigate('/desk')
                }
            })
        }
    }

    useEffect(checkCookie,[])


    
    return(
        <div className="login">
            
            <ToastContainer autoClose={3000}/>

            <div className="box">

                <fieldset>
                    <label>نام کاربری</label>
                    <input type="text" value={input.username} onChange={(e)=>setInput({...input,username:e.target.value})}></input>
                </fieldset>

                <fieldset>
                    <label>رمزعبور</label>
                    <input type="password" value={input.password} onChange={(e)=>setInput({...input,password:e.target.value})}></input>
                </fieldset>

                <button onClick={submit}>ورود</button>
                <p className="forget">فراموشی رمز عبور</p>

            </div>
        </div>
    )
}

export default Longin