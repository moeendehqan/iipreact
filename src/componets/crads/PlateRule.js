import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";
import Platelincese from "./Platelincese";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material'
import axios from "axios";
import { OnRun } from "../../config/OnRun";
const CardPlateRules = (props) => {

  const del = () =>{
    axios.post(OnRun+'/delrules',{id:props.idCreator, _id:props._id})
    .then(response=>{
      console.log(response.data)
    })
  }




  return (
    <Card sx={{ maxWidth: 245, margin: 1 }}>
      <CardActionArea>
        <CardMedia height="140">
          <Platelincese
            id={props.id}
            alpha={props.alpha}
            serial={props.serial}
            city={props.city}
          />
        </CardMedia>
        <CardContent>
          {props.status ? <MeetingRoomIcon /> : <NoMeetingRoomIcon />}
          <Typography gutterBottom variant="h6" component="div">
            {props.datetime}
          </Typography>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ width:210 }}
            endIcon={<DeleteIcon />}
            onClick={del}
          >
            حذف
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardPlateRules;
