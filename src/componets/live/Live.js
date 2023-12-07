
import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../../config/OnRun"
import { getCookie } from "../cookie/cookie"
import { PiWarningDuotone } from "react-icons/pi";

import { TiMediaPlayReverse } from "react-icons/ti";

const Live = () =>{
    const [device, setDevice] = useState([])
    const id = getCookie('id')
    const [selected, setSelected] = useState(null)

    const getDevice = () =>{
        axios.post(OnRun+'/getconnetion',{id:id})
        .then(response=>{
            if(response.data.reply){
                setDevice(response.data.df)
            }
        })
    }

    const connect_camera = () =>{
        if (selected) {
            axios.post(OnRun+'/concamera',{id:id,_id:selected._id})
            
        }
    }


    useEffect(getDevice,[])
    useEffect(connect_camera,[selected])

    return(
        <div className="live">
            <div className="camlist">
                {
                    device.length==0?
                    <div className='NoDivce'>
                        <span><PiWarningDuotone /></span>
                        <p>هیچ دستگاهی یافت نشد</p>
                    </div>
                    :
                    device.map(i=>{
                        return(
                            <div className={selected==i?"dvc dvcslc":"dvc"} onClick={()=>setSelected(i)}>
                                <p>{i.name}</p>
                                <span><TiMediaPlayReverse /></span>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}


export default Live