import { Http, Label } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, colors, Container, Grid, LinearProgress, Toolbar, Typography } from "@mui/material";
import { get } from "http";
import { userInfo } from "os";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {  Dd, DeliveriesType, Delivery } from "../graphql/schema";
import { AppLayout } from "../layouts/AppLayout";
import { useFormControl } from '@mui/material/FormControl';
import { color } from "@mui/system";

// type jkjkj = "Title" | "Date" | "Operator" ;
// interface DeliveriesResponse {
//   data: {
//     // Deliveries: Delivery[];
//   } 
// }

const FuelDeliveries = (): JSX.Element => {

  const getCurrentDate=(separator='')=>{
    
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }
  const fake=()=>{
    alert("It's just a fake");
  }
  //להעביר בפרופס לא עובד משום מה ..(date?:string,days?:Number)
  let today=getCurrentDate('-');
  // let days=7;
  const [deliveries, setDeliveries] = useState<DeliveriesType[]>([]);
  const [deliveriesDate, setDeliveriesDate] = useState<Dd | null>(null);
  const [d, setD] = useState<DeliveriesType | null>(null);
      
  const headers = {
    'Accept':'application/json',
    'UserID':'chani22084@gmail.com',
    'ApiKey':'683d16099b7e53d0bfbfd76488d3d5d9b56e798e63021b312de2b4690b8a939b'
  };

  const getdeliveriesOnDate=async(date:string)=>{
    // ${date1.getFullYear()}
    // debugger
       await fetch(`https://solar-rocket-fuel.benmanage.click/deliveries?startDate=2023-09-01&numberOfDays=4`,
    {
      method: 'GET',
      headers: headers
    })
    .then(function(res)
     {return res.json();  })    
       .then(function(body) {
        setDeliveriesDate(body)
        alert(body+" :setDeliveriesDate");
         }).catch((err)=>{console.log(err)});
       
  }
  const getd=()=>{
    // ${date1.getFullYear()}
        fetch(`https://solar-rocket-fuel.benmanage.click/delivery/2023-05-05`,
    {
      method: 'GET',
      headers: headers
    })
    .then(function(res)
     {return res.json();  })    
       .then(function(body:DeliveriesType) {
        console.log(body);
        setD(body)
     //   alert("d: "+d);
     }).catch((err)=>{console.log(err)});
  }



  useEffect(() => {
    // ${date}
  async function fetchData(){
   let response= await getdeliveriesOnDate(today);
  }
  async function fetchMe(index:number){
     let rrr=await fetch(`https://solar-rocket-fuel.benmanage.click/delivery/${deliveriesDate?.deliveryDates[index]}`,
    // let rrr= fetch(`https://solar-rocket-fuel.benmanage.click/delivery/2023-05-05`,
    {
      method: 'GET',
      headers: headers
    }).then(function(res) {
       return res.json();
      }).then(function(body) {
        deliveries.push(body);
       setDeliveries([...deliveries]);
    }).catch((err)=>{console.log(err+"😫😥")});
    
  }
  fetchData() ;

    if(deliveriesDate)  
    {
      for (let index = 0; index < deliveriesDate?.deliveryDates.length; index++)
       {
        fetchMe(index);
        // debugger
       // alert( deliveriesDate?.deliveryDates[index])
     
  }
  // debugger
  }
  else
  alert("deliveriesDate is null");
    // fetch('https://solar-rocket-fuel.benmanage.click/delivery/2023-05-05',
    // {
    //   method: 'GET',
    
    //   headers: headers
    // }).then(function(res) {
    //    return res.json();
    //   }).then(function(body) {
    //    setDeliveries(body);
    // }).catch((err)=>{console.log(err+"😫😥")});
  

    //send do the function that gets date-start & num-days
  
    getd();
  
  
  }, []);

   let len=deliveriesDate?.deliveryDates.length;


  return (
    <AppLayout title="Fuel Deliveries">
      {/* <Label> {deliveries[0]}?<h2>לא הצליח לשלוף נתונים</h2>:<h2>yessss</h2>;</Label> */}
      <Container> 

{deliveries ? (
  <Grid container spacing={2} >
    {" "}
    {deliveries.map((del: DeliveriesType, index: number) => (
      <Grid item key={index}  >
        <label>{new Date(del.date).toDateString()}</label>
        <Card sx={{ width: 225,height: 400-700}}>
          <CardHeader
            title={index+1}
          //  subheader={}
          />
           <CardContent>
          
            {del.deliveries.map((dels:Delivery,i:number)=>(
              <>
               <Card color="primary" key={i} >
               <CardHeader
            // title=
           subheader={(i+1).toString()}
          />
           

              <Grid container >
           <Typography>type: {dels.type}</Typography>
           <Typography>quantity: {dels.quantity}</Typography>
           <Typography>unit:: {dels.unit}</Typography>
           {/* <Typography> {dels.icon}</Typography> */}
           <Typography>{"let's dream about nice icon... 😇"}</Typography>
           
           </Grid>
             </Card>
             <br></br>
             </>
           ) ,( <Box sx={{ textAlign: "center" }}>
           <LinearProgress />
         </Box>))
      
}

           </CardContent> 

          <CardActions>
            <Button onClick={()=>{fake()}}>Edit</Button>
           </CardActions>
           
        </Card>
        <br></br>
    </Grid>
))}
  </Grid>
) 
: (

  <Container> 
<h1>Fuel Deliveries data:</h1>

{d ? (
  <Grid container spacing={2}>
    {" "}
    {d.deliveries.map((del: Delivery, index: number) => (
      <Grid item key={index}>
        <label>{new Date(d.date).toDateString()}</label>
        <Card sx={{ width: 225, height: 250 }}>
          <CardHeader
           title={index+1}
          //  subheader={}
          />
           <CardContent>
            <Grid>
              <Typography>type: {del.type}</Typography>
              <Typography>unit: {del.unit}</Typography>
              <Typography>quantity: {del.quantity}</Typography>
              {/* <Typography>{del.icon}</Typography> */}
              <Typography>{"let's dream about nice image..."}</Typography>
            </Grid>
           </CardContent> 
          <CardActions>
            <Button onClick={()=>{fake()}}>Edit</Button>
           </CardActions>
        </Card>
      </Grid>
))}
  </Grid>
) 
: (
  <Box sx={{ textAlign: "center" }}>
    <CircularProgress />
  </Box>
)
} 
 </Container> 

)
} 
 </Container> 
<h3>upcoming fuel deliveries:</h3>
<Container>
{deliveriesDate? (
    <Grid container spacing={2}>
    {" "}
{deliveriesDate?.deliveryDates.map((del: Date, index: number) => (
      <Grid item key={index}>
        <Card sx={{ width: 225, height: 85,color: "black", backgroundColor:"pink"}}>
          <CardHeader
           title={new Date(del).toDateString()}
          //  subheader={}
          />
           <CardContent>
           {/* <image > {del.icon}</image> */}
           </CardContent> 
          
          <CardActions>
            <Button onClick={()=>{fake()}}>Edit</Button>
           </CardActions>
        </Card>
      </Grid>
))}
  </Grid>
  
) 
: (
  <Box sx={{ textAlign: "center",color:"purple  " }}>
    <CircularProgress />
  </Box>
)
} 
  </Container> 


 {/* <Container>
  {d?(
  <Card><CardHeader title={"משלוח"}/>
           <CardContent>
           <Typography></Typography>
           <div>{d.deliveryDates[0].toString()}</div>
          </CardContent> 
      </Card>
     ) :( <Box sx={{  color:"purple"}}>
     <CircularProgress />
   </Box>)}
 </Container> */}
    </AppLayout>
  );
    };


export { FuelDeliveries as FuelDeliveries };
