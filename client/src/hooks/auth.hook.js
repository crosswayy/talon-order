import {useCallback, useEffect, useState} from 'react';

const storageName = 'userData';

export default function useAuth() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id, doRemember) => {
        setToken(jwtToken);
        setUserId(id);

        console.log(doRemember);
        if (doRemember) {
            localStorage.setItem(storageName, JSON.stringify({
                userId: id, token: jwtToken
            }));
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId);
        }
    }, [login]);

    return { login, logout, token, userId };
}
