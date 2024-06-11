import { useEffect, useState } from "react"
import {  jwtDecode } from "jwt-decode"
import { api } from "../api/agent"
import { Navigate, Outlet } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants"


const RequiredAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState('null');
    useEffect(() => {
        auth().catch(() => {setIsAuthorized('false'), localStorage.clear()})
    }, [])


    const refreshToken = async () => {
        const refreshToken1 = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/api/token/refresh', {refresh: refreshToken1});
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized('true')
            } else {
                localStorage.clear()
                setIsAuthorized('false')
            }
        } catch (error) {
            setIsAuthorized('false')
            localStorage.clear()
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


  return (
    isAuthorized === 'true' ? <Outlet/> : isAuthorized === 'false' && <Navigate to='sign-in'/>
  )
}

export default RequiredAuth