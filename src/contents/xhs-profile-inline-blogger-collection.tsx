import type {PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle} from "plasmo"
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {extractBloggerId} from "~src/contents/xhs-explorer-inline-blogger-link";
import {type BloggerTable, createRecordsTo} from "~src/libs/wps";
import {SaveBloggerButton} from "~src/components/save-blogger-button";
import SimpleDialogDemo from "~src/components/SimpleDialog";

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

export async function addBloggerToWps(blogger: BloggerTable) {
  return await createRecordsTo<BloggerTable>('达人登记', [{fields: blogger}]);
}

const XhsExplorerInlineBloggerCollection = () => {
  const [blogger, setBlogger] = useState<BloggerTable>()

  useEffect(() => {
    const id = extractBloggerId(window.location.href);
    const username = document.querySelector('.user-nickname .user-name').textContent.trim();
    const homepage = `https://www.xiaohongshu.com/user/profile/${id}`;
    const pgyHomePage = `https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/${id}`;
    const bloggerDesc = document.querySelector('.info .user-desc').textContent.trim();
    const [following, fans, likeAndFav] = getInteractions();
    const xhsBlogger = {id, username, homepage, pgyHomePage, bloggerDesc, following, fans, likeAndFav};
    setBlogger({账号名: username, 博主ID: id, 首页链接: homepage, 蒲首页: pgyHomePage})
  }, [window.location.href])

  return <>
    <SaveBloggerButton bloggerInfo={blogger}/>
  </>
}

export default XhsExplorerInlineBloggerCollection