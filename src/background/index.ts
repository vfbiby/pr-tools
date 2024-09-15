export {}

const post = chrome.declarativeNetRequest.RequestMethod.POST;
const MODIFY_HEADERS = chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS;
const SET = chrome.declarativeNetRequest.HeaderOperation.SET;
const OPTIONS = chrome.declarativeNetRequest.RequestMethod.OPTIONS;
const xmlhttprequest = chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST;
const APPEND = chrome.declarativeNetRequest.HeaderOperation.APPEND;
const thirdParty = chrome.declarativeNetRequest.DomainType.THIRD_PARTY;

const ruleForPost = {
  id: 1,
  priority: 11,
  action: {
    "type": MODIFY_HEADERS,
    "requestHeaders": [
      {
        "operation": SET,
        "header": "Origin",
        "value": "https://www.kdocs.cn"
      },
    ],
    responseHeaders: [
      {
        "operation": SET,
        "header": "Access-Control-Allow-Origin",
        "value": "*"
      },
    ]
  },
  condition: {
    urlFilter: "||www.kdocs.cn",
    domainType: thirdParty,
    requestMethods: [post],
    resourceTypes: [xmlhttprequest]
  }
};

const ruleForOption = {
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
        "header": "Access-Control-Allow-Origin",
        "value": "https://www.xiaohongshu.com"
      },
      {
        "operation": SET,
        "header": "Access-Control-Allow-Methods",
        "value": "*"
      }
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
    domainType: thirdParty,
    resourceTypes: [xmlhttprequest]
  }
};

const addRules = [ruleForPost, ruleForOption];

async function applyRules() {
  const newRules = addRules
  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  const oldRuleIds = oldRules.map(rule => rule.id);

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRuleIds,
    addRules: newRules,
  });
}

applyRules();
