const initial = {
    isLogin: false,
    isLoading: false
};

export const UserRedux = (state = initial, action) => {
    switch (action.type) {
        case "requestLogin":
            return {
                isLogin: false,
                isLoading: true
            };
        case "login":
            return {
                isLogin: true,
                isLoading: false
            };
        default:
            return state;
    }
}

// action creator
export const login = () => dispatch => {
    dispatch({ type: "requestLogin" });
    //做异步操作
    setTimeout(() => {
        dispatch({ type: "login" });
    }, 2000);
}
  