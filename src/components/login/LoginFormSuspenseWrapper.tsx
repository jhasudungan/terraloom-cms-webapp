import { Suspense } from "react"
import LoginForm from "./LoginForm"

const LoginFormSuspenseWrapper = () => {

    return (
        <Suspense fallback={<div>Contact Admin</div>}>
                <LoginForm />
        </Suspense>
    )
}

export default LoginFormSuspenseWrapper;