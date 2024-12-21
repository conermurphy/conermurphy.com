import '../styles/globals.css'
import '../styles/cobalt2.prism.css'
import type { AppProps } from 'next/app'
import { Raleway, Karla, Inconsolata } from 'next/font/google'
import * as Fathom from 'fathom-client'
import { useEffect } from 'react'
import Router from 'next/router'
import { Footer } from '../components'
import Header from '../components/Header'

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--raleway-font',
  display: 'swap',
})
const karla = Karla({
  subsets: ['latin'],
  variable: '--karla-font',
  display: 'swap',
})
const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--inconsolata-font',
  display: 'swap',
})

Router.events.on(
  'routeChangeComplete',
  (as, routeProps: { shallow: boolean }) => {
    if (!routeProps.shallow) {
      Fathom.trackPageview()
    }
  }
)

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Fathom.load('FBDCDFEY', {
      includedDomains: ['conermurphy.com, www.conermurphy.com'],
    })
  }, [])

  return (
    <div
      className={`${raleway.variable} ${karla.variable} ${inconsolata.variable} pb-24 md:pb-48`}
    >
      <Header />
      <main className="bg-background text-text font-body flex flex-col gap-24 scroll-smooth pb-24 md:gap-48 md:pb-48">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
