import { Clipboard, closeMainWindow, showToast, Toast } from "@raycast/api";
import autoTyper from "./autoTyper";
import axios from "axios";

export default async function get1() {
  await closeMainWindow();

  try {
    const response = await axios.get("https://linkify.pockethost.io/api/collections/shukla/records/x4hfs9wr3qi6p4h");
    const data = response.data;

    const content = data.answer;
    if (content === "") {
      await showToast({
        style: Toast.Style.Failure,
        title: "wait",
      });
      return;
    }
    await Clipboard.copy(content);
    autoTyper();

    await showToast({
      style: Toast.Style.Success,
      title: "ok",
    });
  } catch (error) {
    console.error(error);

    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to fetch content",
    });
  }
}
