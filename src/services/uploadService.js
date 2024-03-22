import { UPLOAD_SINGLE_URL } from "constants/api";
import httpServices from "./httpServices";

class UploadService {
    uploadSingleFile(data) {
        return httpServices.post(UPLOAD_SINGLE_URL, data)
    }
}

export default new UploadService