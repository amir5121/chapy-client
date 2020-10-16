import {baseUrl, isProduction} from "./LocalSetting";

export const httpBaseUrl = `${isProduction ? "https" : "http"}://${baseUrl}`

export const sockBaseUrl = `${isProduction ? "wss" : "ws"}://${baseUrl}/ws/chat/`
