import { ReactEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import fetchGraphQL from "../graphql/GraphQL";
import * as React from 'react';
import { Mission } from "../graphql/schema";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Grid,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Toolbar,
  Container,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
  Divider,
  FormControl,
} from "@mui/material";

import {
  Add as AddIcon,
  FilterAlt as FilterAltIcon,
  Sort as SortIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Label,
} from "@mui/icons-material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ListMenu } from "../components/ListMenu";
import { ObjectFlags } from "typescript";

type SortField = "Title" | "Date" | "Operator";

interface MissionsResponse {
  data: {
    Missions: Mission[];
  };
}

const getMissions = async (
  sortField: SortField,
  sortDesc?: Boolean
): Promise<MissionsResponse> => {
  return await fetchGraphQL(
    `
  {
    Missions(
      sort: {
        field: ${sortField}
        desc: ${sortDesc}

      }
    ) {
      id
      title
      operator
      launch {
        date
      }
    }
  }
  `,
    []
  );
};


const postNewMissions = async (values: Mission | null): Promise<MissionsResponse> => {
  const missionsArr: Mission[] = [];
  if (values) { missionsArr.push(values) }
  return await fetchGraphQL(
    `
  {
    Missions()
     {
      id
      title
      operator
      launch {
        date
        vehicle
        location
        {
          name
          longitude
          Latitude
        }
        orbit{
          periapsis
          apoapsis
          inclination
        }
        Payload
        {
          capacity
          available
        }
      }
    }
  }
  `,
    // missionsArr
    [values]
  );
};

