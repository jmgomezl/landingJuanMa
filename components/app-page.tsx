'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Users, Zap, Menu, Calendar, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion, useAnimation } from "framer-motion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import icpLogo from '@/app/icplogo.png'; // Import the ICP logo

const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgOne-yWAPSQwTJHXBJzqQd8NbKGGfu6bwHn.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgSix-QjglLINvATtwpTd7MpWPM0vE0EkqAL.jpg",
  "https://drive.google.com/uc?export=view&id=1dcKUJlMNUXlwYMO7o20N-Rqcg1-ltSvu",
  "https://drive.google.com/uc?export=view&id=1g-7FcKpSPvnjyVkfOPw65IiXpQ43RJeG",
  "https://drive.google.com/uc?export=view&id=1Iw9AIL2puHlOO3g58uJi_01aTJwCOMYa",
  "https://drive.google.com/uc?export=view&id=1e6vL7zoMXEVB1xeeiCXLV3inbJ0EE0vu",
  "https://drive.google.com/uc?export=view&id=1pjsj71tNOG_-0qdApRaQJQns6-EV44CC",
  "https://drive.google.com/uc?export=view&id=1PxTms90TPluh9WZUIaLFpHT9KcYW9tZ_",
  "https://drive.google.com/uc?export=view&id=1GS0lARC4u8h8t29-WuVZvtlV9SxbYear",
  "https://drive.google.com/uc?export=view&id=1iRCUf89P6Hisuk7osDso_hpfg5Yf5jMf"
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
    if (typeof window !== "undefined") {
      const intervalId = setInterval(autoplay, 5000)
      return () => clearInterval(intervalId)
    }
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
              layout="responsive"
              width={800}
              height={600}
              objectFit="cover"
              className="w-full h-full rounded-lg"
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
  const containerRef = useRef(null)
  const fullText = `actor HelloWorld {
  public func greet() : async Text {
      return "Hello, World!";
  };
};`

  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    let timeoutId

    const updateText = () => {
      if (!isDeleting && currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
        timeoutId = setTimeout(updateText, 30) // Tiempo reducido para una experiencia más rápida
      } else if (isDeleting && currentIndex >= 0) {
        setText(fullText.slice(0, currentIndex))
        currentIndex--
        timeoutId = setTimeout(updateText, 20) // Eliminación más rápida
      } else {
        isDeleting = !isDeleting
        timeoutId = setTimeout(updateText, isDeleting ? 800 : 1500)
      }
    }

    updateText()

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="bg-black text-green-400 p-4 rounded-md overflow-x-auto w-full max-w-full"
      style={{ fontFamily: "monospace", fontSize: "clamp(12px, 2vw, 16px)" }} // Establecer una fuente monoespaciada y tamaño dinámico
    >
      <pre className="whitespace-pre-wrap break-words leading-relaxed">
        <code>{text}</code>
      </pre>
    </div>
  )
}

function EventMap() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPng,
      });
    }
  }, []);

  // Definir un icono personalizado para el marcador
  const icpMarkerIcon = new L.Icon({
    iconUrl: icpLogo.src,
    iconSize: [32, 32], // Ajustar el tamaño del icono
    iconAnchor: [16, 32], // Punto de anclaje del icono
    popupAnchor: [0, -32], // Punto de anclaje del popup respecto al icono
  });

  // Definir los puntos de interés
  const eventLocations = [
    {
      name: "Hackathon Medellín - Marzo 2024",
      position: [6.2442, -75.5812], // Coordenadas de Medellín
    },
    {
      name: "NASA Apps Challenge - Chía, Octubre 2024",
      position: [4.8581, -74.0573], // Coordenadas de Chía
    },
    {
      name: "Presentación Gabbii - Cali, Octubre 2024",
      position: [3.4516, -76.5319], // Coordenadas de Cali
    },
  ];

  if (typeof window === "undefined") {
    // Return nothing if on the server side
    return null;
  }

  return (
    <div className="w-full h-48 md:h-64 rounded-lg shadow-lg overflow-hidden">
      <MapContainer
        center={[4.5709, -74.2973]}
        zoom={6}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {eventLocations.map((event, index) => (
          <Marker key={index} position={event.position} icon={icpMarkerIcon}>
            <Popup>{event.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function EventCard({ title, date, time, link }) {
  const controls = useAnimation()
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 })
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [controls])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="flex items-center text-white/80 mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-white/80 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span>{time}</span>
        </div>
        <Link href={link} target="_blank" rel="noopener noreferrer">
          <Button className="w-full bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300">
            Ver detalles del evento
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

export function Page() {
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
            <Link href="https://discord.gg/nTHbdsDZJu" target="_blank" rel="noopener noreferrer">
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

        <section className="py-20 bg-gradient-to-r from-[#2d3a6d] to-[#6a43c8]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Eventos Pasados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <EventCard
                title="Evento ICP Colombia"
                date="15 de Septiembre, 2024"
                time="7:00 PM"
                link="https://x.com/icp_COLOMBIA_/status/1834381483156369422"
              />
              <EventCard
                title="ICP Blockchain en Colombia"
                date="26 de Septiembre, 2024"
                time="7:00 PM"
                link="https://x.com/icp_COLOMBIA_/status/1839456102573814145"
              />
              <EventCard
                title="Recap ICP Colombia  NASA & GABBII DAO"
                date="10 de Octubre, 2024"
                time="7:00 PM"
                link="https://x.com/icp_COLOMBIA_/status/1844529514828660928"
              />
            </div>
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
                    <Users className="h-6 w-6 mr-2  text-[#8454f4]" />
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
                  <div className="mt-4">
                    <EventMap />
                  </div>
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
                <li><Link href="#" className="text-white/80 hover:text-white hover:underline">Tutoriales</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white hover:underline">Eventos</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white hover:underline">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
              <p>Email: <Link href="mailto:leader@icpcolombia.xyz" className="text-white/80 hover:text-white hover:underline">leader@icpcolombia.xyz</Link></p>
              <p>Email: <Link href="mailto:technical.lead@icpcolombia.xyz" className="text-white/80 hover:text-white hover:underline">technical.lead@icpcolombia.xyz</Link></p>
              <p>Twitter: <Link href="https://twitter.com/icp_COLOMBIA_" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">@icp_COLOMBIA_</Link></p>
              <p>LinkedIn: <Link href="https://www.linkedin.com/company/icp-hub-colombia/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">ICP Hub Colombia</Link></p>
              <p>Discord: <Link href="https://discord.gg/nTHbdsDZJu" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">Únete a nuestro servidor</Link></p>
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
