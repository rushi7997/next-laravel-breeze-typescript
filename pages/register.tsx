import ApplicationLogo from '../components/ApplicationLogo'
import AuthCard from '../components/AuthCard'
import AuthValidationErrors from '../components/AuthValidationErrors'
import Button from '../components/Button'
import GuestLayout from '../components/Layouts/GuestLayout'
import Input from '../components/Input'
import Label from '../components/Label'
import Link from 'next/link'
import {useAuth} from '../hooks/auth'
import {useState} from 'react'

const Register = () => {
    const {register} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password_confirmation, setPasswordConfirmation] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])

    const submitForm = (event: { preventDefault: () => void }) => {
        event.preventDefault()

        register({name, email, password, password_confirmation, setErrors})
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500"/>
                        </a>
                    </Link>
                }>

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors}/>

                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>

                        <Input
                            id="password_confirmation"
                            type="password"
                            value={password_confirmation}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link href="/login">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Already registered?
                            </a>
                        </Link>

                        <Button className="ml-4">Register</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Register
