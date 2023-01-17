import { Container } from "@mui/material";
import { useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import {  } from "../graphql/schema";

// type jkjkj = "Title" | "Date" | "Operator" ;
// interface DeliveriesResponse {
//   data: {
//     // Deliveries: Delivery[];
//   } 
// }

const FuelDeliveries = (): JSX.Element => {

  const [deliveries, setdeliveries] = useState< any| null>(null);

  return (
    <AppLayout title="Fuel Deliveries">
      <Container maxWidth="lg">
        {/* <div>Fuel Deliveries!</div> */}
        <div>
        The fuel deliveries page currently has no content.
         We need to show the details of upcoming fuel deliveries on this page.
         Use the <h3> Solar Rocket Fuel Deliveries API</h3> to pull the fuel delivery data. Make it look pretty.
        </div>
        
      </Container>
    </AppLayout>
  );
};

export { FuelDeliveries as FuelDeliveries };
