"use client";

import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Center,
  Environment,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";

import { Model } from "../../public/Scene.jsx";
import { useTryOut } from "../store";

export function TryOn3D() {
  const { tryOn } = useTryOut((state) => state);

  return (
    <>
      <section className="text-right absolute p-3 top-0 right-0 z-[999]">
        <h1 className="font-mono ">
          You are currently Trying out
        </h1>
        <h1 className="text-3xl font-mono font-bold">{tryOn.name}</h1>
        <h1 className="text-sm font-mono font-thin">{tryOn.brand}</h1>
      </section>
      <Canvas
        gl={{ antialias: false, preserveDrawingBuffer: true }}
        shadows
        style={{ position: "absolute" }}
        camera={{ position: [3, 2, 5], fov: 50 }}
      >
        <group position={[0, -0.75, 0]}>
          <Center top>
            <Model />
          </Center>
          <AccumulativeShadows>
            <RandomizedLight position={[2, 5, 5]} />
          </AccumulativeShadows>
        </group>
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <Environment preset="dawn" background blur={1} />
      </Canvas>
    </>
  );
}
