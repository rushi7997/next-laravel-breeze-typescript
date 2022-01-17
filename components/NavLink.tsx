import Link from 'next/link'
import React from "react";

interface INavLinkProps {
    href: string
    children: React.ReactNode
    active: boolean
}

const NavLink = (props: INavLinkProps) => (
    <Link href={props.href}>
        <a
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                props.active
                    ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'
            }`}>
            {props.children}
        </a>
    </Link>
)

export default NavLink
