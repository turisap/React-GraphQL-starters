import { SaveToState } from "./SaveToState";
import { CONFIG } from "../../config";

class CreateWithFilesUpload extends SaveToState {
  uploadFile = async e => {
    if (!e.target.files) return;
    const files = e.target.files;
    //if (!files[0]) return;
    if (files[0].type !== "image/jpeg") {
      this.setState({ uploadError: "Please upload an image file" });
      return;
    } else {
      this.setState({ uploadError: "" });
    }

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", CONFIG.CLOUDINARY_PRESET);

    const res = await fetch(CONFIG.CLOUDINARY_ENDPOINT, {
      method: "POST",
      body: data
    });

    const file = await res.json();
    //if(!file.secure_url) return;
    const urls = {
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    };
    this.setState({ ...urls });
    return urls;
  };
}

export { CreateWithFilesUpload };
