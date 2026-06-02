import { Suspense, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { RepeatWrapping, MirroredRepeatWrapping } from 'three'
import CanvasLoader from '../Loader'
import { models } from '../../constants'

// The RGB-fan sprite sheets (baseColor + emissive) on these materials are 8x4
// sheets (32 frames). The fans aren't on a perfect 1/8 x 1/4 grid, so we sample
// each frame from the *measured* fan centres/spacing to keep it from drifting
// up/down. Values are in source-image pixels (sheet 1708x775).
const FAN = {
    materials: ['Material.074_0', 'Material.074_17'],
    sheet: { w: 1708, h: 775 },
    cols: 8,
    rows: 4,
    frames: 32,
    fps: 30,
    first: { x: 109.5, y: 103.5 },   // centre of the top-left fan (px)
    step: { x: 213.571, y: 189.5 },  // centre-to-centre spacing (px)
}

// Static colour-gradient texture (speakers + keyboard RGB). We spin it about
// its centre for a flowing colour-cycle and pulse the emissive for a breathing
// glow.
const RGB = {
    materials: ['Material.074_11'],
    rotSpeed: (Math.PI * 2) / 10,  // one full colour cycle every 10s
    breatheMid: 1.0,
    breatheAmp: 0.35,
    breathePeriod: 3,              // seconds per breathe cycle
}

const Computers = ({ isMobile }) => {

    const computer = useGLTF(models.desktop_pc.url)
    const { invalidate } = useThree()

    useEffect(() => {
        // Collect maps/materials for the animated materials.
        const fanMaps = []
        const rgbMaps = new Set()
        const rgbMats = new Set()
        computer.scene.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
            mats.forEach((m) => {
                if (FAN.materials.includes(m.name)) {
                    if (m.map) fanMaps.push(m.map)
                    if (m.emissiveMap) fanMaps.push(m.emissiveMap)
                }
                if (RGB.materials.includes(m.name)) {
                    if (m.map) rgbMaps.add(m.map)
                    if (m.emissiveMap) rgbMaps.add(m.emissiveMap)
                    rgbMats.add(m)
                }
            })
        })
        if (!fanMaps.length && !rgbMaps.size) return

        // --- Fan sprite sheet: sample one frame, centred on the fan ---
        const { sheet, cols, step, first } = FAN
        const setFanFrame = (n) => {
            const col = n % cols
            const row = Math.floor(n / cols)
            const cx = first.x + col * step.x
            const cy = first.y + row * step.y
            fanMaps.forEach((t) => t.offset.set((cx - step.x / 2) / sheet.w, (cy - step.y / 2) / sheet.h))
        }
        fanMaps.forEach((t) => {
            t.wrapS = t.wrapT = RepeatWrapping
            t.repeat.set(step.x / sheet.w, step.y / sheet.h)
            t.needsUpdate = true
        })
        setFanFrame(0)

        // --- RGB gradient: rotate about centre (+ mirror wrap to avoid seams) ---
        rgbMaps.forEach((t) => {
            t.center.set(0.5, 0.5)
            t.wrapS = t.wrapT = MirroredRepeatWrapping
            t.needsUpdate = true
        })

        invalidate()

        let frame = 0
        let tick = 0
        const id = setInterval(() => {
            // Fan frame
            frame = (frame + 1) % FAN.frames
            setFanFrame(frame)

            // RGB rotate + breathe
            tick += 1
            const seconds = tick / FAN.fps
            const rotation = seconds * RGB.rotSpeed
            rgbMaps.forEach((t) => { t.rotation = rotation })
            const breathe = RGB.breatheMid + RGB.breatheAmp * Math.sin((seconds / RGB.breathePeriod) * Math.PI * 2)
            rgbMats.forEach((mat) => { mat.emissiveIntensity = breathe })

            invalidate()
        }, 1000 / FAN.fps)

        return () => clearInterval(id)
    }, [computer, invalidate])

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
                    enablePan={false}
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
