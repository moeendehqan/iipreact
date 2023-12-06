import {getCookie, setCookie} from '../../componets/cookie/cookie'
import axios from "axios"
import { OnRun } from '../../config/OnRun'
import { useState } from 'react'
import { PiWarningDuotone } from "react-icons/pi";
import { IoMdAddCircle } from "react-icons/io";

const Connection = () =>{
    const [newDevice, setNewDevice] = useState({active:false, ip:'',port:'554',user:'admin',password:''})
    const [device, setDevice] = useState([])
    const id = getCookie('id')



    return(
        <div className='panle'>
            {
                device.length==0?
                <div className='NoDivce'>
                    <span><PiWarningDuotone /></span>
                    <p>هیچ دستگاهی یافت نشد</p>
                </div>
                :null
            }
            <div className='add' onClick={()=>{setNewDevice({...newDevice,active:true})}}>
                <span><IoMdAddCircle /></span>
                <p>افزودن دستگاه جدید</p>
            </div>
            {
                newDevice.active?
                <div className='popup'>
                    <div className='clsclc' onClick={()=>{setNewDevice({...newDevice,active:false})}}></div>
                    <div className='win'>
                        <fieldset>
                            <label>ip address</label>
                            <input value={newDevice.ip} onChange={(e)=>{setNewDevice({...newDevice,ip:e.target.value})}}></input>
                        </fieldset>
                        <fieldset>
                            <label>port</label>
                            <input value={newDevice.port} onChange={(e)=>{setNewDevice({...newDevice, port:e.target.value})}}></input>
                        </fieldset>
                        <fieldset>
                            <label>نام کاربری</label>
                            <input value={newDevice.user} onChange={(e)=>{setNewDevice({...newDevice,user:e.target.value})}}></input>
                        </fieldset>
                        <fieldset>
                            <label>رمزعبور</label>
                            <input type='password' value={newDevice.password} onChange={(e)=>{setNewDevice({...newDevice,password:e.target.value})}}></input>
                        </fieldset>
                    </div>
                </div>
                :null
            }
            
        </div>
    )
}


export default Connection