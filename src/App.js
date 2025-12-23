import * as THREE from 'three'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, ScrollControls, useScroll } from '@react-three/drei'
import { easing } from 'maath'

export const App = () => (
  <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
    
    <ScrollControls pages={3} infinite>
      <Scene />
    </ScrollControls>
  </Canvas>
)

function Scene() {
  const ref = useRef()
  const scroll = useScroll()
  
  useFrame((state, delta) => {
    // Step 2: Rotation - Scroll ke saath poora carousel ghumao
    // offset (0 to 1) ko 360 degrees (PI * 2) se multiply kiya
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2)
  })

  return (
    <group ref={ref}>
      <Carousel radius={5} count={10} />
    </group>
  )
}

function Carousel({ radius, count }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        // Step 3: Math - Circle mein positioning
        const angle = (i / count) * Math.PI * 2
        return (
          <Card
            key={i}
            position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
            rotation={[0, angle, 0]} 
            url={`https://picsum.photos/seed/${i}/400/600`} 
          />
        )
      })}
    </>
  )
}

function Card({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)

  useFrame((state, delta) => {
    // Step 4: Scaling Logic
    // Agar hover hai to 1.5x bada, warna normal 1x
    const factor = hovered ? 1.5 : 1
    easing.damp3(ref.current.scale, [factor, factor, 1], 0.2, delta)
  })

  return (
    <Image
      ref={ref}
      url={url}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    />
  )
}
