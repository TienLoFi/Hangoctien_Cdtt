import axios from "axios";
import { axiosJWT } from "./UserService";


export const getAllBanner = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/banner/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/banner/get-all?limit=${limit}`)
    }
    return res.data
}

export const createBanner = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/banner/create`, data);
    return res.data;
};

export const getDetailsBanner = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/banner/get-details/${id}`);
    return res.data;
};

export const updateBanner = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/banner/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteBanner = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/banner/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyBanner = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/banner/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
