import Head from 'next/head'
import Footer from '../Footer'
import Navbar from '../Navbar'

export default ({ children }: any): JSX.Element => {
  return (
    <div className='layout'>
      <Head>
        <title> E-commerce </title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="main-container">
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}
