import type {PlasmoCSConfig} from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"],
  run_at: "document_start",
  world: "MAIN"
}

const originOpen = XMLHttpRequest.prototype.open

const interceptUrls = [
  {
    pattern: /\/api\/solar\/cooperator\/user\/blogger/i,
    type: 'BLOGGER_INFO'
  },
  {
    pattern: /\/api\/solar\/kol\/data_v3\/notes_rate/i,
    type: 'NOTES_RATE'
  },
  {
    pattern: /\/api\/solar\/kol\/data\/.*\/fans_profile/i,
    type: 'FANS_PROFILE'
  },
]

function interceptAjax() {
  XMLHttpRequest.prototype.open = function (_: any, url: string) {
    const xhr = this as XMLHttpRequest;
    this.addEventListener("readystatechange", function (event: Event) {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        interceptUrls.forEach(intercept => {
          if (intercept.pattern.test(url)) {
            sendResponseBack(intercept.type, event)
          }
        })
      }
    })
    return originOpen.apply(this, arguments)
  }
}

function sendResponseBack(type: string, event) {
  window.dispatchEvent(
    new CustomEvent("FROM_INJECTED", {
      detail: {type, responseText: event.target.responseText}
    })
  )
}

interceptAjax()