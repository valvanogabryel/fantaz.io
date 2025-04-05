"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export function DangerZoneButton({ text, onDelete }: Readonly<{ 
  text: string; 
  onDelete?: () => void;
}>) {
  const [progress, setProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const [readyToRelease, setReadyToRelease] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const controls = useAnimation()

  // Limpa o intervalo quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Configura o efeito de tremor quando readyToRelease muda
  useEffect(() => {
    if (readyToRelease) {
      controls.start({
        x: [0, -2, 2, -2, 2, 0],
        transition: { 
          repeat: Infinity, 
          duration: 0.3,
          repeatType: "loop"
        }
      })
    } else {
      controls.stop()
      controls.set({ x: 0 })
    }
  }, [readyToRelease, controls])

  const startHold = () => {
    setIsHolding(true)
    setProgress(0)
    setReadyToRelease(false)
    
    // Reinicia o controle de progresso
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    let current = 0
    intervalRef.current = setInterval(() => {
      current += 2 // Mais lento para dar tempo de reagir
      if (current >= 100) {
        current = 100
        setReadyToRelease(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
      setProgress(current)
    }, 25) // Intervalo menor para animação mais suave
  }

  const cancelHold = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    if (!readyToRelease || !isHolding) {
      setIsHolding(false)
      setProgress(0)
      setReadyToRelease(false)
    }
  }

  const confirmDelete = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    if (readyToRelease && isHolding) {
      if (onDelete) onDelete()
      else alert("Conta excluída!") // Fallback se não passar onDelete
    }
    
    setIsHolding(false)
    setProgress(0)
    setReadyToRelease(false)
  }

  return (
    <div className="mt-4 relative w-fit">
      <motion.div
        animate={controls}
        className="relative"
      >
        <Button 
          variant="destructive" 
          className="relative overflow-hidden"
          onMouseDown={startHold}
          onMouseUp={confirmDelete}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={confirmDelete}
          onTouchCancel={cancelHold}
        >
          <span className="relative z-10">
            {readyToRelease ? "Solte para confirmar" : text}
          </span>
          
          {/* Camada de preenchimento */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-red-700 opacity-80 z-0"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween" }}
          />
        </Button>
      </motion.div>
    </div>
  )
}