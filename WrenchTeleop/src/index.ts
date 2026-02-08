import { ExtensionContext } from "@lichtblick/suite";

// import { initExamplePanel } from "./ExamplePanel";
import { initWrenchTeleopPanel } from "./WrenchTeleopPanel"

export function activate(extensionContext: ExtensionContext): void {
  // extensionContext.registerPanel({ name: "example-panel", initPanel: initExamplePanel });
  extensionContext.registerPanel({ 
    // id: "wrench-teleop",
    name: "Wrench Teleop", 
    initPanel: initWrenchTeleopPanel})
}
