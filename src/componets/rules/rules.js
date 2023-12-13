import Grid from '@mui/material/Grid';
import {Dialog, DialogTitle, Button, IconButton} from '@mui/material'
import { useState  } from 'react';
import {AddBoxIcon, CloseRounded} from '@mui/icons-material';

const Rulse = () =>{
    const [addmode, setAddMode] = useState(false)
    const [idplate, setIdplate] = useState('')
    const [alpha, setAlpha] = useState('د')
    const [serial, setSerial] = useState('')
    const [city, setCity] = useState('')

    const handleIdplate = (e) =>{if (e.length<=2) {setIdplate(e)} }
    const handleSerial = (e) =>{if (e.length<=3) {setSerial(e)} }
    const handleCity = (e) =>{if (e.length<=2) {setCity(e)} }

    return(
        <div className='rules'>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{marginLeft:5}}
                    endIcon={<AddBoxIcon />}
                    onClick={() => {
                        setAddMode(true)
                    }}
                >
                    افزودن قانون جدید
                </Button>
            <Dialog 
                maxWidth="xs"
                open={addmode}
                onClose={()=>setAddMode(false)}
            >
                <DialogTitle textAlign="center">
                    قانون جدید
                    <IconButton
                    onClick={() => setAddMode(false)}
                    sx={{ right: 20, position: "absolute" }}
                    >
                    <CloseRounded />
                    </IconButton>
                </DialogTitle>
            </Dialog>
            
            <Grid container direction="column" justifyContent="flex-start" alignItems="stretch">
                <Grid item direction="column" justifyContent="center">
                    <div className='plate-input'>
                        <div className='blue'>
                            <img src={process.env.PUBLIC_URL+'/img/Flag_of_Iran.svg'}></img>
                            <p>I.R</p>
                        </div>
                        <input className='idplate' placeholder='23' maxLength="2" type='number' value={idplate} onChange={(e)=>handleIdplate(e.target.value)}></input>
                        <select className='alpha' value={alpha} onChange={(e)=>setAlpha(e.target.value)}>
                            <option>الف</option>
                            <option>ب</option>
                            <option>پ</option>
                            <option>ت</option>
                            <option>ث</option>
                            <option>ج</option>
                            <option>ح</option>
                            <option>د</option>
                            <option>ر</option>
                            <option>ز</option>
                            <option>ژ</option>
                            <option>س</option>
                            <option>ش</option>
                            <option>ص</option>
                            <option>ض</option>
                            <option>ط</option>
                            <option>ظ</option>
                            <option>ع</option>
                            <option>غ</option>
                            <option>ف</option>
                            <option>ق</option>
                            <option>ک</option>
                            <option>گ</option>
                            <option>ل</option>
                            <option>م</option>
                            <option>ن</option>
                            <option>و</option>
                            <option>ه</option>
                            <option>ی</option>
                            <option>D</option>
                            <option>S</option>
                        </select>
                        <input className='serial' placeholder='891' maxLength={3} type='number' value={serial} onChange={(e)=>handleSerial(e.target.value)}></input>
                        <div className='boxcity'>
                            <p>ایران</p>
                            <input className='city' placeholder='54' max={2} type='number' value={city} onChange={(e)=>handleCity(e.target.value)}></input>
                        </div>
                    </div>



                </Grid>
            
            </Grid>
        </div>
    )
}

export default Rulse