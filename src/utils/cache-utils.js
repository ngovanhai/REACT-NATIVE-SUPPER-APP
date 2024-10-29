import AsyncStorage from "@react-native-community/async-storage";
module.exports = {
  save(userId, key, value) {
    try {
      return AsyncStorage.setItem(
        userId + "_" + key,
        JSON.stringify({
          value: value,
        })
      );
    } catch (error) {
      Promise.reject(error);
      // console.log(error);
    }
  },

  read(userId, key, defaultValue) {
    return new Promise(async (resolve, reject) => {
      try {
        AsyncStorage.getItem(userId + "_" + key).then((value) => {
          if (value) {
            let json = JSON.parse(value);
            resolve(json.value);
          } else {
            resolve(defaultValue);
          }
        });
      } catch (e) {
        resolve(defaultValue);
      }
    });
  },
};
