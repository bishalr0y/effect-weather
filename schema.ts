import { Schema } from "effect";

export class Weather extends Schema.Class<Weather>("Weather")({
  name: Schema.String,
  coord: Schema.Struct({
    lon: Schema.Number,
    lat: Schema.Number,
  }),
  weather: Schema.Array(
    Schema.Struct({
      id: Schema.Number,
      main: Schema.String,
      description: Schema.String,
      icon: Schema.String,
    }),
  ),
  main: Schema.Struct({
    temp: Schema.Number,
    feelsLike: Schema.Number,
    tempMin: Schema.Number,
    tempMax: Schema.Number,
    humidity: Schema.Number,
  }),
  wind: Schema.Struct({
    speed: Schema.Number,
    deg: Schema.Number,
  }),
  sys: Schema.Struct({
    sunrise: Schema.Number,
    sunset: Schema.Number,
  }),
}) {}
