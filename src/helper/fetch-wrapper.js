import { useAuthStore } from "../store/AuthStore";
import router from "../router/index";

export const fetchWrapper = {
    get: request("GET"),
    post: request("POST"),
    patch: request("PATCH"),
    delete: request("DELETE"),
};

function request(method) {
    return (url, body, { credentials } = {}) => {
        const requestOptions = {
            method,
            headers: authHeader(url),
        };
        if (body) {
            requestOptions.headers["Content-Type"] = "application/json";
            requestOptions.body = JSON.stringify(body);
        }
        if (credentials) {
            requestOptions.credentials = credentials;
        }
        return fetch(url, requestOptions).then(handleResponse);
    };
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { auth } = useAuthStore();
    const isLoggedIn = !!auth?.api_token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_BASE_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${auth.api_token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const { user, deleteSession, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && user) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // deleteSession();
                // logout();
                router.push({ name: "unauthorize" });
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
