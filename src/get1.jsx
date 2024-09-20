import { Clipboard, closeMainWindow, showToast, Toast, getPreferenceValues } from "@raycast/api";
import autoTyper from "./autoTyper";
import axios from "axios";

export default async function get1() {
  const { send1 } = getPreferenceValues();
  await closeMainWindow();

  try {
    const response = await axios.get(`https://linkify.pockethost.io/api/collections/shukla/records/${send1}`);
    const data = response.data;

    const content = data.answer;
    if (content === "") {
      await showToast({
        style: Toast.Style.Failure,
        title: "t",
      });
      return;
    }
    await Clipboard.copy(content);
    autoTyper();

    await showToast({
      style: Toast.Style.Success,
      title: "",
    });
  } catch (error) {
    console.error(error);

    await showToast({
      style: Toast.Style.Failure,
      title: "",
    });
  }
}
