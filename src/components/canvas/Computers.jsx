import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { MirroredRepeatWrapping, CanvasTexture, SRGBColorSpace } from 'three'
import CanvasLoader from '../Loader'
import { models } from '../../constants'

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
        const rgbMaps = new Set()
        const rgbMats = new Set()
        computer.scene.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
            mats.forEach((m) => {
                if (RGB.materials.includes(m.name)) {
                    if (m.map) rgbMaps.add(m.map)
                    if (m.emissiveMap) rgbMaps.add(m.emissiveMap)
                    rgbMats.add(m)
                }
            })
        })
        if (!rgbMaps.size) return

        // --- RGB gradient: rotate about centre (+ mirror wrap to avoid seams) ---
        rgbMaps.forEach((t) => {
            t.center.set(0.5, 0.5)
            t.wrapS = t.wrapT = MirroredRepeatWrapping
            t.needsUpdate = true
        })

        // --- Fan video texture (074_0 + 074_17 share the same video, color-graded via canvas) ---
        const video17 = document.createElement('video')
        video17.src = '/desktop_pc/textures/Material.074_17_baseVideo.mp4'
        video17.crossOrigin = 'anonymous'
        video17.loop = true
        video17.muted = true
        video17.playsInline = true

        const canvas17 = document.createElement('canvas')
        canvas17.width = 512
        canvas17.height = 512
        const ctx17 = canvas17.getContext('2d')

        const videoTex17 = new CanvasTexture(canvas17)
        videoTex17.colorSpace = SRGBColorSpace
        videoTex17.flipY = false

        const draw17 = () => {
            if (video17.readyState < 2) return
            ctx17.filter = 'brightness(1.5) contrast(1.5) saturate(1.4)'
            ctx17.drawImage(video17, 0, 0, 512, 512)
            videoTex17.needsUpdate = true
        }
        video17.addEventListener('loadeddata', draw17)
        video17.play()

        computer.scene.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
            mats.forEach((m) => {
                if (m.name === 'Material.074_0' || m.name === 'Material.074_17') {
                    m.map = videoTex17
                    m.emissiveMap = videoTex17
                    m.needsUpdate = true
                }
            })
        })

        // --- Screen video texture (color-graded via canvas, redrawn every tick) ---
        const video = document.createElement('video')
        video.src = '/desktop_pc/textures/Material.074_30_baseVideo.mp4'
        video.crossOrigin = 'anonymous'
        video.loop = true
        video.muted = true
        video.playsInline = true

        const canvas30 = document.createElement('canvas')
        canvas30.width = 512
        canvas30.height = 512
        const ctx30 = canvas30.getContext('2d')
        const draw30 = () => {
            if (video.readyState < 2) return
            ctx30.filter = 'brightness(0.45) contrast(1.7) saturate(2.2)'
            ctx30.drawImage(video, 0, 0, 512, 512)
            videoTex.needsUpdate = true
        }
        video.addEventListener('loadeddata', draw30)
        video.play()

        const videoTex = new CanvasTexture(canvas30)
        videoTex.colorSpace = SRGBColorSpace
        videoTex.flipY = false

        computer.scene.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
            mats.forEach((m) => {
                if (m.name === 'Material.074_30') {
                    m.map = videoTex
                    m.emissiveMap = videoTex
                    m.needsUpdate = true
                }
            })
        })

        invalidate()

        let tick = 0
        const id = setInterval(() => {
            tick += 1
            const seconds = tick / 30
            // RGB rotate + breathe
            const rotation = seconds * RGB.rotSpeed
            rgbMaps.forEach((t) => { t.rotation = rotation })
            const breathe = RGB.breatheMid + RGB.breatheAmp * Math.sin((seconds / RGB.breathePeriod) * Math.PI * 2)
            rgbMats.forEach((mat) => { mat.emissiveIntensity = breathe })
            // Redraw canvases for current video frames
            draw17()
            draw30()
            videoTex.needsUpdate = true
            invalidate()
        }, 1000 / 30)

        return () => {
            clearInterval(id)
            video17.removeEventListener('loadeddata', draw17)
            video17.pause()
            video17.src = ''
            videoTex17.dispose()
            video.removeEventListener('loadeddata', draw30)
            video.pause()
            video.src = ''
            videoTex.dispose()
        }
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

            {/* Screen glow — cool-white light simulating monitor emission */}
            <pointLight position={[0.5, -1.2, 2.5]} intensity={0.45} color='#dde8ff' decay={1.5} />

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
    const [isFullscreen, setIsFullscreen] = useState(false)
    const containerRef = useRef(null)
    const orbitRef = useRef(null)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 500px)')
        setIsMobile(mediaQuery.matches)
        const handleMediaQueryChange = (event) => setIsMobile(event.matches)
        mediaQuery.addEventListener('change', handleMediaQueryChange)
        return () => mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }, [])

    useEffect(() => {
        const onFSChange = () => {
            const entering = !!document.fullscreenElement
            if (!entering) orbitRef.current?.reset()
            setIsFullscreen(entering)
        }
        document.addEventListener('fullscreenchange', onFSChange)
        return () => document.removeEventListener('fullscreenchange', onFSChange)
    }, [])

    const handleDoubleClick = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    return (
        <div
            ref={containerRef}
            onDoubleClick={handleDoubleClick}
            className='relative w-full h-full'
        >
            <Canvas
                className='cursor-grab'
                frameloop="always"
                shadows
                camera={{ position: [20, 2, 5], fov: 25 }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        ref={orbitRef}
                        enableZoom={isFullscreen}
                        enablePan={isFullscreen}
                        maxPolarAngle={isFullscreen ? Math.PI * 0.85 : Math.PI / 2}
                        minPolarAngle={isFullscreen ? Math.PI * 0.15 : Math.PI / 2}
                    />
                    <Computers isMobile={isMobile} />
                </Suspense>
                <Preload all />
            </Canvas>

            {isFullscreen && (
                <p className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs pointer-events-none select-none'>
                    Scroll to zoom &nbsp;·&nbsp; Drag to orbit &nbsp;·&nbsp; Double-click to exit
                </p>
            )}
        </div>
    )
}

export default ComputersCanvas
