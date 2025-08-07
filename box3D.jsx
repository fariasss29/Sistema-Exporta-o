/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Box3D({ width = 1, height = 1, depth = 1 }) {
    const mesh = useRef();

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.x += 0.01
            mesh.current.rotation.y += 0.01
        }
    })

    return (
        <group ref={mesh}>
            {/* A caixa principal, agora na cor preta */}
            <mesh>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial color="lightgray" />
            </mesh>
        </group>
    );
}
