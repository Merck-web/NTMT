import {$api} from "../../boot/axios";

const apiFiles = {
    getList: () => $api.post(`/files/get_all`, {}),
    upload:  request => $api.post('/files/upload', request),
}

export default apiFiles;