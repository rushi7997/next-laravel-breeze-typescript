import Link from 'next/link'
import {Menu} from '@headlessui/react'
import React from "react";

interface IDropdownLinkProps {
    href: string
    children: React.ReactNode
    active?: boolean
}

const DropdownLink = (props: IDropdownLinkProps) => (
    <Menu.Item>{({active}) => (
        <Link href={props.href}>
            <a className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${active ? 'bg-gray-100' : ''} focus:outline-none transition duration-150 ease-in-out`}>
                {props.children}
            </a>
        </Link>
    )}
    </Menu.Item>
)

interface IDropdownButtonProps {
    children: React.ReactNode
    active?: boolean
    onClick?: () => void
}

export const DropdownButton = (props: IDropdownButtonProps) => (
    <Menu.Item>{({active = props.active}) => (
        <button
            className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${active ? 'bg-gray-100' : ''} focus:outline-none transition duration-150 ease-in-out`}
            onClick={props.onClick}>
            {props.children}
        </button>
    )}
    </Menu.Item>
)

export default DropdownLink
