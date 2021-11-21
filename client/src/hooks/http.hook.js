import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);

        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                const error = new Error();
                error.message = data.message;
                error.errors = data.errors;

                throw error;
            }

            setLoading(false);

            return data;
        } catch (e) {
            setLoading(false);

            const newError = { errors: e.errors ? e.errors.map(item => item.msg) : null, message: e.message};
            setError(newError);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
}
