import { App } from "vue";
import components from "./component";

// 所有组件
export * from "./component";

const install = (app: App) => {
  components.forEach((component) =>
    app.use(component as unknown as { install: () => any })
  );
};

export default {
  install,
};
