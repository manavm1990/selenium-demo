export default [
  {
    "bstack:options": {
      os: "Windows",
      osVersion: "11",
      buildName: "browserstack-build-1",
      sessionName: "Parallel test 1",
    },
    browserName: "chrome",
    browserVersion: "103.0",
  },
  {
    "bstack:options": {
      os: "Windows",
      osVersion: "10",
      buildName: "browserstack-build-1",
      sessionName: "Parallel test 2",
    },
    browserName: "firefox",
    browserVersion: "102.0",
  },
  {
    "bstack:options": {
      deviceName: "iPhone 12 Pro Max",
      osVersion: "16 Beta",
      buildName: "browserstack-build-1",
      sessionName: "Parallel test 3",
    },
    browserName: "ios",
  },
];
