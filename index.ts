import { Prompt } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect } from "effect";

const main = Effect.gen(function* () {
  while (true) {
    const input = yield* Prompt.text({ message: "Enter your location: " });
    Console.log(input);
  }
});

main.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
