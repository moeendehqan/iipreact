import { getCookie, setCookie } from "../../componets/cookie/cookie";
import axios from "axios";
import { OnRun } from "../../config/OnRun";
import { useEffect, useState } from "react";
import { PiWarningDuotone } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import SpeedDial from '@mui/material/SpeedDial';
import { CloseRounded } from "@mui/icons-material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import VideocamIcon from '@mui/icons-material/Videocam';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataGrid , GridActionsCellItem } from '@mui/x-data-grid';

const Connection = () => {
  const [newDevice, setNewDevice] = useState({
    active: false,
    type: "ip",
    name: "",
    ip: "",
    port: "554",
    user: "admin",
    password: "",
  });
  const [device, setDevice] = useState([]);
  const id = getCookie("id");

  const submit = () => {
    if (newDevice.ip.length < 7 && newDevice.type == "ip") {
      toast.warning("مقدار ip صحیح وارد کنید", { position: "bottom-right" });
    } else if (newDevice.port.length == 0 && newDevice.type == "ip") {
      toast.warning("مقدار port صحیح وارد کنید", { position: "bottom-right" });
    } else if (newDevice.name == 0) {
      toast.warning("مقدار نام دستگاه صحیح وارد کنید", {
        position: "bottom-right",
      });
    } else if (newDevice.user.length < 3 && newDevice.type == "ip") {
      toast.warning("مقدار نام کاربری صحیح وارد کنید", {
        position: "bottom-right",
      });
    } else if (newDevice.password.length < 3 && newDevice.type == "ip") {
      toast.warning("مقدار نام رمزعبور صحیح وارد کنید", {
        position: "bottom-right",
      });
    } else {
      axios
        .post(OnRun + "/addconnetion", {
          id: id,
          type: newDevice.type,
          name: newDevice.name,
          ip: newDevice.ip,
          port: newDevice.port,
          username: newDevice.user,
          password: newDevice.password,
        })
        .then((response) => {
          if (response.data.reply) {
            toast.success("افزوده شد", { position: "bottom-right" });
            setNewDevice({ ...newDevice, active: false });
            get();
          } else {
            toast.warning(response.data.msg, { position: "bottom-right" });
          }
        })
        .catch((error) => {
          var keys = Object.keys(error.response.data.message);
          for (var i = 0; i < keys.length; i++) {
            console.log(keys[i]);
            toast.warning(error.response.data.message[keys[i]], {
              position: "bottom-right",
            });
          }
        });
    }
  };

  const get = () => {
    axios.post(OnRun + "/getconnetion", { id: id }).then((response) => {
      if (response.data.reply) {
        setDevice(response.data.df);
      }
    });
  };

  const columns = [
    {field:'name', headerName:'نام', flex:2, editable: true},
    {field:'ip', headerName:'ip', flex:2, editable: true}, 
    {field:'datetime', headerName:'تاریخ ایجاد', flex:2, editable: true},
    {field:'port', headerName:'پورت', flex:1, editable: true},
    {field:'type', headerName:'نوع', flex:1, editable: true},
    {field:'username', headerName:'نام کاربری', flex:2, editable: true},
    {field:'_id', headerName:'_id', flex:4},
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={()=>del(params.id)}/>,
      ],
    },
  ]

  const del = (_id) => {
    axios
      .post(OnRun + "/delconnection", { id: id, _id: _id })
      .then((response) => {
        if (response.data.reply) {
          toast.success("حذف شد", { position: "bottom-right" });
          get();
        } else {
          toast.warning(response.data.msg, { position: "bottom-right" });
        }
      });
  };

  useEffect(get, []);

  return (
    <div className="panle">
      <ToastContainer autoClose={3000} />

      {device.length == 0 ? 
        <>


        <div className="NoDivce">
          <span>
            <PiWarningDuotone />
          </span>
          <p>هیچ دستگاهی یافت نشد</p>
        </div>
        </>
      : (
        <div className="listDevice">
            <DataGrid 
              rows={device} 
              columns={columns} 
              getRowId={(row) => row._id}
              sx={{width:'100%'}} 
            />
        </div>
      )}
      <Dialog
        maxWidth="xs"
        onClose={() => setNewDevice({ ...newDevice, active: false })}
        open={newDevice.active}
      >
        <DialogTitle textAlign="center">
          دستگاه جدید
          <IconButton
            onClick={() => setNewDevice({ ...newDevice, active: false })}
            sx={{ right: 20, position: "absolute" }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs="12">
              <TextField
                fullWidth
                size="small"
                label="نام دستگاه"
                value={newDevice.name}
                onChange={(e) => {
                  setNewDevice({ ...newDevice, name: e.target.value });
                }}
              ></TextField>
            </Grid>
            <Grid item xs="12">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">نوع</InputLabel>
                <Select
                  size="small"
                  value={newDevice.type}
                  label="نوع"
                  onChange={(e) => {
                    setNewDevice({ ...newDevice, type: e.target.value });
                  }}
                >
                  <MenuItem value={"ip"}>ip</MenuItem>
                  <MenuItem value={"webcam"}>webcam</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {newDevice.type == "ip" ? (
              <>
                <Grid item xs="12">
                  <TextField
                    fullWidth
                    size="small"
                    label="ip address"
                    value={newDevice.ip}
                    onChange={(e) => {
                      setNewDevice({ ...newDevice, ip: e.target.value });
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs="12">
                  <TextField
                    fullWidth
                    size="small"
                    label="port"
                    value={newDevice.port}
                    onChange={(e) => {
                      setNewDevice({ ...newDevice, port: e.target.value });
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs="12">
                  <TextField
                    fullWidth
                    size="small"
                    label="نام کاربری"
                    value={newDevice.user}
                    onChange={(e) => {
                      setNewDevice({ ...newDevice, user: e.target.value });
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs="12">
                  <TextField
                    fullWidth
                    size="small"
                    label="رمزعبور"
                    type="password"
                    value={newDevice.password}
                    onChange={(e) => {
                      setNewDevice({ ...newDevice, password: e.target.value });
                    }}
                  ></TextField>
                </Grid>
              </>
            ) : null}
            <DialogActions
              sx={{
                width: "100%",
              }}
            >
              <Button
                color="primary"
                fullWidth
                variant="contained"
                onClick={submit}
              >
                ثبت
              </Button>
            </DialogActions>
          </Grid>
        </DialogContent>
      </Dialog>
      <SpeedDial
        ariaLabel="SpeedDial basic example" 
        sx={{ position: "absolute", bottom: 16, right: 16 }} 
        icon={<SpeedDialIcon />} 
      >
          <SpeedDialAction
            key={'addconnect'}
            icon={<VideocamIcon />}
            tooltipTitle={'دستگاه جدید'} 
            onClick={() => {
              setNewDevice({ ...newDevice, active: true });
            }}
          />
      </SpeedDial>
    </div>
  );
};

export default Connection;
