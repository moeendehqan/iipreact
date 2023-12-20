import Grid from "@mui/material/Grid";
import {
  Dialog,
  DialogTitle,
  Button,
  IconButton,
  DialogContent,
  Select,
  MenuItem,
  InputLabel,
  DialogActions,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CloseRounded } from "@mui/icons-material";
import axios from "axios";
import { OnRun } from "../../config/OnRun";
import { getCookie } from "../cookie/cookie";
import { ToastContainer, toast } from "react-toastify";
import CardPlateRules from "../crads/PlateRule";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import RuleIcon from '@mui/icons-material/Rule';

const Rulse = () => {
  const id = getCookie("id");
  const [type, setType] = useState('Plate')
  const [device, setDevice] = useState([])
  const [selectDevice, setSelectDevice] = useState([])
  const [pinGpio, setGpio] = useState([17, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 35, 36, 37, 38, 40, 41, 42, 43, 44, 45, 46, 47, 48])
  const [pinOut, setPinOut] = useState(17)
  const [duration, setDuration] = useState(100)

  const [addmode, setAddMode] = useState(false);
  const [idplate, setIdplate] = useState("");
  const [alpha, setAlpha] = useState("د");
  const [serial, setSerial] = useState("");
  const [city, setCity] = useState("");
  const [alphaArr, setAlphaArr] = useState([
    "الف",
    "ب",
    "پ",
    "ت",
    "ث",
    "ج",
    "ح",
    "د",
    "ر",
    "ز",
    "ژ",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ک",
    "گ",
    "ل",
    "م",
    "ن",
    "و",
    "ه",
    "ی",
    "D",
    "S",
  ]);
  const [status, setStatus] = useState(true);
  const [rowData, setRowData] = useState([]);


  const handleIdplate = (e) => {
    if (e.length <= 2) {
      setIdplate(e);
    }
  };
  const handleSerial = (e) => {
    if (e.length <= 3) {
      setSerial(e);
    }
  };
  const handleCity = (e) => {
    if (e.length <= 2) {
      setCity(e);
    }
  };
  
  const submit = () => {
    console.log({
      id: id,
      type:type,
      selectdevice:selectDevice,
      idplate: idplate,
      alpha: alpha,
      serial: serial,
      city: city,
      status: status,
      pinout:pinOut,
      duration:duration
    })
    axios
      .post(OnRun + "/setrules", {
        id: id,
        type:type,
        selectdevice:selectDevice,
        idplate: idplate,
        alpha: alpha,
        serial: serial,
        city: city,
        status: status,
        pinout:pinOut,
        duration:duration
      })
      .then((response) => {
        if (response.data.reply) {
          toast.success("افزوده شد", { position: "bottom-right" });
          setAddMode(false);
        } else {
          toast.warning(response.data.msg, { position: "bottom-right" });
        }
      });
  };

  const get = () => {
    axios.post(OnRun + "/getrules", { id: id }).then((response) => {
      if (response.data.reply) {
        setRowData(response.data.df);
      }
    });
  };

  const getDevice = () =>{
    axios.post(OnRun + "/getconnetion", { id: id }).then((response) => {
      if (response.data.reply) {
        setDevice(response.data.df);
        setSelectDevice(response.data.df[0]._id)
      }
    });
  }

  useEffect(get, []);
  useEffect(getDevice, []);

  return (
    <div className="rules">
      <ToastContainer autoClose={3000} />
      <Grid container spacing={2} >

        {
          rowData.length==0?null:
          rowData.map(i=>{
            return(
              <Grid item>
                <CardPlateRules idCreator={id} _id={i._id} type={i.type}  id={i.idplate} alpha={i.alpha} serial={i.serial} city={i.city} status={i.status} datetime={i.datetime}/>
              </Grid>
            )
          })
        }
      </Grid>
      <Dialog maxWidth="xs" open={addmode} onClose={() => setAddMode(false)}>
        <DialogTitle textAlign="center">
          قانون جدید
          <IconButton
            onClick={() => setAddMode(false)}
            sx={{ right: 20, position: "absolute" }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item direction="column" justifyContent="center" xs="12">
              <InputLabel id="typeRules">نوع قانون</InputLabel>
              <Select
                labelId="typeRules"
                id="stypeRules"
                value={type}
                label="نوع قانون"
                onChange={(e)=>setType(e.target.value)}
              >
                <MenuItem value={'Plate'}>پلاک خوان</MenuItem>
                <MenuItem value={'Object'}>تشخیص اشیاء</MenuItem>
              </Select>
            </Grid>

            {
              device.length>0 && type == 'Object'?
              <Grid item direction="column" justifyContent="center" xs="12">
                <InputLabel id="device">دستگاه</InputLabel>
                <Select
                  labelId="device"
                  id="sdevice"
                  value={selectDevice}
                  label="دستگاه"
                  onChange={(e)=>setSelectDevice(e.target.value)}
                >
                  {
                    device.map(i=>{
                      return(
                        <MenuItem value={i._id}>{i.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </Grid>
              :null
            }

            {
              type=='Plate'?
              <>
                <Grid item direction="column" justifyContent="center" xs="12">
                  <div className="plate-input">
                    <div className="blue">
                      <img
                        src={process.env.PUBLIC_URL + "/img/Flag_of_Iran.svg"}
                      ></img>
                      <p>I.R</p>
                    </div>
                    <input
                      className="idplate"
                      placeholder="23"
                      maxLength="2"
                      type="number"
                      value={idplate}
                      onChange={(e) => handleIdplate(e.target.value)}
                    ></input>
                    <select
                      className="alpha"
                      value={alpha}
                      onChange={(e) => setAlpha(e.target.value)}
                    >
                      {alphaArr.map((i) => {
                        return <option key={i}>{i}</option>;
                      })}
                    </select>
                    <input
                      className="serial"
                      placeholder="891"
                      maxLength={3}
                      type="number"
                      value={serial}
                      onChange={(e) => handleSerial(e.target.value)}
                    ></input>
                    <div className="boxcity">
                      <p>ایران</p>
                      <input
                        className="city"
                        placeholder="54"
                        max={2}
                        type="number"
                        value={city}
                        onChange={(e) => handleCity(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </Grid>
                <Grid item direction="column" justifyContent="center" xs="12">
                  <InputLabel id="status">وضعیت</InputLabel>
                  <Select
                    labelId="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="وضعیت"
                  >
                    <MenuItem value={true}>مجاز</MenuItem>
                    <MenuItem value={false}>غیرمجاز</MenuItem>
                  </Select>
                </Grid>
              </>
              :null
            }
            {
              type=='Object'?
              <>


              </>
              :null
            }
            <Grid item direction="column" justifyContent="center" xs="12">
              <InputLabel id="pinOut">پین پالس خروجی</InputLabel>
              <Select
                labelId="pinOut"
                value={pinOut}
                onChange={(e) => setPinOut(e.target.value)}
                label="پین پالس خروجی"
              >
                {
                  pinGpio.map(i=>{
                    return(
                      <MenuItem value={i}>{i}</MenuItem>
                    )
                  })
                }
              </Select>
            </Grid>

            <Grid item direction="column" justifyContent="center" xs="12">
              <TextField value={duration} onChange={(e)=>setDuration(e.target.value)} id="outlined-basic" label="مدت پالس" variant="outlined" />
            </Grid>




          </Grid>
        </DialogContent>
        <DialogActions sx={{ width: "100%" }}>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={submit}
          >
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
      <SpeedDial
        ariaLabel="SpeedDial basic example" 
        sx={{ position: "absolute", bottom: 16, right: 16 }} 
        icon={<SpeedDialIcon />} 
      >
          <SpeedDialAction
            key={'addrules'}
            icon={<RuleIcon />}
            tooltipTitle={'قانون جدید'} 
            onClick={() => {
              setAddMode(true);
            }}
          />
      </SpeedDial>
    </div>
  );
};

export default Rulse;
