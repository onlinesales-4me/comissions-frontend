import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const cookies = new Cookies();
const baseURL = `${process.env.REACT_APP_API_URL}/templates/`;
const templatesService = axios.create({
    baseURL,
});

templatesService.interceptors.request.use(function (config) {
    const token = cookies.get("jwt") ? cookies.get("jwt") : undefined;
    config.headers.Authorization = `Bearer ${token}`;
    console.log("LLAMADO")
    return config;
});

templatesService.interceptors.response.use(
    (response) => response,
    (error) => {
        Swal.fire({
            title: `Error en ${baseURL}`,
            text: error,
            type: "error",
            confirmButtonColor: "#D9272E",
            imageHeight: 200,
        });
        return Promise.reject(error);
    }
);
export default templatesService;
