import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
import {useEffect, useState} from "react";
import {extractBloggerId, PgyHomePage} from "~src/contents/xhs-explorer-inline-blogger-link";

export const config: PlasmoCSConfig = {
  matches: ["https://www.xiaohongshu.com/user/profile/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: (document.querySelectorAll('.reds-sticky .reds-tab-item'))[1],
  insertPosition: "afterend"
})

// Use this to optimize unmount lookups
export const getShadowHostId = () => "xhs-profile-inline-unique-id"

const XhsExplorerInlineBloggerLink = () => {
  const [bloggerId, setBloggerId] = useState("")

  useEffect(() => {
    let id = extractBloggerId(window.location.href);
    setBloggerId(id)
  }, [window.location.href])

  return (
    <PgyHomePage bloggerId={bloggerId}/>
  )
}

export default XhsExplorerInlineBloggerLink