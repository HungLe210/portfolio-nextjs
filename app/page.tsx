import Encryption from "@/components/main/Encryption";
import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import React from 'react'

export default function Home() {
  return (
    <div className='flex flex-col gap-20'>
      <Hero />
      <Skills />
      <Encryption />
      <Projects />
      <Footer />
    </div>

  )
}

