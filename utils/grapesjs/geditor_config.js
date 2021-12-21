import grapesjs from "grapesjs";
import $ from "jquery";
import gjsBlockBasic from "grapesjs-blocks-basic";
import {
  addEditorCommand,
  deviceManager,
  panels,
  storageSetting,
} from "./geditor_utils";
import grapesJsPresetWebpage from "grapesjs-preset-webpage";

const geditorConfig = (assets) => {
  $("#blocks").html("");
  const editor = grapesjs.init({
    container: "#editor",
    assetManager: { assets: assets, upload: false },
    storageManager: storageSetting,
    deviceManager: deviceManager,
    panels: panels,
    plugins: [gjsBlockBasic, grapesJsPresetWebpage],
    pluginsOpts: {
      gjsBlockBasic: {},
      grapesJsPresetWebpage: {},
    },
    canvas: {
      styles: [],
      scripts: [],
    },
  });

  addEditorCommand(editor);

  setTimeout(() => {
    let categories = editor.BlockManager.getCategories();
    categories.each((category) => category.set("open", false));
  }, 1000);
  return editor;
};

export default geditorConfig;
