export type Mission = {
  id: String;
  title: String;
  operator: String;
  launch: Launch;
  orbit: Orbit;
  payload: Payload;
}

export type Launch = {
  date: Date;
  vehicle: String;
  location: Location;
}

export type Location = {
  name: String;
  longitude: Number;
  Latitude: Number;
}

export type Orbit = {
  periapsis: Number;
  apoapsis: Number;
  inclination: Number;
}

export type Payload = {
  capacity: Number;
  available: Number;
}
export type DeliveriesType = {
   date: Date,
  deliveries:  Delivery []
}

export type Delivery = {
  type: string,
  quantity: number,
  unit: string,
  icon: string
}
export type Dd = {
  deliveryDates:Date[]
}
