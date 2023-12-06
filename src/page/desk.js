import axios from "axios"
import { OnRun } from "../config/OnRun"
import {getCookie, setCookie} from '../componets/cookie/cookie'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate , Outlet } from "react-router-dom";
import {useEffect} from 'react'
import Nav from "../componets/nav/Nav";

const Desk = () =>{

    const id = getCookie('id')
    const navigate = useNavigate()

    const checkCookie = () =>{
        if (id.length==0) {
            navigate('/')
            axios.post(OnRun+'/cookie', {id:id})
            .then(response=>{
                if(!response.data){
                    navigate('/')
                }
            })
        }
    }

    useEffect(checkCookie,[])


    return(
        <div className="desk">
            <Nav />
            <Outlet />

        </div>
    )
}


export default Desk