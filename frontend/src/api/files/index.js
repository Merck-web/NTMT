import {$api} from "../../boot/axios";

const apiFiles = {
    getList: () => $api.post(`/files/get_all`, {}),
    upload:  request => $api.post('/files/upload', request),
    download: request => $api.post('/files/download', request, {
        responseType: 'arraybuffer',
    }),
}

export default apiFiles;