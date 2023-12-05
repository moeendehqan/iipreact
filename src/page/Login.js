import { useState } from "react"
import axios from "axios"
import { OnRun } from "../config/OnRun"


const Longin = () =>{
    const [input, setInput] = useState({username:'',password:''})

    const submit = () =>{
        axios.post(OnRun+'/login',{username:input.username, password:input.password})
        .then(response=>{
            console.log(response)
        })
    }


    
    return(
        <div className="login">
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