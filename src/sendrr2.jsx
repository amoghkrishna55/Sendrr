import { closeMainWindow, showToast, Toast, getPreferenceValues } from "@raycast/api";
import { exec as execCallback } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import util from "util";
import axios from "axios";

export default async function sendrr1() {
  const { send2 } = getPreferenceValues();
  const exec = util.promisify(execCallback);
  const output_path_frame = path.join(os.homedir(), "Documents");
  const frame_filename = "1.png";
  const imagePath = path.join(output_path_frame, frame_filename);
  const RecCommand = `/opt/homebrew/bin/ffmpeg -t 2 -f avfoundation -i "Capture screen 0" -r 30 -vf "scale=2560x1600" -an -ss 00:00:01 -vframes 1 "${imagePath}"`;

  await closeMainWindow();
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
  await exec(RecCommand);

  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath, "base64");

    try {
      const data = {
        question: imageBuffer,
        answer: "",
      };

      const response = await axios.patch(
        `https://linkify.pockethost.io/api/collections/shukla/records/${send2}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000,
        },
      );

      console.log(response.data);
      console.log("UPDATED");

      await showToast({
        style: Toast.Style.Success,
        title: "",
      });
    } catch (e) {
      console.log(e);

      await showToast({
        style: Toast.Style.Failure,
        title: "",
        message: e.message,
      });
    }
  } else {
    await showToast({
      style: Toast.Style.Failure,
      title: "",
    });
  }
}
