import { GET_MOVIES } from './actions';
const initialState = {
    user: {},
    jwt: null,
    loginLoading: false,
    error: null,
    fetchRidersLoading: false,
    riders: [],
    addRiderLoading: false,
    deleteRiderLoading: false,
    fetchCompanyLoading: false,
    crudCompanyLoading: false,
    companies: []

};
function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                jwt: action.token,
                user: action.user,
                loginLoading: false
            };
        case 'LOGIN_PENDING':
            return {
                ...state,
                loginLoading: action.loading,
                error: null
            };

        case 'LOGIN_FAILED':
            return {
                ...state,
                loginLoading: action.loading,
                error: action.error
            };

        case 'FETCH_RIDERS_PENDING':
            return {
                ...state,
                fetchRidersLoading: action.loading,
            };

        case 'FETCH_RIDERS_SUCCESS':
            return {
                ...state,
                fetchRidersLoading: action.loading,
                riders: action.riders
            };

        case 'ADD_RIDERS_PENDING':
            return {
                ...state,
                addRiderLoading: action.loading,
            };

        case 'ADD_RIDERS_SUCCESS':
            return {
                ...state,
                addRiderLoading: action.loading,
            };

        case 'DELETE_RIDERS_PENDING':
            return {
                ...state,
                deleteRiderLoading: action.loading,
            };

        case 'DELETE_RIDERS_SUCCESS':
            return {
                ...state,
                deleteRiderLoading: action.loading,
            };

        case 'FETCH_COMPANY_PENDING':
            return {
                ...state,
                fetchCompanyLoading: action.loading,
            };

        case 'FETCH_COMPANY_SUCCESS':
            return {
                ...state,
                fetchCompanyLoading: action.loading,
                companies: action.companies
            };

        case 'EDIT_COMPANY_PENDING':
            return {
                ...state,
                crudCompanyLoading: action.loading,
            };

        case 'EDIT_COMPANY_SUCCESS':
            return {
                ...state,
                crudCompanyLoading: action.loading,
            };

        case 'DELETE_COMPANY_PENDING':
            return {
                ...state,
                crudCompanyLoading: action.loading,
            };

        case 'DELETE_COMPANY_SUCCESS':
            return {
                ...state,
                crudCompanyLoading: action.loading,
            };
        case 'ADD_COMPANY_PENDING':
            return {
                ...state,
                crudCompanyLoading: action.loading,
            };
        case 'ADD_COMPANY_SUCCESS':
            return {
                ...state,
                crudCompanyLoading: action.loading,
            };

        case 'CLEAR_ERROR':
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}
export default userReducer;