import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'
import { models } from '../../constants'


const Computers = ({ isMobile }) => {

    const computer = useGLTF(models.desktop_pc.url)
    return (
        <mesh>
            <hemisphereLight intensity={0.2} groundColor='black' />
            <pointLight intensity={0.4} />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
            />

            {/* Accent rim lights in the site's pastel palette */}
            <pointLight position={[-6, 3, 4]} intensity={1.5} color='#C9B8FF' decay={0} />
            <pointLight position={[6, 2, -3]} intensity={1.5} color='#9FD4FF' decay={0} />
            <pointLight position={[0, 5, -5]} intensity={0.9} color='#A9E8D0' decay={0} />
            <pointLight position={[3, -1, 5]} intensity={0.8} color='#F3C0E0' decay={0} />
            <primitive
                object={computer.scene}
                scale={ isMobile ? 0.7 : 0.75}
                position={ isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
                rotation={[-0.01, -0.2, -0.1]}
            />
        </mesh>
    )
}

const ComputersCanvas = () => {

    const [isMobile, setIsMobile] = useState(false)


    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 500px)')

        setIsMobile(mediaQuery.matches)

        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches)
        }

        mediaQuery.addEventListener('change', handleMediaQueryChange)

        return () => {
            mediaQuery.removeEventListener('change',handleMediaQueryChange)
        }

    }, [])


    return (
        <Canvas
            className='cursor-grab'
            frameloop="demand"
            shadows
            camera={{ position: [20, 2, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default ComputersCanvas