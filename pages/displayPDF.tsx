import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>IDK What I&apos;m Doing</title>
        <meta name="description" content="http://localhost:3000/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script id='tempFix' >{`var exports = {};`}</Script> {/* ToDo: Find a not stupid fix */}
      <Script src="/displayPDF.js" />
      <iframe id="pdfViewer" className={styles.displayPDF} src=""></iframe>
    </div>
  )
}

export default Home
