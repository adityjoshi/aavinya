import LoginOTPVerification from "./pages/LoginOtpPage"
import SignupOTPVerification from "./pages/SignupOtpPage"

export const Roles = {
    WARDEN : 'warden',
    STUDENT : 'student',
    WORKER : 'worker'
}

export const region={
    North:'north',
    South:'south',
    East:'east',
    West:'west'
}
export const user_type={
    Admin:'admin',
    User:'user'
}

 export const RoutesPathName = {
    SIGNUP_PAGE : '/signup',
    LOGIN_PAGE : '/login',
    DASHBOARD_PAGE : '/',
    LoginOTPVerification_Page :'/verifyotp',
    SignupOTPVerification_Page :'/signupotpverification'
}

//export const apiLink = "http://localhost:3000"