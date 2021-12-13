import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import grapesjsPluginExport from "grapesjs-plugin-export";
import { addEditorCommand, storageSetting } from "./geditor_utils";

const geditorConfig = (assets, slug) => {
  const editor = grapesjs.init({
    container: "#editor",
    assetManager: { assets: assets, upload: false },
    storageManager: storageSetting(slug),
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
