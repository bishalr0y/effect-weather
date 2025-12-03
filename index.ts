import { Prompt } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Schema, Config, Redacted } from "effect";
import { FetchHttpClient, HttpClient } from "@effect/platform";
import { Weather } from "./schema";

const getWeather = Effect.fn(function* (location: string) {
  //         ^?
  const apiKey = yield* Config.redacted("OPENWEATHER_API_KEY");

  const response = yield* HttpClient.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Redacted.value(apiKey)}`,
  );

  const json = yield* response.json;
  return yield* Schema.decodeUnknown(Weather)(json);
});

const main = Effect.gen(function* () {
  const input = yield* Prompt.text({ message: "Enter your location: " });
  const weather = yield* getWeather(input);
  yield* Console.log(weather);
});

main.pipe(
  Effect.provide(NodeContext.layer),
  Effect.provide(FetchHttpClient.layer),
  NodeRuntime.runMain,
);
