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

}

const Helper = CHelper.Instance;
export default Helper;
