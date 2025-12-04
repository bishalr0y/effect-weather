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
    feels_like: Schema.Number,
    temp_min: Schema.Number,
    temp_max: Schema.Number,
    humidity: Schema.Number,
    pressure: Schema.Number,
    sea_level: Schema.Number,
    grnd_level: Schema.Number,
  }),
  wind: Schema.Struct({
    speed: Schema.Number,
    deg: Schema.Number,
  }),
  sys: Schema.Struct({
    type: Schema.optional(Schema.Number),
    id: Schema.optional(Schema.Number),
    country: Schema.String,
    sunrise: Schema.Number,
    sunset: Schema.Number,
  }),
}) {}
