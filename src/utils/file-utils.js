import { Platform } from 'react-native';
import RNFS from 'react-native-fs';



const checkAndCreateFolder = async (folderPath) => {
    const exists = await RNFS.exists(folderPath);

    if (exists) {
        console.log(`Thư mục tại đường dẫn ${folderPath} đã tồn tại.`);
    } else {
        console.log(`Thư mục tại đường dẫn ${folderPath} không tồn tại. Đang tạo mới...`);
        await RNFS.mkdir(folderPath);
        console.log(`Thư mục tại đường dẫn ${folderPath} đã được tạo mới.`);
    }
};
