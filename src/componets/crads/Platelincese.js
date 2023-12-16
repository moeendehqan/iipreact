



const Platelincese = (props) =>{
    return(
        <div className="plate-lincese">
            <div className="blu">
                <img
                    src={process.env.PUBLIC_URL + "/img/Flag_of_Iran.svg"}
                ></img>
                <p>I.R</p>
            </div>
            <p className="id">{props.id}</p>
            <p className="alpha">{props.alpha}</p>
            <p className="serial">{props.serial}</p>
            <div className="city">
                <p className="ir">ایران</p>
                <p className="num">{props.city}</p>
            </div>
        </div>
    )
}

export default Platelincese