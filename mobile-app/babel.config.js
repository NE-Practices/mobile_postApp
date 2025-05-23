process.env.EXPO_ROUTER_APP_ROOT = "../../src/app";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "react-native-reanimated/plugin",
        {
          globals: ["__reanimatedWorkletInit"],
          reanimatedConfigPath: "./reanimatedConfig.js",
        },
      ],
    ],
  };
};
