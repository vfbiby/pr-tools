import type {PlasmoCSConfig} from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"],
  run_at: "document_start",
  world: "MAIN"
}

const originOpen = XMLHttpRequest.prototype.open

function interceptAjax() {
  XMLHttpRequest.prototype.open = function (_: any, url: string) {
    const xhr = this as XMLHttpRequest;
    this.addEventListener("readystatechange", function (event: Event) {
      if (xhr.readyState === 4) {
        if (isBloggerInfoUrl(url)) {
          sendResponseBack("BLOGGER_INFO", event)
        }
      }
    })
    return originOpen.apply(this, arguments)
  }
}

function isBloggerInfoUrl(url: string) {
  return url.startsWith("/api/solar/cooperator/user/blogger")
}

function isNotesDetailUrl(url: string) {
  return url.includes("/api/solar/kol/dataV2/notesDetail")
}

function sendResponseBack(type: string, event) {
  window.dispatchEvent(
    new CustomEvent("FROM_INJECTED", {
      detail: {type, responseText: event.target.responseText}
    })
  )
}

interceptAjax()