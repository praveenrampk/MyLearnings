import { get } from "lodash";
import { setStateAlertData } from "../store";
import { getBackendUrl } from "../utils/helpers";
import { backendRoutes } from "../utils/routes";

export const getPrices = async () => {
  try {
    let response = await fetch(`${getBackendUrl()}${backendRoutes.prices}`);
    response = await response.json();

    if (get(response, "code", 0) !== 200) {
      setStateAlertData({
        title: "Get Prices",
        type: "error",
        message: get(response, "message", ""),
      });
    }

    return get(response, "data", {});
  } catch (err) {
    console.log("Error in get prices", err);
    setStateAlertData({
      title: "Get Prices",
      type: "error",
      message: err.message,
    });
  }
};
