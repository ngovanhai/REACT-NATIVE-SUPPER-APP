import { injectApplication } from "../redux-store/actions/application";
import { injectAuth } from "../redux-store/actions/auth";
export const injectAction = (dispatch) => {
    [
        injectApplication,
        injectAuth,
    ].map(item => item(dispatch))
}