
import axios from "axios"
import { useEffect, useState, useRef} from "react"
import { OnRun } from "../../config/OnRun"
import { getCookie } from "../cookie/cookie"
import { PiWarningDuotone } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";

import { TiMediaPlayReverse } from "react-icons/ti";

const Live = () =>{
    const [device, setDevice] = useState([])
    const id = getCookie('id')
    const [selected, setSelected] = useState(null)
    const [imageUrl, setImageUrl] = useState(null);

    const getDevice = () =>{
        axios.post(OnRun+'/getconnetion',{id:id})
        .then(response=>{
            if(response.data.reply){
                setDevice(response.data.df)
            }
        })
    }

    const connect_camera = () => {
        if (selected) {
            axios.post(OnRun + '/concamera', { id: id, _id: selected._id })
            .then(response => {
                setImageUrl(response.data);
            })
            .catch(error => {
              console.error('Error fetching camera stream:', error);
            });
        }
      };



    useEffect(getDevice,[])

    useEffect(() => {
        const intervalId = setInterval(connect_camera, 1000);
        return () => clearInterval(intervalId);
      }, [ selected, imageUrl]);


    return(
        <div className="live">
            <ToastContainer autoClose={3000} />
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
                            <div key={i._id} className={selected==i?"dvc dvcslc":"dvc"} onClick={()=>setSelected(i)}>
                                <p>{i.name}</p>
                                <span><TiMediaPlayReverse /></span>
                            </div>
                        )
                    })
                }

            </div>
            <div className="liveBox">
                <div className="monitor">
                    {imageUrl && (
                        <img src={`data:image/jpeg;base64,${imageUrl.frame.image}`} alt="تصویر" />
                    )}
                    <div className="respo">

                        {
                            imageUrl?
                                <>
                                    <div className="date">
                                        <p>زمان</p>
                                        <p>{imageUrl.frame.time}</p>
                                        <p>{imageUrl.frame.date}</p>
                                    </div>
                                    <div className="cntplt">
                                        <p>تعداد پلاک</p>
                                        <p>{imageUrl.frame.plate.length}</p>
                                    </div>
                                    <div className="pltlst">
                                        {
                                            imageUrl.frame.plate.length>0?
                                            imageUrl.frame.plate.map(i=>{
                                                const id = i.number.idplate;
                                                const alpha = i.number.alpha;
                                                const serial = i.number.serial;
                                                const city = i.number.city;
                                                return(
                                                    <div className="plt">
                                                        <p>{Math.floor(i.score*100).toLocaleString()}</p>
                                                        <div className="obj">
                                                            <p className="id">{id}</p>
                                                            <p className="alpha">{alpha}</p>
                                                            <p className="serial">{serial}</p>
                                                            <p className="cty">{city}</p>
                                                        </div>
                                                    </div>
                                                    )
                                            })
                                            :null
                                        }
                                    </div>
                                </>:null
                        }

                    </div>
                </div>
                <div className="detile">


                </div>

            </div>

        </div>
    )
}


export default Live