import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
import {useEffect, useState} from "react";

export const config: PlasmoCSConfig = {
  matches: ["https://www.xiaohongshu.com/user/profile/*", "https://www.xiaohongshu.com/explore*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector('#noteContainer .author-container .author-wrapper .info')

export const getShadowHostId = () => "xhs-explorer-inline-unique-id"

export function PgyHomePage(props: { bloggerId: string }) {
  return <div>
    <a
      style={{
        textDecoration: "none",
        color: 'white',
        padding: '8px 16px',
        borderRadius: '16px',
        backgroundColor: '#3765f9'
      }}
      href={`https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/${props.bloggerId}`} target="_blank">
      蒲公英
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