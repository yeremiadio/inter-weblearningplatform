import grapesjs from "grapesjs";
import $ from "jquery";
import gjsBlockBasic from "grapesjs-blocks-basic";
import grapesjsPluginExport from "grapesjs-plugin-export";
import {
  addEditorCommand,
  deviceManager,
  layerManager,
  panels,
  scripts,
  selectorManager,
  storageSetting,
  styleManager,
  styles,
  traitManager,
} from "./geditor_utils";

const geditorConfig = (assets) => {
  $("#blocks").html("");
  const editor = grapesjs.init({
    container: "#editor",
    assetManager: { assets: assets, upload: false },
    storageManager: storageSetting,
    plugins: [gjsBlockBasic, grapesjsPluginExport],
    pluginsOpts: {
      tailwindComponent: {},
      gjsBlockBasic: {},
      grapesjsPluginExport: {},
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
