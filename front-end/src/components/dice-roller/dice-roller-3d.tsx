"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Physics, usePlane, useBox } from "@react-three/cannon"
import { OrbitControls, Environment, Text } from "@react-three/drei"
import type { DiceType } from "./dice-roller-app"

interface DiceRoller3DProps {
  diceType: DiceType
  count: number
  rolling: boolean
  onRollComplete?: (results: number[]) => void
}

export function DiceRoller3D({ diceType, count, rolling, onRollComplete }: DiceRoller3DProps) {
  const [results, setResults] = useState<number[]>([])
  const [key, setKey] = useState(1)
  const previousRollingRef = useRef(false)
  
  // Detecta quando o rolling muda de true para false
  useEffect(() => {
    // Se estava rolando e agora parou
    if (previousRollingRef.current && !rolling) {
      // Notifica o componente pai com os resultados
      if (onRollComplete && results.length > 0) {
        onRollComplete(results);
      }
    }
    
    // Se começou a rolar
    if (!previousRollingRef.current && rolling) {
      // Limpa os resultados anteriores
      setResults([]);
      // Força recriação do Canvas com nova chave
      setKey(prev => prev + 1);
    }
    
    // Atualiza a referência
    previousRollingRef.current = rolling;
  }, [rolling, results, onRollComplete]);

  // Gerenciador de resultados
  const handleDieResult = useCallback((index: number, value: number) => {
    setResults(prev => {
      const newResults = [...prev];
      newResults[index] = value;
      return newResults;
    });
  }, []);

  return (
    <div className="w-full h-full" key={key}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

        <Physics
          gravity={[0, -25, 0]}
          defaultContactMaterial={{ restitution: 0.4 }}
          // Aumentar steps para simulação mais estável
          iterations={10}
          size={10}
          allowSleep={true}
        >
          <group position={[0, 0, 0]}>
            <Floor rotation={[-Math.PI / 2, 0, 0]} />
            <Wall position={[0, 0, -5]} rotation={[0, 0, 0]} />
            <Wall position={[0, 0, 5]} rotation={[0, Math.PI, 0]} />
            <Wall position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <Wall position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

            {rolling &&
              Array.from({ length: count }).map((_, i) => (
                <Die
                  key={`die-${i}-${diceType}`}
                  diceType={diceType}
                  index={i}
                  position={[
                    (Math.random() * 2 - 1) * (i % 3),
                    5 + i * 0.5,
                    (Math.random() * 2 - 1) * Math.floor(i / 3)
                  ]}
                  onRest={(value) => handleDieResult(i, value)}
                />
              ))}
          </group>
        </Physics>

        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="sunset" />

        {!rolling && results.length > 0 && (
          <Text position={[0, 2, 0]} fontSize={1.5} color="#e2c08d" font="/fonts/Geist_Bold.json" textAlign="center">
            {results.join(" + ")}
          </Text>
        )}
      </Canvas>
    </div>
  )
}

function Floor(props: any) {
  const [ref] = usePlane(() => ({ 
    ...props, 
    type: "static",
    material: { friction: 0.2 }
  }))
  
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#222230" />
    </mesh>
  )
}

function Wall(props: any) {
  const [ref] = usePlane(() => ({ 
    ...props, 
    type: "static",
    material: { friction: 0.01, restitution: 0.5 }
  }))
  
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 5]} />
      <meshStandardMaterial color="#2a2a35" transparent opacity={0.5} />
    </mesh>
  )
}

interface DieProps {
  diceType: DiceType
  index: number
  position: [number, number, number]
  onRest: (value: number) => void
}

function Die({ diceType, index, position, onRest }: DieProps) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ],
    // Aplicar força inicial mais controlada
    velocity: [0, -1, 0],
    angularVelocity: [
      Math.random() * 5 - 2.5,
      Math.random() * 5 - 2.5,
      Math.random() * 5 - 2.5
    ],
    material: { 
      friction: 0.2,
      restitution: 0.3
    },
    sleepSpeedLimit: 0.2, // Quando considerar o objeto parado
    sleepTimeLimit: 1, // Tempo para considerar dormindo
    allowSleep: true // Permite que os objetos físicos "durmam" quando parados
  }))

  const velocity = useRef([0, 0, 0])
  const angularVelocity = useRef([0, 0, 0])
  const [settled, setSettled] = useState(false)
  const [result, setResult] = useState(0)
  const resultReported = useRef(false)
  const stableCount = useRef(0)

  // Monitorar a velocidade para determinar quando o dado parou
  useEffect(() => {
    const unsubscribeVelocity = api.velocity.subscribe((v) => {
      velocity.current = v
    })
    
    const unsubscribeAngularVelocity = api.angularVelocity.subscribe((v) => {
      angularVelocity.current = v
    })
    
    return () => {
      unsubscribeVelocity()
      unsubscribeAngularVelocity()
    }
  }, [api])

  useFrame(() => {
    if (settled || resultReported.current) return

    const isStable = 
      Math.abs(velocity.current[0]) < 0.1 &&
      Math.abs(velocity.current[1]) < 0.1 &&
      Math.abs(velocity.current[2]) < 0.1 &&
      Math.abs(angularVelocity.current[0]) < 0.1 &&
      Math.abs(angularVelocity.current[1]) < 0.1 &&
      Math.abs(angularVelocity.current[2]) < 0.1

    if (isStable) {
      stableCount.current += 1
      
      // Esperar várias frames para confirmar que está estável
      if (stableCount.current > 10) {
        const max = getMaxValue(diceType)
        const randomResult = Math.floor(Math.random() * max) + 1
        setResult(randomResult)
        setSettled(true)
        
        if (!resultReported.current) {
          resultReported.current = true
          onRest(randomResult)
        }
      }
    } else {
      stableCount.current = 0
    }
  })

  // Escolher a geometria com base no tipo de dado
  const getDieGeometry = () => {
    switch (diceType) {
      case "d4":
        return <tetrahedronGeometry args={[1.5, 0]} />
      case "d6":
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case "d8":
        return <octahedronGeometry args={[1.2, 0]} />
      case "d10":
        return <dodecahedronGeometry args={[1.2, 0]} />
      case "d12":
        return <dodecahedronGeometry args={[1.2, 0]} />
      case "d20":
        return <icosahedronGeometry args={[1.2, 0]} />
      case "d100":
        return <sphereGeometry args={[1.2, 16, 16]} />
      default:
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
    }
  }

  return (
    <mesh ref={ref} castShadow receiveShadow>
      {getDieGeometry()}
      <meshStandardMaterial color={settled ? "#8a3c3c" : "#3a3a45"} />
      {settled && result > 0 && (
        <Text
          position={[0, 0, 0]}
          fontSize={0.8}
          color="white"
          font="/fonts/Geist_Bold.json"
          anchorX="center"
          anchorY="middle"
        >
          {result}
        </Text>
      )}
    </mesh>
  )
}

function getMaxValue(diceType: DiceType): number {
  switch (diceType) {
    case "d4":
      return 4
    case "d6":
      return 6
    case "d8":
      return 8
    case "d10":
      return 10
    case "d12":
      return 12
    case "d20":
      return 20
    case "d100":
      return 100
    default:
      return 6
  }
}