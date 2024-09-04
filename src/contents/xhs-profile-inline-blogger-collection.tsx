import type {PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle} from "plasmo"
import {useEffect} from "react";
import {extractBloggerId} from "~src/contents/xhs-explorer-inline-blogger-link";

export const config: PlasmoCSConfig = {
  matches: ["https://www.xiaohongshu.com/user/profile/*"]
}

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = `
    button:hover {
      background-color: pink;
    }
  `
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector('.user-nickname .user-name'),
  insertPosition: "beforebegin"
})

export const getShadowHostId = () => "xhs-profile-inline-unique-id"

function getInteractions() {
  return Array.from(document.querySelectorAll('.info .data-info .user-interactions .count')).map(node => node.textContent);
}

const XhsExplorerInlineBloggerCollection = () => {
  useEffect(() => {
    const id = extractBloggerId(window.location.href);
    const username = document.querySelector('.user-nickname .user-name').textContent.trim();
    const homepage = `https://www.xiaohongshu.com/user/profile/${id}`;
    const pgyHomePage = `https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/${id}`;
    const bloggerDesc = document.querySelector('.info .user-desc').textContent.trim();
    const [following, fans, likeAndFav] = getInteractions();
    console.log({id, username, homepage, pgyHomePage, bloggerDesc, following, fans, likeAndFav})
  }, [window.location.href])
  return <>
    <button style={{padding: "10px 15px", borderRadius: 30, border: 0, margin: "0 5px"}}>+</button>
  </>
}

export default XhsExplorerInlineBloggerCollection