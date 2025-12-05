import { Prompt } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Schema, Config, Redacted } from "effect";
import { FetchHttpClient, HttpClient } from "@effect/platform";
import { Weather } from "./schema";

const getWeather = (location: string) =>
  Effect.gen(function* () {
    const apiKey = yield* Config.redacted("OPENWEATHER_API_KEY");
    const response = yield* HttpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Redacted.value(apiKey)}`,
    );
    if (response.status < 200 || response.status > 300) {
      yield* Effect.fail(`Request failed: ${response.status}`);
    }
    const json = yield* response.json;
    return yield* Schema.decodeUnknown(Weather)(json);
  });

const program = Effect.gen(function* () {
  const input = yield* Prompt.text({ message: "Enter your location: " });
  const weather = yield* getWeather(input);
  yield* Console.log(weather);
}).pipe(Effect.catchAll((error) => Console.log(`Error: ${error}`)));

program.pipe(
  Effect.provide(NodeContext.layer),
  Effect.provide(FetchHttpClient.layer),
  NodeRuntime.runMain,
);
