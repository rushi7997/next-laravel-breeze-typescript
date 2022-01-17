import useSWR from 'swr'
import axios from '../lib/axios';
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {User} from "../types/user";

interface IUseAuth {
    middleware: 'auth' | 'guest';
    redirectIfAuthenticated?: string;
}

interface ILoginProps {
    email: string;
    password: string;
    setErrors: (errors: string[]) => void;
    setStatus: (status: string | null) => void;
}

interface IRegisterProps {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    setErrors: (errors: string[]) => void;
}

interface IForgotPasswordProps {
    email: string;
    setErrors: (errors: string[]) => void;
    setStatus: (status: string | null) => void;
}

interface IResetPasswordProps {
    email: string;
    password: string;
    password_confirmation: string;
    setErrors: (errors: string[]) => void;
    setStatus: (status: string | null) => void;
}

interface IResendEmailVerification {
    setStatus: (status: string | null) => void;
}

interface IUseAuthResponse {
    user: User | undefined;
    login: (props: ILoginProps) => void;
    register: (props: IRegisterProps) => void;
    forgotPassword: (props: IForgotPasswordProps) => void;
    resetPassword: (props: IResetPasswordProps) => void;
    resendEmailVerification: (props: IResendEmailVerification) => void;
    logout: () => void;
}

export const useAuth = (args: IUseAuth): IUseAuthResponse => {
    const router = useRouter()

    const {data: user, error} = useSWR<User, string>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status != 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async (props: IRegisterProps) => {
        await csrf()

        props.setErrors([])

        axios
            .post('/register', {
                name: props.name,
                email: props.email,
                password: props.password,
                password_confirmation: props.password_confirmation,
            }).catch(error => {
            if (error.response.status != 422) throw error

            // @ts-ignore
            props.setErrors(Object.values(error.response.data.errors).flat())
        })
    }

    const login = async (props: ILoginProps) => {
        await csrf()

        props.setErrors([])
        props.setStatus(null)

        axios
            .post('/login', {
                email: props.email,
                password: props.password,
            }).catch(error => {
            if (error.response.status != 422) throw error

            // @ts-ignore
            props.setErrors(Object.values(error.response.data.errors).flat())
        })
    }

    const forgotPassword = async (props: IForgotPasswordProps) => {
        await csrf()

        props.setErrors([])
        props.setStatus(null)

        axios
            .post('/forgot-password', {email: props.email})
            .then(response => props.setStatus(response.data.status))
            .catch(error => {
                if (error.response.status != 422) throw error

                // @ts-ignore
                props.setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resetPassword = async (props: IResetPasswordProps) => {
        await csrf()

        props.setErrors([])
        props.setStatus(null)

        axios
            .post('/reset-password', {
                token: router.query.token,
                email: props.email,
                password: props.password,
                password_confirmation: props.password_confirmation
            })
            .then(response => router.push('/login?reset=' + btoa(response.data.status)))
            .catch(error => {
                if (error.response.status != 422) throw error

                // @ts-ignore
                props.setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resendEmailVerification = (props: IResendEmailVerification) => {
        axios
            .post('/email/verification-notification')
            .then(response => props.setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout')
        }
        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (args.middleware == 'guest' && args.redirectIfAuthenticated && user) router.push(args.redirectIfAuthenticated).then(r => {
        })
        if (args.middleware == 'auth' && error) logout().then(r => {
        })
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
