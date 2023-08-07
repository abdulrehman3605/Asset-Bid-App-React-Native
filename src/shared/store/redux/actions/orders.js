import client from "../../../utils/Api";
import { fetchAllAvailableProducts } from "./availableItems";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getOrders = (startDate, endDate) => {
    console.log(startDate, endDate, 'check this')
    // const jsonValue = AsyncStorage.getItem('token');
    // console.log(typeof (JSON.stringify(jsonValue)), 'jjjssss')


    try {
        console.log('about to get orders')
        return (dispatch) => {
            dispatch({
                type: 'GET_ORDERS_PENDING',
                loading: true,
                error: null
            });
            return client
                .get(`/search?resource=order&$offset=0&$limit=&$order=-createdAt&$include=order_items,order_items.product.base_product,order_items.toppings.product,order_items.product.categorySize.category,customer,delivery_type&module=fulfilment&createdAt[$gte]=${startDate}&createdAt[$lt]=${endDate}`)
                .then(async (response) => {
                    console.log('orders fetched success')
                    if (response.data) {
                        console.log('orderss=>>', response.data.data.length);


                        const pendingOrders = response.data.data.filter((item) => {
                            const initialValue = 0

                            const fulfilledQTY = item?.order_items?.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.fulfilledQty,
                                initialValue
                            );

                            return fulfilledQTY == 0
                        })    // there is an error here logical
                        const IncompleteOrders = response.data.data.filter((item) => {
                            // console.log(item, 'seee')
                            const initialValue = 0
                            const totalQuantity = item?.order_items?.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.quantity,
                                initialValue
                            );
                            const fulfilledQTY = item?.order_items?.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.fulfilledQty,
                                initialValue
                            );
                            // console.log('this is filfilledQTY q', fulfilledQTY)
                            // console.log('this is totalQuantity q', totalQuantity)

                            return (fulfilledQTY > 0 && totalQuantity !== fulfilledQTY)
                        })
                        // console.log(IncompleteOrders, 'these are IncompleteOrders')

                        const CompletedOrders = response.data.data.filter((item) => {
                            const initialValue = 0
                            if (item.id == "8ed0a790-ed18-4589-8d4c-508b47331594") {
                                console.log(item, 'item you looking for')
                            }
                            const totalQuantity = item?.order_items?.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.quantity,
                                initialValue
                            );
                            const fulfilledQTY = item?.order_items?.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.fulfilledQty,
                                initialValue
                            );
                            if (totalQuantity == fulfilledQTY) {
                                return 'true'
                            }
                            return totalQuantity == fulfilledQTY
                        })
                        // console.log(CompletedOrders, 'completedOrders')

                        dispatch({
                            type: 'GET_ORDERS_SUCCESS',
                            orders: response.data.data,
                            pendingOrders: pendingOrders,
                            incompleteOrders: IncompleteOrders,
                            completedOrders: CompletedOrders,
                            loading: false
                        });

                        dispatch(fetchAllAvailableProducts())

                        // return response.data.data;
                        return response.data.data;
                    }
                })
                .catch((error) => {
                    console.log('orders failed =>', error);
                    dispatch({
                        type: 'GET_ORDERS_FAILED',
                        loading: false,
                        error: error.message
                    });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};


export const orderFulfillment = (payload) => {
    // console.log(startDate, endDate, 'check this')

    try {
        console.log('about to fulfill order')
        return (dispatch) => {
            dispatch({
                type: 'FULFILL_ORDER_PENDING',
                fulfillOrderLoading: true,
                error: null
            });
            return client
                .post(`/kitchen-api/fulfil-order`, payload)
                .then(async (response) => {
                    console.log('orders fetched success')
                    if (response.data) {
                        console.log('orderss=>>', response.data);


                        dispatch({
                            type: 'FULFILL_ORDER_SUCCESS',
                            fulfillOrderLoading: false,
                        });

                        return 'success';
                    }
                })
                .catch((error) => {
                    console.log('fulfillment failed =>', error.message);
                    // dispatch({
                    //     type: 'GET_ORDERS_FAILED',
                    //     loading: false,
                    //     error: error.message
                    // });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};

export const getOrderDispatchInfo = (orderId) => {
    // console.log(startDate, endDate, 'check this')

    try {
        console.log('about to get order dispatch info')
        return (dispatch) => {
            dispatch({
                type: 'ORDER_DISPATCH_INFO_PENDING',
                loading: true,
                error: null
            });
            return client
                .get(`/kitchen-api/dispatch-orders?orderId=${orderId}`)
                .then(async (response) => {
                    console.log('orders dispatch Info success')
                    if (response.data) {
                        console.log('dispatch Info=>>', response.data);


                        dispatch({
                            type: 'ORDER_DISPATCH_INFO_SUCCESS',
                            loading: false,
                        });

                        return response.data;
                    }
                })
                .catch((error) => {
                    console.log('dispatch Info failed =>', error.message);
                    // dispatch({
                    //     type: 'ORDER_DISPATCH_INFO_FAILED',
                    //     loading: false,
                    //     error: error.message
                    // });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};



export const dispatchOrdersWithPriority = (payload) => {
    // console.log(startDate, endDate, 'check this')

    try {
        console.log('about to dispatch Orders')
        return (dispatch) => {
            dispatch({
                type: 'ORDER_DISPATCH_PENDING',
                loading: true,
                error: null
            });
            return client
                .post(`/kitchen-api/dispatch-orders`, payload)
                .then(async (response) => {
                    console.log('orders dispatch success')
                    if (response.data) {
                        console.log('dispatch Info=>>', response.data);


                        dispatch({
                            type: 'ORDER_DISPATCH_SUCCESS',
                            loading: false,
                        });

                        return response.data;
                    }
                })
                .catch((error) => {
                    console.log('dispatch failed =>', error.message);
                    // dispatch({
                    //     type: 'ORDER_DISPATCH_INFO_FAILED',
                    //     loading: false,
                    //     error: error.message
                    // });
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};


export const showSelectedOrderDetails = (item) => {

    // console.log('selected order set succesfully', item)

    return (dispatch) => {
        dispatch({
            type: 'SET_SELECTED_ORDER',
            selectedOrderDetails: item
        });
    }

};

export const getItemsForSetInOrder = (orderId, setId) => {
    // console.log(startDate, endDate, 'check this')

    try {
        console.log('about to getItemsForSetInOrder')
        return (dispatch) => {
            return client
                .get(`/kitchen-api/sets/items?setId=${setId}&orderId=${orderId}`)
                .then(async (response) => {
                    console.log('getItemsForSetInOrder success')
                    if (response.data) {
                        console.log('getItemsForSetInOrder=>>', response.data);
                        return response.data;
                    }
                })
                .catch((error) => {
                    console.log('dispatch Info failed =>', error.message);
                });

        }
    } catch (error) {
        // Add custom logic to handle errors
    }
};