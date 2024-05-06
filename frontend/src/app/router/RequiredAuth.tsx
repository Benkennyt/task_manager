import { useEffect, useState } from "react"
import {  jwtDecode } from "jwt-decode"
import { api } from "../api/agent"
import { Navigate, Outlet } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants"


const RequiredAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState('null');
    useEffect(() => {
        auth().catch(() => setIsAuthorized('false'))
    }, [])

    const refreshToken = async () => {
        const refreshToken1 = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/api/token/refresh', {refresh: refreshToken1});
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized('true')
            } else {
                setIsAuthorized('false')
            }
        } catch (error) {
            setIsAuthorized('false');
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized('false');
            return;
        }
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded?.exp && decoded.exp < now) {
            await refreshToken();
        } else {
            setIsAuthorized('true');
        }
    };

    if (isAuthorized === 'null') {
        return <div>Loading...</div>;
    }
  return (
    isAuthorized === 'true' ? <Outlet/> : <Navigate to='login' />
  )
}

export default RequiredAuth