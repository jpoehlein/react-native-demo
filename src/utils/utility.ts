import { Platform } from "react-native";

export default class Utility {
  static isMobilePlatform() {
    return this.isAndroidPlatform || this.isIOSPlatform ? true : false;
  }
  static isAndroidPlatform() {
    return Platform.OS === "android";
  }
  static isIOSPlatform() {
    return Platform.OS === "ios";
  }
  static isWebPlatform() {
    return Platform.OS === "web";
  }
}
