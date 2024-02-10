"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useTryOut } from "../src/store";

export function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.gltf");

  const { tryOn } = useTryOut((state) => state);

  let material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(tryOn.texture),
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.092}
        >
          <group
            name="ffcc0b4772624ffaa168c39afccb29c9fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.1}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Game_engine">
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <group name="Object_60" />
                    <group name="Object_62" />
                    <group name="Object_64" />
                    <group name="Object_66" />
                    <group name="Object_68" />
                    <group name="Object_70" />
                    <group name="Object_72" />
                    <group name="Object_74" />
                    <group name="Object_76" />
                    <skinnedMesh
                      name="Object_61"
                      geometry={nodes.Object_61.geometry}
                      material={materials.material}
                      skeleton={nodes.Object_61.skeleton}
                    />
                    <skinnedMesh
                      name="Object_63"
                      geometry={nodes.Object_63.geometry}
                      material={materials.short02}
                      skeleton={nodes.Object_63.skeleton}
                    />
                    <skinnedMesh
                      name="Object_65"
                      geometry={nodes.Object_65.geometry}
                      material={materials["high-poly"]}
                      skeleton={nodes.Object_65.skeleton}
                    />
                    <skinnedMesh
                      name="Object_67"
                      geometry={nodes.Object_67.geometry}
                      material={materials.eyebrow012}
                      skeleton={nodes.Object_67.skeleton}
                    />
                    <skinnedMesh
                      name="Object_69"
                      geometry={nodes.Object_69.geometry}
                      material={materials.eyelashes01}
                      skeleton={nodes.Object_69.skeleton}
                    />
                    <skinnedMesh
                      name="Object_71"
                      geometry={nodes.Object_71.geometry}
                      material={materials.teeth_base}
                      skeleton={nodes.Object_71.skeleton}
                    />
                    <skinnedMesh
                      name="Object_73"
                      geometry={nodes.Object_73.geometry}
                      material={materials.tongue01}
                      skeleton={nodes.Object_73.skeleton}
                    />
                    <skinnedMesh
                      name="Object_75"
                      geometry={nodes.Object_75.geometry}
                      material={material}
                      skeleton={nodes.Object_75.skeleton}
                    />
                    <skinnedMesh
                      name="Object_77"
                      geometry={nodes.Object_77.geometry}
                      material={materials.shoes05}
                      skeleton={nodes.Object_77.skeleton}
                    />
                  </group>
                </group>
                <group name="jjMesh" />
                <group name="short02Mesh" />
                <group name="high-polyMesh" />
                <group name="eyebrow012Mesh" />
                <group name="eyelashes01Mesh" />
                <group name="teeth_baseMesh" />
                <group name="tongue01Mesh" />
                <group name="male_casualsuit06Mesh" />
                <group name="shoes05Mesh" />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
