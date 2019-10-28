// this file is for combining all action files and export only 1 file
export {
    addIngredient,
    removeIngredient,
    initIngredients,
    setIngredients,
    setError
} from './burgerBuilder';

export {
    purchaseBurger,
    getOrders,
    purchaseBurgerFail,
    purchaseBurgerSuccess,
    loading,
    resetPrice,
    orderSuccess,
    ordersFailure
} from './order';

export {
    login,
    logout,
    setAuthRedirectPath,
    getUserDetailsFromLocalStorage,
    logoutSucceed,
    auth_logout,
    authStart,
    authSuccess,
    authFail
} from './auth';