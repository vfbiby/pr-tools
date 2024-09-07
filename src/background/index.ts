export {}

console.log(new Date().getSeconds())

const POST = chrome.declarativeNetRequest.RequestMethod.POST;
const MODIFY_HEADERS = chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS;
const SET = chrome.declarativeNetRequest.HeaderOperation.SET;
const OPTIONS = chrome.declarativeNetRequest.RequestMethod.OPTIONS;
const XMLHTTPREQUEST = chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST;

let APPEND = chrome.declarativeNetRequest.HeaderOperation.APPEND;
const testRules = [
  {
    id: 1,
    priority: 11,
    action: {
      "type": MODIFY_HEADERS,
      "requestHeaders": [
        {
          "operation": SET,
          "header": "Access-Control-Allow-Origin",
          "value": "*"
        },
      ]
    },
    condition: {
      urlFilter: "||www.kdocs.cn",
      requestMethods: [POST],
      resourceTypes: [XMLHTTPREQUEST]
    }
  },
  {
    id: 3,
    priority: 3,
    "action": {
      "type": MODIFY_HEADERS,
      "responseHeaders": [
        {
          "operation": SET,
          "header": "Access-Control-Allow-Origin",
          "value": "https://www.xiaohongshu.com"
        },
      ],
      "requestHeaders": [
        {
          "operation": SET,
          "header": "Origin",
          "value": "https://www.kdocs.cn"
        },
      ]
    },
    condition: {
      urlFilter: "||www.kdocs.cn",
      requestMethods: [OPTIONS],
      resourceTypes: [XMLHTTPREQUEST]
    }
  },
  {
    id: 4,
    priority: 9,
    "action": {
      "type": MODIFY_HEADERS,
      "responseHeaders": [
        {
          "operation": APPEND,
          "header": "Access-Control-Allow-Headers",
          "value": "airscript-token,content-type"
        },
        {
          "operation": SET,
          "header": "Access-Control-Allow-Methods",
          "value": "*"
        }
      ]
    },
    condition: {
      urlFilter: "||www.kdocs.cn",
      requestMethods: [OPTIONS],
      resourceTypes: [XMLHTTPREQUEST]
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
