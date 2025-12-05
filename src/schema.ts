import { Schema } from "effect";

export class Weather extends Schema.Class<Weather>("Weather")({
  name: Schema.String,
  coord: Schema.Struct({
    lon: Schema.Number,
    lat: Schema.Number,
  }),
  weather: Schema.NonEmptyArrayEnsure(
    Schema.Struct({
      main: Schema.String,
      description: Schema.String,
    }),
  ),
  main: Schema.Struct({
    temp: Schema.Number,
    feels_like: Schema.Number,
    temp_min: Schema.Number,
    temp_max: Schema.Number,
    humidity: Schema.Number,
    pressure: Schema.Number,
  }),
  wind: Schema.Struct({
    speed: Schema.Number,
    deg: Schema.Number,
  }),
  sys: Schema.Struct({
    country: Schema.String,
  }),
}) {}
