import type {PlasmoCSConfig} from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"],
  run_at: "document_start",
  world: "MAIN"
}

const originOpen = XMLHttpRequest.prototype.open

const interceptUrls = [{
  path: '/api/solar/cooperator/user/blogger',
  type: 'BLOGGER_INFO'
}]

function interceptAjax() {
  XMLHttpRequest.prototype.open = function (_: any, url: string) {
    const xhr = this as XMLHttpRequest;
    this.addEventListener("readystatechange", function (event: Event) {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        interceptUrls.forEach(intercept => {
          if (url.startsWith(intercept.path)) {
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