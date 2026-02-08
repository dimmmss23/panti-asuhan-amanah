"use client";

import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
    interface ThreeElements {
        threeGlobe: ThreeElements["mesh"] & {
            new(): ThreeGlobe;
        };
    }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
};

export type GlobeConfig = {
    pointSize?: number;
    globeColor?: string;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    emissive?: string;
    emissiveIntensity?: number;
    shininess?: number;
    polygonColor?: string;
    ambientLight?: string;
    directionalLeftLight?: string;
    directionalTopLight?: string;
    pointLight?: string;
    arcTime?: number;
    arcLength?: number;
    rings?: number;
    maxRings?: number;
    initialPosition?: {
        lat: number;
        lng: number;
    };
    autoRotate?: boolean;
    autoRotateSpeed?: number;
};

interface WorldProps {
    globeConfig: GlobeConfig;
    data: Position[];
}

// Helper function to convert lat/lng to rotation
function latLngToRotation(lat: number, lng: number) {
    // Convert degrees to radians
    const latRad = lat * (Math.PI / 180);
    const lngRad = lng * (Math.PI / 180);

    // Calculate globe rotation to center on the point
    // Rotate Y axis based on longitude (with offset to face camera)
    const rotationY = -lngRad - Math.PI / 2;
    // Tilt based on latitude - negative offset to tilt globe backward
    // This brings equatorial/southern locations (like Indonesia) more to the center view
    const rotationX = -0.6; // Tilt globe backward to show Indonesia in center

    return { rotationX, rotationY };
}

export function Globe({ globeConfig, data }: WorldProps) {
    const globeRef = useRef<ThreeGlobe | null>(null);
    const groupRef = useRef<any>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const defaultProps = {
        pointSize: 1,
        atmosphereColor: "#ffffff",
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(255,255,255,0.7)",
        globeColor: "#1d072e",
        emissive: "#000000",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        ...globeConfig,
    };

    // Set initial rotation to show Palembang
    useEffect(() => {
        if (!globeRef.current && groupRef.current) {
            globeRef.current = new ThreeGlobe();
            (groupRef.current as any).add(globeRef.current);

            // Set initial rotation to center on Palembang
            if (globeConfig.initialPosition) {
                const { rotationX, rotationY } = latLngToRotation(
                    globeConfig.initialPosition.lat,
                    globeConfig.initialPosition.lng
                );
                groupRef.current.rotation.y = rotationY;
                groupRef.current.rotation.x = rotationX;
            }

            setIsInitialized(true);
        }
    }, [globeConfig.initialPosition]);

    useEffect(() => {
        if (!globeRef.current || !isInitialized) return;

        const globeMaterial = globeRef.current.globeMaterial() as unknown as {
            color: Color;
            emissive: Color;
            emissiveIntensity: number;
            shininess: number;
        };
        globeMaterial.color = new Color(globeConfig.globeColor);
        globeMaterial.emissive = new Color(globeConfig.emissive);
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
        globeMaterial.shininess = globeConfig.shininess || 0.9;
    }, [
        isInitialized,
        globeConfig.globeColor,
        globeConfig.emissive,
        globeConfig.emissiveIntensity,
        globeConfig.shininess,
    ]);

    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const filteredPoints = [
            {
                lat: -2.9909,
                lng: 104.7567,
                size: defaultProps.pointSize,
                color: "#ef4444",
                order: 1,
            },
        ];

        // Create floating arcs from Palembang to various locations
        const floatingArcs = [
            { startLat: -2.9909, startLng: 104.7567, endLat: 10, endLng: 120, arcAlt: 0.3, color: "#ef4444", order: 1 },
            { startLat: -2.9909, startLng: 104.7567, endLat: -10, endLng: 130, arcAlt: 0.25, color: "#dc2626", order: 2 },
            { startLat: -2.9909, startLng: 104.7567, endLat: 5, endLng: 95, arcAlt: 0.35, color: "#f87171", order: 3 },
            { startLat: -2.9909, startLng: 104.7567, endLat: -15, endLng: 110, arcAlt: 0.28, color: "#ef4444", order: 4 },
            { startLat: -2.9909, startLng: 104.7567, endLat: 15, endLng: 115, arcAlt: 0.32, color: "#dc2626", order: 5 },
        ];

        globeRef.current
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .showAtmosphere(defaultProps.showAtmosphere)
            .atmosphereColor(defaultProps.atmosphereColor)
            .atmosphereAltitude(defaultProps.atmosphereAltitude)
            .hexPolygonColor(() => defaultProps.polygonColor);

        globeRef.current
            .arcsData(floatingArcs)
            .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
            .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
            .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
            .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
            .arcColor((e: unknown) => (e as { color: string }).color)
            .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
            .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
            .arcDashLength(defaultProps.arcLength)
            .arcDashInitialGap((e) => (e as { order: number }).order * 1)
            .arcDashGap(15)
            .arcDashAnimateTime(() => defaultProps.arcTime);

        globeRef.current
            .pointsData([])
            .pointColor((e) => (e as { color: string }).color)
            .pointsMerge(true)
            .pointAltitude(0.07)
            .pointRadius(2.5);

        globeRef.current
            .ringsData([])
            .ringColor(() => "#ef4444")
            .ringMaxRadius(defaultProps.maxRings)
            .ringPropagationSpeed(RING_PROPAGATION_SPEED)
            .ringRepeatPeriod(
                (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
            );
    }, [
        isInitialized,
        data,
        defaultProps.pointSize,
        defaultProps.showAtmosphere,
        defaultProps.atmosphereColor,
        defaultProps.atmosphereAltitude,
        defaultProps.polygonColor,
        defaultProps.arcLength,
        defaultProps.arcTime,
        defaultProps.rings,
        defaultProps.maxRings,
    ]);

    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const interval = setInterval(() => {
            if (!globeRef.current) return;

            const ringsData = [
                {
                    lat: -2.9909,
                    lng: 104.7567,
                    color: "#22c55e",
                },
            ];

            globeRef.current.ringsData(ringsData);
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [isInitialized, data]);

    // Auto rotate the globe while keeping location visible
    useFrame(() => {
        if (groupRef.current && globeConfig.autoRotate) {
            const speed = globeConfig.autoRotateSpeed || 0.5;
            groupRef.current.rotation.y += speed * 0.010;
        }
    });

    return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
    const { gl, size } = useThree();

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(size.width, size.height);
        gl.setClearColor(0xffaaff, 0);
    }, [gl, size]);

    return null;
}

export default function GlobeViz(props: WorldProps) {
    const { globeConfig } = props;
    const scene = new Scene();
    scene.fog = new Fog(0xffffff, 400, 2000);

    // Detect mobile
    const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(window.navigator.userAgent);

    return (
        <Canvas
            scene={scene}
            camera={new PerspectiveCamera(50, aspect, 180, 1800)}
        >
            <WebGLRendererConfig />
            <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
            <directionalLight
                color={globeConfig.directionalLeftLight}
                position={new Vector3(-400, 100, 400)}
            />
            <directionalLight
                color={globeConfig.directionalTopLight}
                position={new Vector3(-200, 500, 200)}
            />
            <pointLight
                color={globeConfig.pointLight}
                position={new Vector3(-200, 500, 200)}
                intensity={0.8}
            />
            <Globe {...props} />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                minDistance={cameraZ}
                maxDistance={cameraZ}
                autoRotateSpeed={0}
                autoRotate={false}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI - Math.PI / 3}
            />
        </Canvas>
    );
}
