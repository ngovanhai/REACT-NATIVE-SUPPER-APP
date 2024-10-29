import cacheUtils from '@data-access/datacache-provider';


export function injectApplication(dispatch) {
    dispatch["application"] = {
        updateData: (data) => {
            dispatch({
                type: 'APPLICATION_UPDATE_DATA',
                data
            })
        },
        initAppData: () => dispatch(() => {
            (async () => {
                const auth = await cacheUtils.read("", "AUTH", null);
                if (auth?.account) {
                    dispatch.auth.updateData({
                        auth: auth.account,
                    });
                } else {
                    dispatch.auth.updateData({
                        auth: null,
                    });
                }
                dispatch.application.updateData({
                    inited: true
                })
            })();
        })
    }
}