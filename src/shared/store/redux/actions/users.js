
import client from "../../../utils/Api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";

// const dispatch = useDispatch()

export const LoginAttempt = (payload) => {
    try {
        return (dispatch) => {
            dispatch({
                type: 'LOGIN_PENDING',
                loading: true,
                error: null
            });

            return client
                .post(`/auth/login`, payload)
                .then(async (response) => {
                    if (response.data) {
                        console.log('Login successful, status code is ', response.data);

                        const accessToken = response.data.jwt;
                        console.log('token', accessToken);
                        await AsyncStorage.setItem('token', accessToken);

                        client.defaults.headers.common[
                            'Authorization'
                        ] = `Bearer ${accessToken}`;

                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            token: response.data.jwt,
                            user: response.data.user,
                            loading: false
                        });

                        return response.data;
                    }
                })
                .catch((error) => {
                    console.log('Login failed =>', error.message);
                    dispatch({
                        type: 'LOGIN_FAILED',
                        loading: false,
                        error: error.message
                    });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};

export const clearErrorField = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR',
            error: null
        });
    }
}


export const fetchRiders = () => {
    try {
        return (dispatch) => {
            dispatch({
                type: 'FETCH_RIDERS_PENDING',
                loading: true,
                error: null
            });
            console.log('fetching riders')

            return client
                .get(`/kitchen-api/riders`)
                .then((response) => {
                    console.log('items fetched success')
                    if (response.data) {
                        console.log('riders fetched=>>', response.data);
                        dispatch({
                            type: 'FETCH_RIDERS_SUCCESS',
                            riders: response.data,
                            loading: false
                        });
                        return response.data;
                    }
                })


                .catch((error) => {
                    console.log('products  failed =>', error.message);

                });
        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};


export const addRiders = (payload) => {
    try {
        return (dispatch) => {
            dispatch({
                type: 'ADD_RIDERS_PENDING',
                loading: true,
            });
            console.log('rider add pending')


            return client
                .post(`/riders`, payload)
                .then((response) => {
                    console.log('rider added success')
                    if (response.data) {

                        console.log(response.data)
                        dispatch({
                            type: 'ADD_RIDERS_SUCCESS',
                            loading: false,
                        });
                        dispatch(fetchRiders())

                        return 'success';
                    }
                })
                .catch((error) => {
                    console.log('rider add failed =>', error.message);
                });
        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};



export const deleteRiders = (riderInfo) => {
    console.log(riderInfo, 'id to be deleted')
    try {
        return (dispatch) => {
            dispatch({
                type: 'DELETE_RIDERS_PENDING',
                loading: true,
            });

            const payload = {
                name: riderInfo.name,
                phoneNumber: riderInfo.phoneNumber,
                isDeleted: true
            }
            console.log('rider DELETE pending')


            return client
                .patch(`/riders/${riderInfo.id}`, payload)
                .then((response) => {
                    console.log('rider deleted success')
                    if (response.data) {

                        console.log(response.data)
                        dispatch({
                            type: 'DELETE_RIDERS_SUCCESS',
                            loading: false,
                        });
                        dispatch(fetchRiders())

                        return 'success';
                    }
                })
                .catch((error) => {
                    console.log('rider DELETE failed =>', error.message);
                });
        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};



export const editCompany = (id, payload) => {
    try {
        return (dispatch) => {
            dispatch({
                type: 'EDIT_COMPANY_PENDING',
                loading: true,
            });
            console.log('company edit pending')


            return client
                .patch(`/companies/${id}`, payload)
                .then((response) => {
                    console.log('company edit success')
                    if (response.data) {

                        console.log(response.data)
                        dispatch({
                            type: 'EDIT_COMPANY_SUCCESS',
                            loading: false,
                        });
                        dispatch(fetchCompany())

                        return 'success';
                    }
                })
                .catch((error) => {
                    console.log('COMPANY EDIT failed =>', error.message);
                });
        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};


export const fetchCompany = () => {
    try {
        return (dispatch) => {
            dispatch({
                type: 'FETCH_COMPANY_PENDING',
                loading: true,
            });
            console.log('fetch company pending')


            return client
                .get(`/companies`)
                .then((response) => {
                    console.log('fetch company success')
                    if (response.data) {

                        console.log(response.data)
                        dispatch({
                            type: 'FETCH_COMPANY_SUCCESS',
                            loading: false,
                            companies: response.data.data
                        });

                        return response.data.data;
                    }
                })
                .catch((error) => {
                    console.log('fetch company failed =>', error.message);
                });
        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};



export const deleteCompany = (id) => {
    try {
        return (dispatch) => {
            dispatch({
                type: 'DELETE_COMPANY_PENDING',
                loading: true,
            });
            console.log('company delete pending')


            return client
                .delete(`/companies/${id}`)
                .then((response) => {
                    console.log('company eddeleteit success')
                    if (response.data) {

                        console.log(response.data)
                        dispatch({
                            type: 'DELETE_COMPANY_SUCCESS',
                            loading: false,
                        });
                        dispatch(fetchCompany())

                        return 'success';
                    }
                })
                .catch((error) => {
                    console.log('COMPANY delete failed =>', error.message);
                });
        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};

export const addCompany = (payload) => {
    try {
        return (dispatch) => {
            dispatch({
                type: 'ADD_COMPANY_PENDING',
                loading: true,
            });
            console.log('company addedd pending')


            return client
                .post(`/companies`, payload)
                .then((response) => {
                    console.log('company addedd success')
                    if (response.data) {

                        console.log(response.data)
                        dispatch({
                            type: 'ADD_COMPANY_SUCCESS',
                            loading: false,
                        });
                        dispatch(fetchCompany())

                        return 'success';
                    }
                })
                .catch((error) => {
                    console.log('COMPANY addedd failed =>', error.message);
                });
        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};








