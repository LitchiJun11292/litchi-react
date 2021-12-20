import packageJSON from "../../package.json";
export const version = packageJSON.version;
export const isInIframe = Boolean(self.frameElement && self.frameElement.tagName.toUpperCase() === "IFRAME");
//# sourceMappingURL=env.js.map