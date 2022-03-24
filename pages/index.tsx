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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a
            href='https://www.simplyrecipes.com/recipes/joes_special_scrambled_eggs_with_spinach_beef_and_mushrooms/'
            target="_blank"
            rel="noopener noreferrer"
            className={styles.plaintextLink}
          >
            Joe&apos;s FANTASTICALLY Stpuid Homework Formatting THing
          </a>
        </h1>

        <p className={styles.description}>
          It will be a miracle if this works.
        </p>

        <div className={styles.grid}>
          <a href="./test1" className={styles.card}>
            <h2>Test 1 &rarr;</h2>
            <p>Test 1 things</p>
          </a>

          <a href="./test2" className={styles.card}>
            <h2>Test 2 &rarr;</h2>
            <p>Test 2 things</p>
          </a>
        </div>
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
					href="https://github.com/SiegeToaster/webMathHWFormatter"
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
