// import { Immutable, MessageEvent, PanelExtensionContext, Topic } from "@lichtblick/suite";
import { PanelExtensionContext } from "@lichtblick/suite";
import { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function WrenchTeleopPanel({ context }: { context: PanelExtensionContext }): ReactElement {

  const [renderDone, setRenderDone] = useState<(() => void) | undefined>();
  const [surge, setSurge] = useState(0);
  const [yaw, setYaw] = useState(0);

  // We use a layout effect to setup render handling for our panel. We also setup some topic subscriptions.
  useLayoutEffect(() => {
    context.onRender = (_renderState, done) => {
      setRenderDone(() => done);
    };

    context.watch("currentTime");

    context.advertise?.("/cmd_wrench", "geometry_msgs/WrenchStamped");

  }, [context]);

  // invoke the done callback once the render is complete
  useEffect(() => {
    renderDone?.();
  }, [renderDone]);

  const publishWrench = () => {
    const now = Date.now();

    context.publish?.( 
      "/cmd_wrench", 
      {
        header: {
          stamp: {
            sec: Math.floor(now / 1000),
            nsec: (now % 1000) * 1e6,
          },
          frame_id: "base_link"
        },
        wrench: {
          force: { x: surge, y: 0, z: 0 },
          torque: { x: 0, y: 0 , z: yaw},
        },
      }
    );
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Wrench Teleop</h3>
      <label>Surge Force</label>
      <input
        type="range"
        min={-100}
        max={100}
        value={surge}
        onChange={(e) => setSurge(Number(e.target.value))}
        onMouseUp={publishWrench}
      />
      <label>Yaw Torque</label>
      <input
        type="range"
        min={-50}
        max={50}
        value={yaw}
        onChange={(e) => setYaw(Number(e.target.value))}
        onMouseUp={publishWrench}
        />
    </div>
  )
}

export function initWrenchTeleopPanel(context: PanelExtensionContext): () => void {
  const root = createRoot(context.panelElement);
  root.render(<WrenchTeleopPanel context={context} />);

  // Return a function to run when the panel is removed
  return () => {
    root.unmount();
  };
}