const Missions = (): JSX.Element => {
  const [missions, setMissions] = useState<Mission[] | null>(null);
  const [newMissionOpen, setNewMissionOpen] = useState(false);
  const [newMission, setNewMission] = useState<Mission| null>(null);
  const [tempLaunchDate, setTempLaunchDate] = useState<Date | null>(null);
  const [sortDesc, setSortDesc] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortField>("Title");
  const [errMessage, setErrMessage] = useState<String | null>(null);
  // const [name, setName] = React.useState('Cat in the Hat');

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  //   alert(name);
  // };
  const handleErrClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrMessage(null);
  };

  const handleNewMissionOpen = () => {
    setTempLaunchDate(null);
    setNewMissionOpen(true);
    
  };

  const handleNewMissionClose = () => {
    setNewMissionOpen(false);
  };
  const handleTextFieldChange = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const{name,value}=event.target;
    setNewMission({
      id: "212328702",
      title: 'chani',
      operator: 'String',
      launch: {
        date: new Date(),
        vehicle: 'String',
        location: {
          name: 'String',
          longitude: 0,
          Latitude: 0
        },
      },
      orbit: {
        periapsis: 0,
        apoapsis: 0,
        inclination: 0
      },
      payload: {
        capacity: 0,
        available: 0
      }
    });
  };

  const handleTempLaunchDateChange = (newValue: Date | null) => {
    setTempLaunchDate(newValue);
  };

  const handleSortFieldChange = (event: SyntheticEvent, value: SortField) => {
    setSortField(value);
  };
  const handleSortDescClick = () => {
    setSortDesc(!sortDesc);
  };
  const hundleNewMission = () => {
    // newMissions.push(newMission);
    // var a = document.getElementsByClassName('id*');
      setNewMission({
        id: "212328702",
        title: 'duparc',
        operator: 'String',
        launch: {
          date: new Date(),
          vehicle: 'String',
          location: {
            name: 'String',
            longitude: 0,
            Latitude: 0
          },
        },
        orbit: {
          periapsis: 0,
          apoapsis: 0,
          inclination: 0
        },
        payload: {
          capacity: 1,
          available:1
        }
      })
      // alert(newMission?.id)
      debugger

    // setNewMission(a);
    postNewMissions(newMission).then(() => { console.log("המשימה נשלחה לשמירה") })

    handleNewMissionClose();

  };

  useEffect(() => {
    getMissions(sortField, sortDesc)
      .then((result: MissionsResponse) => {
        setMissions(result.data.Missions);
      })
      .catch((err) => {
        setErrMessage("Failed to load missions.");
        console.log(err);
      });
       }, [sortField, sortDesc]);

  return (
    <AppLayout title="Missions">
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1">
          Solar Rocket Missions
        </Typography>

        <Toolbar disableGutters>
          <Grid justifyContent="flex-end" container>
            <IconButton>
              <FilterAltIcon />
            </IconButton>
            <ListMenu
              options={["Date", "Title", "Operator"]}
              endIcon={<SortIcon />}
              onSelectionChange={handleSortFieldChange}

            />
            <IconButton onClick={handleSortDescClick}>
              {sortDesc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            </IconButton>
          </Grid>
        </Toolbar>

        {missions ? (
          <Grid container spacing={2}>
            {" "}
            {missions.map((missions: Mission, key: number) => (
              <Grid item key={key}>
                <Card sx={{ width: 275, height: 200 }}>
                  <CardHeader
                    title={missions.title}
                    subheader={new Date(missions.launch.date).toDateString()}
                  />
                  <CardContent>
                    <Typography noWrap>{missions.operator}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button>Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}

        <Tooltip title="New Mission">
          <Fab
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            color="primary"
            aria-label="add"
            onClick={handleNewMissionOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Dialog
          open={newMissionOpen}
          onClose={handleNewMissionClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>New Mission</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={2}>

              <Grid item>
                <TextField
                focused
                  autoFocus
                  id="id1"
                  label="id"
                  variant="standard"
                  fullWidth
                  // on={handleChange}
                // onChange={(event)=>{newMission?.id==event.target.value;setNewMission(newMission)}}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  id="id2"
                  label="title"
                  variant="standard"
                  fullWidth
                // onChange={(event)=>{newMission?.title==event.target.value;setNewMission(newMission)}}
                />
               
              </Grid>
              
              <Grid item>
                <TextField
                  autoFocus
                  id="id3"
                  label="operator"
                  variant="standard"
                  fullWidth
                // onChange={(event)=>{newMission?.operator==event.target.value;setNewMission(newMission)}}
                />
              </Grid>
            </Grid>
            <br></br>
            <h3>lunch</h3>
            <Grid container direction="column" spacing={2}>
              {/* <Label>lunch</Label> */}
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    minDate={new Date()}
                    minTime={new Date()}
                    label="Launch Date"
                    value={tempLaunchDate}
                    onChange={handleTempLaunchDateChange}
                    renderInput={(params) => (
                      <TextField variant="standard" {...params}
                      // onChange={(event)=>{newMission?.launch.date.toString()==event.target.value;setNewMission(newMission)}}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  id="vehicle"
                  label="vehicle"
                  variant="standard"
                  fullWidth
                // onChange={(event)=>{newMission?.launch.vehicle==event.target.value;setNewMission(newMission)}}
                />
              </Grid></Grid>
            <br></br>
            <h3>Locatin</h3>
            <Grid container direction="column" spacing={2} >
              {/* <Label> Locatin</Label> */}

              <Grid item>
                <TextField
                  autoFocus
                  id="loc"
                  label="location name"
                  variant="standard"
                  fullWidth
                // onChange={(event)=>{newMission?.launch.location.name==event.target.value;setNewMission(newMission)}}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  id="Lati"
                  label="Latitude"
                  variant="standard"
                  fullWidth
                  type={"number"}
                // onChange={(event)=>{newMission?.launch.location.Latitude.toString()==event.target.value;setNewMission(newMission)}}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  id="longi"
                  label="longitude"
                  variant="standard"
                  fullWidth
                  type={"number"}
                // onChange={(event)=>{newMission?.launch.location.longitude.toString()==event.target.value;setNewMission(newMission)}}
                />
              </Grid>
            </Grid>
            <br></br>
            <h3>orbit</h3>
            <Grid container direction="column" spacing={2} >
              {/* <Label>orbit</Label> */}

              <Grid item>
                <TextField
                  autoFocus
                  id="peria"
                  label="periapsis"
                  variant="standard"
                  fullWidth
                  type={"number"}
                // onChange={(event)=>{newMission?.orbit.periapsis.toString()==event.target.value;setNewMission(newMission)}}

                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  id="apoa"
                  label="apoapsis"
                  variant="standard"
                  fullWidth
                  type={"number"}
                // onChange={(event)=>{newMission?.orbit.apoapsis.toString()==event.target.value;setNewMission(newMission)}}

                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  id="inclin"
                  label="inclination"
                  variant="standard"
                  fullWidth
                  type={"number"}
                // onChange={(event)=>{newMission?.orbit.inclination.toString()==event.target.value;setNewMission(newMission)}}

                />
              </Grid>
            </Grid>
            <br></br>
            <h3>payload</h3>
            <Grid container direction="column" spacing={2} >
              {/* <Label>payload</Label> */}

              <Box></Box>
              <Grid item>
                <TextField
                  autoFocus
                  id="capacity"
                  label="capacity"
                  variant="standard"
                  fullWidth
                  type={"number"}
                // onChange={(event)=>{newMission?.payload.capacity.toString()==event.target.value;setNewMission(newMission)}}

                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  id="available"
                  label="available"
                  variant="standard"
                  type={"number"}
                  fullWidth
                // onChange={(event)=>{newMission?.payload.available.toString()==event.target.value;setNewMission(newMission)}}

                />
              </Grid>


            </Grid>
            <br></br>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewMissionClose}>Cancel</Button>
            <Button onClick={hundleNewMission}>Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Snackbar
        open={errMessage != null}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleErrClose}
      >
        <Alert onClose={handleErrClose} variant="filled" severity="error">
          {errMessage}
        </Alert>
      </Snackbar>
    </AppLayout>
  );
};

export { Missions };


