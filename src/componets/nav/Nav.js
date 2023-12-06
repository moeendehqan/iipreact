import { useNavigate } from "react-router-dom";




const Nav = () =>{
    const navigate = useNavigate()

    return(
        <nav>
            <button onClick={()=>navigate('users')}>کاربران</button>
            <button onClick={()=>navigate('connection')}>اتصال</button>
            <button>گزارش</button>
            <button onClick={()=>navigate('live')}>پخش زنده</button>
        </nav>
    )
}


export default Nav