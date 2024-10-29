
// import userProvider from '@data-access/user-provider';
import messageUtils from '@utils/message-utils';
import cachingData from "@data-access/datacache-provider"
import NavigationService from '@navigators/NavigationService';
import { Routes } from '@resources';
import { hideLoading, showLoading } from "@src";


export function injectAuth(dispatch) {
	dispatch["auth"] = {
		updateData: (data) => {
			dispatch({
				type: 'AUTH_UPDATE_DATA',
				data
			})
		},
		logout: () => {
			return dispatch(() => {
				cachingData.save("", "AUTH", null);
				dispatch.auth.updateData({ auth: null, userProfile: null });
				NavigationService.reset(Routes.loginScreen);
			});
		},
		// onLogin: (email, password, token) => {
		// 	return dispatch(() => {
		// 		showLoading();
		// 		userProvider.login(email, password, token).then(s => {
		// 			// s.data.access_token += "1";
		// 			cachingData.save("", "AUTH", { account: s.data });
		// 			dispatch.auth.updateData({ auth: s.data })
		// 			dispatch.auth.getUserProfile(s.data.id);
		// 			dispatch.chamCong.getListKhuVucChamCong(s.data.id);
		// 			NavigationService.reset(Routes.tabs);
		// 		}).catch(err => {
		// 			messageUtils.error(err.message);
		// 		}).finally(() => {
		// 			setTimeout(() => {
		// 				hideLoading();
		// 			}, 200);
		// 		});
		// 	});
		// },
		// onRefreshToken: () => {
		// 	return dispatch((_, getState) => {
		// 		return new Promise((resolve, reject) => {
		// 			const state = getState();
		// 			if (!state.auth.doRefeshToken) {
		// 				// nếu đang không có request nào request refresh token thì thực hiện
		// 				if (
		// 					state.auth.refreshTime && //trong trường hợp refresh thực hiện gần đây khoảng 5p thì resolve true luôn
		// 					new Date() - state.auth.refreshTime < 5 * 60000
		// 				) {
		// 					resolve(true);
		// 					return;
		// 				}
		// 				//ngược lại thì đánh dấu là đang request refresh
		// 				dispatch.auth.updateData({ doRefeshToken: true });
		// 				const refreshToken = state.auth.auth?.refresh_token;
		// 				userProvider
		// 					.refreshToken({ refreshToken })
		// 					.then((s) => {
		// 						cachingData.save("", "AUTH", { account: s.data });
		// 						//sau khi request xong thì lưu lại thời gian refresh token và đánh dấu là đã hoàn thành đồng thời cập nhật lại auth
		// 						dispatch.auth.updateData({
		// 							auth: s?.data,
		// 							doRefeshToken: false,
		// 							refreshTime: new Date(),
		// 						});
		// 						//resolve true
		// 						resolve(s?.data);
		// 					})
		// 					.catch((e) => {
		// 						if (e?.code == 602) {
		// 							dispatch.auth.logout();
		// 						}
		// 						//nếu có exception thì reject và đánh dấu là đã hoàn thành
		// 						reject(e);
		// 						dispatch.auth.updateData({
		// 							doRefeshToken: false,
		// 						});
		// 					});
		// 			} else {
		// 				// ngược lại thì chờ tiếp 2s rồi thực hiện
		// 				setTimeout(() => {
		// 					dispatch.auth.onRefreshToken()
		// 						.then((s) => {
		// 							resolve(s);
		// 						})
		// 						.catch((e) => {
		// 							reject(e);
		// 						});
		// 				}, 2000);
		// 			}

		// 		});
		// 	});
		// },
	}
}