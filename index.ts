import { Command, Prompt } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect } from "effect";

const command = Command.make("weather", {}, () =>
  Effect.gen(function* () {
    const location = yield* Prompt.text({ message: "Enter your location: " });
    Console.log(location);
  }),
);

const cli = Command.run(command, {
  name: "effect-weather",
  version: "v0.0.1",
});

cli(process.argv).pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
