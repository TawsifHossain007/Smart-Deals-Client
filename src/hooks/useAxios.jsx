import axios from "axios";

const AxiosInstance = axios.create({
      baseURL: 'http://localhost:3100',
})

const useAxios = () => {
    return AxiosInstance
}

export default useAxios