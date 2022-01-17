import Navigation from '../../components/Layouts/Navigation'
import {useAuth} from '../../hooks/auth'
import React from "react";

interface IAppLayoutProps {
    children: React.ReactNode
    header?: React.ReactNode
}

const AppLayout = (props: IAppLayoutProps) => {
    const {user} = useAuth({middleware: 'auth'})

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user}/>

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {props.header}
                </div>
            </header>

            {/* Page Content */}
            <main>{props.children}</main>
        </div>
    )
}

export default AppLayout
