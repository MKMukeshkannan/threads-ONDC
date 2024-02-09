"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stage,
  useGLTF,
} from "@react-three/drei";

function Model(props: any) {
  const { scene } = useGLTF("/man-standing.glb");
  return <primitive object={scene} {...props} />;
}

export function TryOn3D() {
  return (
    <Canvas
      style={{ "position": "absolute" }}
      shadows
    >
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <Stage environment={"sunset"}>
        <Model />
      </Stage>
    </Canvas>
  );
}
