import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>IDK What I&apos;m Doing</title>
        <meta name="description" content="http://localhost:3000/" />
        <link rel="icon" href="/icon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a
            href='https://www.simplyrecipes.com/recipes/joes_special_scrambled_eggs_with_spinach_beef_and_mushrooms/'
            target="_blank"
            rel="noopener noreferrer"
          >
            Joe&apos;s FANTASTICALLY Stpuid Homework Formatting THing
          </a>
        </h1>

        <p className={styles.description}>
          How does it work? Well I&apos;ll tell you.<br></br><br></br>I don&apos;t know.
        </p>

        <div className={styles.grid}>
          <a href="./formInput" className={styles.card}>
            <h2>Start &rarr;</h2>
            <p>Joe? Who&apos;s Joe?</p>
          </a>
        </div>

        <div className={styles.grid}>
          <a href="./instructions" className={styles.card}>
            <h2>Instructions &rarr;</h2>
            <p>Read Me</p>
          </a>
        </div>

        <p className={styles.version}>
          Version 1.2
        </p>

				<p className={styles.authors}>
          Created by:<br></br>William Armstrong and William Hayr
        </p>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>

        <a
          href="https://github.com/SiegeToaster/math_hw_formatter_website"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code on{' '}
          <span className={styles.logo}>
            <Image src="/github.svg" alt="Github Logo" width={108} height={24} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
