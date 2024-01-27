import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllTrangdon = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/trangdon/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/trangdon/get-all?limit=${limit}`)
    }
    return res.data
}

export const getTrangdonType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/trangdon/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const createTrangdon = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/trangdon/create`, data)
    return res.data
}

export const getDetailsTrangdon = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/trangdon/get-details/${id}`)
    return res.data
}

export const updateTrangdon = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/trangdon/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteTrangdon = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/trangdon/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyTrangdon = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/trangdon/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeTrangdon = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/trangdon/get-all-type`)
    return res.data
}
// postService.js

// Import necessary dependencies and modules

export const getRelatedTrangdons = async (type) => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/related?type=${type}`)

      return res.data
    }  
  