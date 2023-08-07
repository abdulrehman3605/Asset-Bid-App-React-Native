
const initialState = {
    allProducts: [],
    productsLoading: true,
    error: null,
    allAvailableProducts: [],
    allAvailableProductsLoading: true,
    setsLoading: false,
    allSetsFromProducts: [],
    defineSetsLoading: false,
    allDefinedSets: []


};
function availableItemsReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ALL_PRODUCTS_PENDING':
            return {
                ...state,
                productsLoading: action.productsLoading
            };
        case 'FETCH_ALL_PRODUCTS_SUCCESS':
            return {
                ...state,
                productsLoading: action.productsLoading,
                allProducts: action.allProducts
            };

        case 'FETCH_ALL_AVAILABLE_PRODUCTS_PENDING':
            return {
                ...state,
                allAvailableProductsLoading: action.productsLoading,
            };

        case 'FETCH_ALL_AVAILABLE_PRODUCTS_SUCCESS':
            return {
                ...state,
                allAvailableProductsLoading: action.productsLoading,
                allAvailableProducts: action.allAvailableProducts
            };
        case 'FETCH_ALL_SETS_FROM_PRODUCTS_PENDING':
            return {
                ...state,
                setsLoading: action.setsLoading,
            };
        case 'FETCH_ALL_SETS_FROM_PRODUCTS_SUCCESS':
            return {
                ...state,
                setsLoading: action.setsLoading,
                allSetsFromProducts: action.allSetsFromProducts
            };
        case 'FETCH_ALL_SETS_FROM_PRODUCTS_FAILED':
            return {
                ...state,
                setsLoading: action.setsLoading,
            };

        case 'DEFINE_SETS_PENDING':
            return {
                ...state,
                defineSetsLoading: action.defineSetsLoading,
            };

        case 'DEFINE_SETS_SUCCESS':
            return {
                ...state,
                defineSetsLoading: action.defineSetsLoading,
            };

        case 'DEFINE_SETS_FAILED':
            return {
                ...state,
                defineSetsLoading: action.defineSetsLoading,
            };

        case 'FETCH_ALL_DEFINED_SETS_PENDING':
            return {
                ...state,
                setsLoading: action.setsLoading,
            };

        case 'FETCH_ALL_DEFINED_SETS_SUCCESS':
            return {
                ...state,
                setsLoading: action.setsLoading,
                allDefinedSets: action.allDefinedSets
            };

        case 'FETCH_ALL_DEFINED_SETS_FAILED':
            return {
                ...state,
                setsLoading: action.setsLoading,
            };
        default:
            return state;
    }
}
export default availableItemsReducer;