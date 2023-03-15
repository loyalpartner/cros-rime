import { LocalStorage } from "src/api/extension/storage";
import { registerEventDisposable } from "src/api/extension/event";
import { addBeforeUnloadInfo, removeBeforeUnloadInfo } from "src/api/common/window";
import { changeGlobalConsole } from "src/api/common/console";

import { setGlobalLocalStorageInstance } from "./model/storage";
import { ChromeOSController } from "./controller/chromeos";

async function main() {
  changeGlobalConsole("decoder-page");
  setGlobalLocalStorageInstance(LocalStorage<any>);

  let controller = new ChromeOSController();

  await controller.initialize();

  controller.registerLifecycleEvent();
  controller.registerIMElifecycleEvent();
  controller.registerIMEEvent();
  controller.registerModelEvent();

  addBeforeUnloadInfo("当前IME正在运行.");
}

main();
