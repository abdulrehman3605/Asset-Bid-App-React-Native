import client from "../../../utils/Api";
import { useSelector, useDispatch } from 'react-redux';



export const fetchAllProducts = () => {
    // console.log(startDate, endDate, 'check this')

    try {
        console.log('about to fetch all products')
        return (dispatch) => {
            dispatch({
                type: 'FETCH_ALL_PRODUCTS_PENDING',
                productsLoading: true,
                error: null
            });
            return client
                .get(`/search?resource=product&$q=&$searchFields=name&$include=categorySize.category&$order=name&module=products-searchable-list`)
                .then((response) => {
                    console.log('items fetched success')
                    if (response.data) {
                        console.log('items=>>', response.data.data.length);

                        dispatch({
                            type: 'FETCH_ALL_PRODUCTS_SUCCESS',
                            productsLoading: false,
                            allProducts: response.data.data
                        });

                        return response.data;
                    }
                })
                .catch((error) => {
                    console.log('products  failed =>', error.message);
                    dispatch({
                        type: 'FETCH_ALL_PRODUCTS_PENDING',
                        loading: false,
                        error: error.message
                    });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error)
    }
};


export const addItemToAvailableStock = (payload) => {
    // console.log(startDate, endDate, 'check this')

    try {
        console.log('about to fetch all products')
        return (dispatch) => {
            // dispatch({
            //     type: 'FETCH_ALL_PRODUCTS_PENDING',
            //     productsLoading: true,
            //     error: null
            // });
            return client
                .post(`/kitchen-api/inventory-stock`, payload)
                .then((response) => {
                    console.log('items added success')
                    if (response.data) {
                        dispatch(fetchAllAvailableProducts())

                        // console.log('items=>>', response.data.data.length);

                        // dispatch({
                        //     type: 'FETCH_ALL_PRODUCTS_SUCCESS',
                        //     productsLoading: false,
                        //     allProducts: response.data.data
                        // });
                        console.log(response.data)

                        return 'success';
                    }
                })
                .catch((error) => {
                    console.log('products  failed =>', error.message);
                    // dispatch({
                    //     type: 'FETCH_ALL_PRODUCTS_PENDING',
                    //     loading: false,
                    //     error: error.message
                    // });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error)
    }
};

export const fetchAllAvailableProducts = () => {
    // console.log(startDate, endDate, 'check this')
    // const dispatch = useDispatch();


    try {
        return (dispatch) => {
            console.log('about to fetch all available products')

            dispatch({
                type: 'FETCH_ALL_AVAILABLE_PRODUCTS_PENDING',
                productsLoading: true,
                // error: null
            });
            return client
                .get(`/kitchen-api/inventory-stock`)
                .then((response) => {
                    console.log('available items fetched success')
                    if (response.data) {

                        // console.log(response.data)

                        dispatch({
                            type: 'FETCH_ALL_AVAILABLE_PRODUCTS_SUCCESS',
                            productsLoading: false,
                            allAvailableProducts: response.data
                            // error: null
                        });

                        return response.data;
                    }
                })
                .catch((error) => {
                    console.log('fetching available products failed =>', error.message);
                    // dispatch({
                    //     type: 'FETCH_ALL_PRODUCTS_PENDING',
                    //     loading: false,
                    //     error: error.message
                    // });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error)
    }
};



export const updateStockItemQty = (payload) => {
    console.log(payload, 'check payload')

    try {
        console.log('about to fetch all products')
        return (dispatch) => {
            // dispatch({
            //     type: 'FETCH_ALL_PRODUCTS_PENDING',
            //     productsLoading: true,
            //     error: null
            // });
            return client
                .put(`/kitchen-api/inventory-stock`, payload)
                .then((response) => {
                    console.log('items updated success')
                    dispatch(fetchAllAvailableProducts())

                    if (response.data) {
                        console.log(response.data)

                        return 'success';
                    }
                })
                .catch((error) => {
                    console.log('item update failed =>', error.message);
                    // dispatch({
                    //     type: 'FETCH_ALL_PRODUCTS_PENDING',
                    //     loading: false,
                    //     error: error.message
                    // });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error)
    }
};

export const fetchAllSetsFromProducts = () => {

    try {
        console.log('about to fetch fetchAllSetsFromProducts')
        return (dispatch) => {
            dispatch({
                type: 'FETCH_ALL_SETS_FROM_PRODUCTS_PENDING',
                setsLoading: true,
                error: null
            });
            return client
                .get(`/kitchen-api/product-sets`)
                .then((response) => {
                    console.log('sets fetched success', response.data)

                    dispatch({
                        type: 'FETCH_ALL_SETS_FROM_PRODUCTS_SUCCESS',
                        setsLoading: false,
                        allSetsFromProducts: response.data,
                        error: null
                    });


                })
                .catch((error) => {
                    console.log('sets fethced failed =>', error.message);
                    dispatch({
                        type: 'FETCH_ALL_SETS_FROM_PRODUCTS_FAILED',
                        setsLoading: false,
                        error: null
                    });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error)
    }
};

export const postItemsToSet = (payload) => {

    try {
        console.log('about to define set')
        return (dispatch) => {
            dispatch({
                type: 'DEFINE_SETS_PENDING',
                defineSetsLoading: true,
                error: null
            });
            return client
                .post(`/kitchen-api/sets/items`, payload)
                .then((response) => {
                    console.log('SETS DEFINE success', response.data)

                    dispatch({
                        type: 'DEFINE_SETS_SUCCESS',
                        defineSetsLoading: false,
                        error: null
                    });


                })
                .catch((error) => {
                    console.log('sets define failed =>', error.message);
                    dispatch({
                        type: 'DEFINE_SETS_FAILED',
                        defineSetsLoading: false,
                        error: null
                    });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error)
    }
};

export const fetchAllDefinedSets = () => {

    try {
        console.log('about to fetch all defined sets')
        return (dispatch) => {
            dispatch({
                type: 'FETCH_ALL_DEFINED_SETS_PENDING',
                setsLoading: true,
                error: null
            });
            return client
                .get(`/kitchen-api/sets/items`)
                .then((response) => {
                    console.log('defined sets fetched success', response.data)

                    dispatch({
                        type: 'FETCH_ALL_DEFINED_SETS_SUCCESS',
                        setsLoading: false,
                        allDefinedSets: response.data,
                        error: null
                    });


                })
                .catch((error) => {
                    console.log('defined sets fethced failed =>', error.message);
                    dispatch({
                        type: 'FETCH_ALL_DEFINED_SETS_FAILED',
                        setsLoading: false,
                        error: null
                    });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error)
    }
};