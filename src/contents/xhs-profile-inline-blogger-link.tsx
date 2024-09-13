import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
import {useEffect} from "react";
import {extractBloggerId} from "~src/contents/xhs-explorer-inline-blogger-link";

export const config: PlasmoCSConfig = {
  matches: ["https://www.xiaohongshu.com/user/profile/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: (document.querySelectorAll('.reds-sticky .reds-tab-item'))[1],
  insertPosition: "afterend"
})

export const getShadowHostId = () => "xhs-profile-inline-unique-id"

function pgyPageLink(bloggerId: string) {
  return `<div class="reds-tab-item sub-tab-list" style="padding:0 16px;margin-right:0;font-size:16px;">
    <span>
      <a style="color: white;padding: 8px 16px; border-radius: 16px;background-color: #3765f9;" href="https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/${bloggerId}" target="_blank">
        蒲公英
      </a>
    </span>
  </div>`
}

const XhsExplorerInlineBloggerLink = () => {
  useEffect(() => {
    const id = extractBloggerId(window.location.href);
    if (!id) return
    const doc = new DOMParser().parseFromString(pgyPageLink(id), 'text/html');
    const element = doc.body.firstChild;
    document.querySelector('.reds-sticky>.reds-tabs-list').append(element)
  }, [window.location.href])
}

export default XhsExplorerInlineBloggerLink