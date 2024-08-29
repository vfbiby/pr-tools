import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
import {useEffect, useState} from "react";

export const config: PlasmoCSConfig = {
  matches: ["https://www.xiaohongshu.com/explore/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector('#noteContainer .author-container .author-wrapper .info')

// Use this to optimize unmount lookups
export const getShadowHostId = () => "xhs-explorer-inline-unique-id"

const XhsExplorerInline = () => {
  const [bloggerId, setBloggerId] = useState("")

  useEffect(() => {
    let href = document.querySelector("#noteContainer .author-container .author-wrapper .info>a").getAttribute("href")
    let urlArr = href.split('?')[0].split('/');
    let id = urlArr[urlArr.length - 1];
    setBloggerId(id)
  }, [])

  return (
    <div
      style={{
        borderRadius: 4,
        padding: 8,
        background: "pink"
      }}>
      <a href={`https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/${bloggerId}`} target="_blank">
        蒲公英首页
      </a>
    </div>
  )
}

export default XhsExplorerInline