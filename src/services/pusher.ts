import Pusher from "pusher-js";

const apiUrl = import.meta.env.VITE_APP_API_URL as string;

// Хелпер для получения куки (типизированный)
const getXsrfToken = (): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; XSRF-TOKEN=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  }
  return "";
};

const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY as string, {
  cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER as string,
  channelAuthorization: {
    endpoint: `${apiUrl}/broadcasting/auth`,
    transport: 'ajax',
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Credentials": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "X-XSRF-TOKEN": getXsrfToken(),
    },
  },
});

export default pusher;