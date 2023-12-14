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
} from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CloseRounded } from "@mui/icons-material";
import axios from "axios";
import { OnRun } from "../../config/OnRun";
import { getCookie } from "../cookie/cookie";
import { ToastContainer, toast } from "react-toastify";

const Rulse = () => {
  const id = getCookie("id");

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
    axios
      .post(OnRun + "/setrules", {
        id: id,
        idplate: idplate,
        alpha: alpha,
        serial: serial,
        city: city,
        status: status,
      })
      .then((response) => {
        if (response.data.reply) {
          toast.success("افزوده شد", { position: "bottom-right" });
        } else {
          toast.warning(response.data.msg, { position: "bottom-right" });
        }
      });
  };

  const get = () => {
    axios.post(OnRun + "/getrules", { id: id }).then((response) => {
      console.log(response.data);
    });
  };

  useEffect(get, []);

  return (
    <div className="rules">
      <ToastContainer autoClose={3000} />
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{ marginLeft: 5 }}
        endIcon={<AddBoxIcon />}
        onClick={() => {
          setAddMode(true);
        }}
      >
        افزودن قانون جدید
      </Button>
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
    </div>
  );
};

export default Rulse;
