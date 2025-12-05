import { Prompt } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Schema, Config, Redacted } from "effect";
import { FetchHttpClient, HttpClient } from "@effect/platform";
import { Weather } from "./schema";
import { TaggedError } from "effect/Data";

class ApiFetchError extends TaggedError("ApiFetchError")<{
  message: string;
  status: number;
}> {}

const getWeather = (location: string) =>
  Effect.gen(function* () {
    const apiKey = yield* Config.redacted("OPENWEATHER_API_KEY");
    const response = yield* HttpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Redacted.value(apiKey)}&units=metric`,
    );

    if (response.status < 200 || response.status > 300) {
      const body = yield* response.text.pipe(
        Effect.catchAll(() => Effect.succeed("unreadable body")),
      );

      return yield* new ApiFetchError({
        message: body,
        status: response.status,
      });
    }
    const json = yield* response.json;
    return yield* Schema.decodeUnknown(Weather)(json);
  });

const program = Effect.gen(function* () {
  const input = yield* Prompt.text({ message: "Enter your location: " });
  const weather = yield* getWeather(input);
  yield* Console.log(`
  Location: ${weather.name}
  Temperature: ${weather.main.temp}
  Max Temperature: ${weather.main.temp_max} 
  Min Temperature: ${weather.main.temp_min}
  Humidity: ${weather.main.humidity}
  Pressure: ${weather.main.pressure}
  Wind Speed: ${weather.wind.speed}
  Wind Degree: ${weather.wind.deg}
`);
}).pipe(Effect.catchAll((error) => Console.log(`Error: ${error}`)));

program.pipe(
  Effect.provide(NodeContext.layer),
  Effect.provide(FetchHttpClient.layer),
  NodeRuntime.runMain,
);
