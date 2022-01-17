import Head from 'next/head'
import React from "react";

interface IProps {
  children: React.ReactNode
}

const GuestLayout = (props:IProps) => {
    return (
        <div>
            <Head>
                <title>Laravel</title>
            </Head>

            <div className="font-sans text-gray-900 antialiased">
                {props.children}
            </div>
        </div>
    )
}

export default GuestLayout
