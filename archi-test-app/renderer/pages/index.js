import React from 'react'
import Head from 'next/head'

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>My Nextron App</title>
      </Head>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        fontFamily: 'Arial, sans-serif' 
      }}>
        <h1>Hello, Nextron!</h1>
      </div>
    </React.Fragment>
  )
}

export default Home