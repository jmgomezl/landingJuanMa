'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Users, Zap, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgOne-yWAPSQwTJHXBJzqQd8NbKGGfu6bwHn.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgFour-OJoZicB9tD1zLqteUDzo1jmWEW2Mm4.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgTwo-1jRYSo5pkcGWL9evS79Np1fdKPZ8w9.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgSix-QjglLINvATtwpTd7MpWPM0vE0EkqAL.jpg"
]

function ImageGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentIndex, setCurrentIndex] = useState(0)

  const autoplay = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  useEffect(() => {
    const intervalId = setInterval(autoplay, 5000) // Change image every 5 seconds
    return () => clearInterval(intervalId)
  }, [autoplay])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {images.map((src, index) => (
          <motion.div
            key={src}
            className="flex-[0_0_100%] min-w-0 relative h-64 md:h-96"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: currentIndex === index ? 1 : 0.5, 
              scale: currentIndex === index ? 1 : 0.9 
            }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={src}
              alt={`Community Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function NavItem({ href, children, isActive = false }) {
  return (
    <li>
      <Link 
        href={href} 
        className={`
          relative px-3 py-2 transition-colors duration-300
          ${isActive 
            ? 'text-white' 
            : 'text-white/70 hover:text-white'
          }
        `}
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
            layoutId="underline"
          />
        )}
      </Link>
    </li>
  )
}

function AnimatedCode() {
  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const containerRef = useRef<HTMLPreElement>(null)
  const fullText = `actor HelloWorld {
    public func greet() : async Text {
        return "Hello, World!";
    };
};`

  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    let timeoutId: NodeJS.Timeout

    const updateText = () => {
      if (!isDeleting && currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
        timeoutId = setTimeout(updateText, 50)
      } else if (isDeleting && currentIndex >= 0) {
        setText(fullText.slice(0, currentIndex))
        currentIndex--
        timeoutId = setTimeout(updateText, 30)
      } else {
        isDeleting = !isDeleting
        timeoutId = setTimeout(updateText, isDeleting ? 1000 : 2000)
      }
    }

    updateText()

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const adjustFontSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = containerRef.current.offsetHeight
        const textLength = fullText.length
        const aspectRatio = containerWidth / containerHeight

        // Adjust these values to fine-tune the font size
        const baseFontSize = Math.sqrt((containerWidth * containerHeight) / (textLength * aspectRatio))
        setFontSize(Math.max(10, Math.min(baseFontSize, 18))) // Clamp font size between 10 and 18
      }
    }

    adjustFontSize()
    window.addEventListener('resize', adjustFontSize)
    return () => window.removeEventListener('resize', adjustFontSize)
  }, [])

  return (
    <pre 
      ref={containerRef}
      className="bg-black text-green-400 p-4 rounded-md overflow-hidden whitespace-pre-wrap break-words h-full"
      style={{ fontSize: `${fontSize}px`, lineHeight: '1.5' }}
    >
      <code>{text}</code>
    </pre>
  )
}

export function HomePage() {
  const [activeNavItem, setActiveNavItem] = useState('Inicio')

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#8454f4] to-[#192442] text-white relative overflow-hidden">
      <header className="bg-[#1c2b5e]/80 backdrop-blur-md shadow-lg relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo512-x89zTOvERpNTJgygoff2SzZjD8gkVO.png"
                alt="ICP Colombia Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-2xl font-bold text-white">ICP Colombia</span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-1">
                <NavItem href="#" isActive={activeNavItem === 'Inicio'}>Inicio</NavItem>
                <NavItem href="#" isActive={activeNavItem === 'Acerca de'}>Acerca de</NavItem>
                <NavItem href="#" isActive={activeNavItem === 'Comunidad'}>Comunidad</NavItem>
                <NavItem href="#" isActive={activeNavItem === 'Recursos'}>Recursos</NavItem>
              </ul>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <Link href="#" className="text-lg font-medium hover:text-[#8454f4] transition-colors duration-300">Inicio</Link>
                  <Link href="#" className="text-lg font-medium hover:text-[#8454f4] transition-colors duration-300">Acerca de</Link>
                  <Link href="#" className="text-lg font-medium hover:text-[#8454f4] transition-colors duration-300">Comunidad</Link>
                  <Link href="#" className="text-lg font-medium hover:text-[#8454f4] transition-colors duration-300">Recursos</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow relative z-10">
        <section className="bg-gradient-to-r from-[#6a43c8] to-[#2d3a6d] py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a ICP Colombia</h1>
            <p className="text-xl mb-8">Explora el futuro de la Internet Computer en Colombia</p>
            <Link href="https://discord.gg/QTVKca3M" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-[#6a43c8] hover:bg-gray-100 hover:text-[#2d3a6d] transition-colors duration-300">
                Únete a la comunidad
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-naUu3gTqfBsyyEHDLbXCnIWYZMZulv.jpg"
              alt="ICP Colombia Banner"
              width={1200}
              height={300}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">¿Por qué ICP Colombia?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Code className="h-6 w-6 mr-2 text-[#8454f4]" />
                    Innovación Blockchain
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/80">
                  <p className="mb-4">Descubre cómo ICP está revolucionando la tecnología blockchain y la computación descentralizada.</p>
                  <div className="h-48">
                    <AnimatedCode />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Users className="h-6 w-6 mr-2 text-[#8454f4]" />
                    Comunidad Vibrante
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/80">
                  <p>Únete a una comunidad apasionada de desarrolladores, emprendedores y entusiastas de la tecnología.</p>
                  <div className="mt-4">
                    <ImageGallery />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Zap className="h-6 w-6 mr-2 text-[#8454f4]" />
                    Impacto Nacional
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/80">
                  <p>Sé parte del movimiento que está transformando la internet y creando un futuro descentralizado en Colombia.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#192442] py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo512-x89zTOvERpNTJgygoff2SzZjD8gkVO.png"
                alt="ICP Colombia Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">ICP Colombia</h3>
                <p className="text-white/80">Construyendo el futuro de la Internet Computer en Colombia.</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li><Link href="https://wiki.internetcomputer.org/wiki/Main_Page" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">Wiki ICP</Link></li>
                <li><Link href="https://internetcomputer.org/docs/current/developer-docs/getting-started/overview-of-icp" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">Documentación ICP</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
              <p>Email: <Link href="mailto:leader@icpcolombia.xyz" className="text-white/80 hover:text-white hover:underline">leader@icpcolombia.xyz</Link></p>
              <p>Email: <Link href="mailto:technical.lead@icpcolombia.xyz" className="text-white/80 hover:text-white hover:underline">technical.lead@icpcolombia.xyz</Link></p>
              <p>Twitter: <Link href="https://twitter.com/icp_COLOMBIA_" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">@icp_COLOMBIA_</Link></p>
              <p>LinkedIn: <Link href="https://www.linkedin.com/company/icp-hub-colombia/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">ICP Hub Colombia</Link></p>
              <p>Discord: <Link href="https://discord.gg/QTVKca3M" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">Únete a nuestro servidor</Link></p>
            </div>
          </div>
          <div className="mt-8 text-center text-white/80">
            <p>&copy; 2023 ICP Colombia. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}