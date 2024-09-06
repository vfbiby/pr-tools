export {}

console.log(new Date().getSeconds())

const testRules = [
  {
    id: 1,
    priority: 11,
    action: {
      "type": "modifyHeaders",
      "requestHeaders": [
        // {
        //   "operation": "set",
        //   "header": "Access-Control-Allow-Credentials",
        //   "value": "false"
        // },
        {
          "operation": "set",
          "header": "Access-Control-Allow-Origin",
          "value": "*"
        },
        // {
        //   "operation": "set",
        //   "header": "Origin",
        //   // "value": "http://www.xiaohongshu.com"
        //   "value": "http://www.kdocs.cns"
        // },
      ]
    },
    condition: {
      urlFilter: "||www.kdocs.cn",
      requestMethods: ['post'],
      resourceTypes: ["xmlhttprequest"]
    }
  },
  // {
  //   id: 2,
  //   priority: 6,
  //   "action": {
  //     "type": "modifyHeaders",
  //     "responseHeaders": [
  //       {
  //         "operation": "remove",
  //         "header": "Access-Control-Allow-Headers",
  //       },
  //       {
  //         "operation": "remove",
  //         "header": "Access-Control-Expose-Headers",
  //       },
  //     ]
  //   },
  //   condition: {
  //     urlFilter: "||www.kdocs.cn",
  //     requestMethods: ['options'],
  //     resourceTypes: ["xmlhttprequest"]
  //   }
  // },
  {
    id: 3,
    priority: 3,
    "action": {
      "type": "modifyHeaders",
      "responseHeaders": [
        // {
        //   "operation": "set",
        //   "header": "Access-Control-Allow-Credentials",
        //   "value": "true"
        // },
        {
          "operation": "set",
          "header": "Access-Control-Allow-Origin",
          // "value": "https://www.xiaohongshu.com"
          "value": "*"
        },
        // {
        //   "operation": "append",
        //   "header": "Access-Control-Allow-Headers",
        //   "value": "airscript-token,content-type"
        // }
      ],
      "requestHeaders": [
        {
          "operation": "set",
          "header": "Origin",
          "value": "http://www.kdocs.cn"
        },
      ]
    },
    condition: {
      urlFilter: "||www.kdocs.cn",
      requestMethods: ['options'],
      resourceTypes: ["xmlhttprequest"]
    }
  },
  {
    id: 4,
    priority: 9,
    "action": {
      "type": "modifyHeaders",
      "responseHeaders": [
        {
          "operation": "set",
          "header": "Access-Control-Allow-Headers",
          "value": "airscript-token, content-type"
        }
      ]
    },
    condition: {
      urlFilter: "||www.kdocs.cn",
      requestMethods: ['options'],
      resourceTypes: ["xmlhttprequest"]
    }
  }
];


async function applyRules() {
// Get arrays containing new and old rules
  const newRules = testRules
//   const newRules = requestRules
  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  console.log(oldRules)
  const oldRuleIds = oldRules.map(rule => rule.id);

// Use the arrays to update the dynamic rules
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRuleIds,
    // addRules: [],
    addRules: newRules,
  });
}

applyRules();
