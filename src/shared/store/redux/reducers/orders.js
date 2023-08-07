
const initialState = {
    ordersForDay: [],
    pendingOrders: [],
    incompleteOrders: [],
    completedOrders: [],
    loading: false,
    error: null,
    fulfillOrderLoading: false,
    orderDispatchInfoLoading: false,
    postOrderDispatchLoading: false,
    selectedOrderDetails: {}
    // jwt: null
};
function OrdersReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ORDERS_SUCCESS':
            return {
                ...state,
                ordersForDay: action.orders,
                pendingOrders: action.pendingOrders,
                incompleteOrders: action.incompleteOrders,
                completedOrders: action.completedOrders,
                loading: false
            };
        case 'GET_ORDERS_PENDING':
            return {
                ...state,
                loading: action.loading,
                error: action.error
            };
        case 'FULFILL_ORDER_PENDING':
            return {
                ...state,
                fulfillOrderLoading: action.fulfillOrderLoading,
                error: action.error
            };

        case 'FULFILL_ORDER_SUCCESS':
            return {
                ...state,
                fulfillOrderLoading: action.fulfillOrderLoading,
            };
        case 'ORDER_DISPATCH_INFO_PENDING':
            return {
                ...state,
                orderDispatchInfoLoading: action.loading,
            };
        case 'ORDER_DISPATCH_INFO_SUCCESS':
            return {
                ...state,
                orderDispatchInfoLoading: action.loading,
            };
        case 'ORDER_DISPATCH_PENDING':
            return {
                ...state,
                postOrderDispatchLoading: action.loading,
            };

        case 'ORDER_DISPATCH_SUCCESS':
            return {
                ...state,
                postOrderDispatchLoading: action.loading,
            };


        case 'SET_SELECTED_ORDER':
            return {
                ...state,
                selectedOrderDetails: action.selectedOrderDetails,
            };
        default:
            return state;
    }
}
export default OrdersReducer;