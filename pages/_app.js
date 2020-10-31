import React from "react"
import '../styles/globals.css'
import Head from "next/head";
import {Header} from "./components/header/header";

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            </Head>
            <Header/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
