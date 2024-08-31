import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
import {useEffect, useState} from "react";

export const config: PlasmoCSConfig = {
  matches: ["https://www.xiaohongshu.com/user/profile/*", "https://www.xiaohongshu.com/explore*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector('#noteContainer .author-container .author-wrapper .info')

// Use this to optimize unmount lookups
export const getShadowHostId = () => "xhs-explorer-inline-unique-id"

export function PgyHomePage(props: { bloggerId: string }) {
  return <div
    style={{
      borderRadius: 4,
      padding: 8,
      boxShadow: "10px 5px 5px black",
      // boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
      background: "pink"
    }}>
    <a href={`https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/${props.bloggerId}`} target="_blank">
      蒲公英首页
    </a>
  </div>;
}

export function extractBloggerId(href: string) {
  let urlArr = href.split('?')[0].split('/');
  return urlArr[urlArr.length - 1];
}

const XhsExplorerInlineBloggerLink = () => {
  const [bloggerId, setBloggerId] = useState("")

  useEffect(() => {
    let href = document.querySelector("#noteContainer .author-container .author-wrapper .info>a").getAttribute("href")
    let id = extractBloggerId(href);
    setBloggerId(id)
  }, [])

  return <PgyHomePage bloggerId={bloggerId}/>
}

export default XhsExplorerInlineBloggerLink