import axios from "axios";
import * as Notifications from "expo-notifications";

const Global: any = global;

class CHelper {
  private static _instance: CHelper;

  private constructor() {
    // ...
  }

  public static get Instance(): CHelper {
    if (!this._instance) {
      this._instance = new this();
    }
    return CHelper._instance;
  }

  initNotification = async() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  requestPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
    }
  }

  getToken = async () => {
    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Token: ', token);
    Global.token = token.data;
    return token.data;
  }

  sendNotification = async (token: string, title: string, body: string) => {
    // Reference: https://expo.io/notifications
    const EXPO_NOTIFICATION_URL = 'https://exp.host/--/api/v2/push/send';
    const message = {
      to: token,
      sound: 'default',
      title,
      body,
      data: {token: Global.token}
    }
  
    await axios.post(EXPO_NOTIFICATION_URL, message)
    alert('Triệu hồi gấu 👦 thành công!')
  }
}

const Helper = CHelper.Instance;
export default Helper;
