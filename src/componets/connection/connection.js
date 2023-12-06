import {getCookie, setCookie} from '../../componets/cookie/cookie'
import axios from "axios"
import { OnRun } from '../../config/OnRun'
import { useEffect, useState } from 'react'
import { PiWarningDuotone } from "react-icons/pi";
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import { HiVideoCamera } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";

const Connection = () =>{
    const [newDevice, setNewDevice] = useState({active:false, name:'', ip:'',port:'554',user:'admin',password:''})
    const [device, setDevice] = useState([])
    const id = getCookie('id')


    const submit = () =>{
        if (newDevice.ip.length<7) {toast.warning('مقدار ip صحیح وارد کنید',{position:"bottom-right"})    
        }else if (newDevice.port.length==0) {toast.warning('مقدار port صحیح وارد کنید',{position:"bottom-right"})
        }else if (newDevice.port.name==0) {toast.warning('مقدار نام دستگاه صحیح وارد کنید',{position:"bottom-right"})
        }else if (newDevice.user.length<3) {toast.warning('مقدار نام کاربری صحیح وارد کنید',{position:"bottom-right"})
        }else if (newDevice.user.password<3) {toast.warning('مقدار نام رمزعبور صحیح وارد کنید',{position:"bottom-right"})
        }else{
            axios.post(OnRun+'/addconnetion',{id:id, ip:newDevice.ip, port:newDevice.port, username:newDevice.user, password:newDevice.password})
            .then(response=>{
                if(response.data.reply){
                    toast.success('افزوده شد',{position:"bottom-right"})
                    setNewDevice({...newDevice,active:false})
                    get()
                }else{
                    toast.warning(response.data.msg,{position:"bottom-right"})
                }
            })
        }
    }

    const get = () =>{
        axios.post(OnRun+'/getconnetion',{id:id})
        .then(response=>{
            if(response.data.reply){
                setDevice(response.data.df)
            }
        })
    }

    const del = (_id) =>{
        axios.post(OnRun+'/delconnection',{id:id,_id:id})
        .then(response=>{
            console.log(response.data)
        })
    }


    useEffect(get,[])


    return(
        <div className='panle'>
            <ToastContainer autoClose={3000}/>
            {
                device.length==0?
                <div className='NoDivce'>
                    <span><PiWarningDuotone /></span>
                    <p>هیچ دستگاهی یافت نشد</p>
                </div>
                :
                <div className='listDevice'>
                    {
                        device.map(i=>{
                            return(
                                <div className='Device' key={i._id}>
                                    <span><HiVideoCamera /></span>
                                    <div className='detile'>
                                        <p>{i.ip+":"+i.port}</p>
                                        <p>date {i.datetime}</p>
                                    </div>
                                    <div className='action'>
                                        <span onClick={()=>del(i._id)}><MdDeleteForever /></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
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
                            <label>نام دستگاه</label>
                            <input value={newDevice.name} onChange={(e)=>{setNewDevice({...newDevice,name:e.target.value})}}></input>
                        </fieldset>
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
                        <button onClick={submit}>ثبت</button>
                    </div>
                </div>
                :null
            }
            
        </div>
    )
}


export default Connection