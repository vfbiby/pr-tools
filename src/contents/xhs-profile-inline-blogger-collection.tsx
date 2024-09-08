import type {PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle} from "plasmo"
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {extractBloggerId} from "~src/contents/xhs-explorer-inline-blogger-link";
import {type BloggerTable, createRecordsTo} from "~src/libs/wps";
import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";
import {LoadingButton} from "@mui/lab";

export const config: PlasmoCSConfig = {
  matches: ["https://www.xiaohongshu.com/user/profile/*"]
}

// export const getStyle: PlasmoGetStyle = () => {
//   const style = document.createElement("style")
//   style.textContent = `
//     button:hover {
//       background-color: pink;
//     }
//   `
//   return style
// }

const styleElement = document.createElement("style")

const styleCache = createCache({
  key: "plasmo-mui-cache",
  prepend: false,
  container: styleElement
})

export const getStyle = () => styleElement

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector('.user-nickname .user-name'),
  insertPosition: "beforebegin"
})

export const getShadowHostId = () => "xhs-profile-inline-unique-id"

function getInteractions() {
  return Array.from(document.querySelectorAll('.info .data-info .user-interactions .count')).map(node => node.textContent);
}

async function addBloggerToWps(blogger: BloggerTable, setLoading: Dispatch<SetStateAction<boolean>>) {
  setLoading(true)
  await createRecordsTo<BloggerTable>('达人登记', [{fields: blogger}]);
  setLoading(false)
}

const XhsExplorerInlineBloggerCollection = () => {
  const [blogger, setBlogger] = useState<BloggerTable>()
  const [loading, setLoading] = useState<boolean>(false)

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
    <CacheProvider value={styleCache}>
      <LoadingButton sx={{mr: 1, borderRadius: 10}} variant="outlined" loading={loading}
                     onClick={() => addBloggerToWps(blogger, setLoading)}>save</LoadingButton>
    </CacheProvider>
  </>
}

export default XhsExplorerInlineBloggerCollection