/**head is for keywords meta tags etc.*/
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { HomeHeroPic } from '../styles/Images.styled'
import { HomeHeroSection } from '../styles/Section.styled'

export default function Home() {
  return (
    <div>
     <HomeHeroSection>
     <HomeHeroPic 
     src='/sybs-banner2500.jpg'
     />
     </HomeHeroSection>
    </div>
  )
}
