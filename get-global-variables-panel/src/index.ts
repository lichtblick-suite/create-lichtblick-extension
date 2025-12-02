import { ExtensionContext } from "@lichtblick/suite";

import { initExamplePanel } from "./ExamplePanel";
import { LocationFix } from "@foxglove/schemas";

type MouseEvent = {
  clientX: number;
  clientY: number;
};

export function activate(extensionContext: ExtensionContext): void {
  extensionContext.registerPanel({ name: "get-global-variables", initPanel: initExamplePanel });

  extensionContext.registerMessageConverter({
    fromSchemaName: "MouseEvent",
    toSchemaName: "foxglove.LocationFix",
    converter: (msg: MouseEvent, _event, globalVariables): Partial<LocationFix> => {
      let multiplier = 1;
      console.log("Global Variables in converter:", globalVariables);
      if (globalVariables) {
        if (globalVariables.lastMouseEvent === "aboveThreshold") {
          multiplier = 2;
        } else {
          multiplier = 1;
        }
      }
      return {
        latitude: (msg.clientX / 1000) * multiplier,
        longitude: (msg.clientY / 1000) * multiplier,
      };
    },
  });
}
