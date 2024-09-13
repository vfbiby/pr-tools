import type {PlasmoCSConfig} from "plasmo"
import {type Dispatch, type SetStateAction, useState} from "react";
import {sendToBackground} from "@plasmohq/messaging";
import type {IBloggerInfo} from "~src/libs/BloggerInfo";
import {LicenseInfo} from "@mui/x-license-pro";
import {BloggerInfoPopup} from "~src/components/blogger-info-popup";

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

export function getBloggerInfo(setRemoteBloggerInfo: Dispatch<SetStateAction<IBloggerInfo[]>>) {
  sendToBackground({
    name: "read/blogger-info"
  }).then(response => {
    setRemoteBloggerInfo(response.data)
  })
}

const PgyFloat = () => {
  LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

  const [openPopup, setOpenPopup] = useState(false)
  return (
    <div style={{margin: "200px 0 0 10px"}}>
      {!openPopup && <button onClick={() => setOpenPopup(true)}>show</button>}
      <BloggerInfoPopup open={openPopup} onClose={() => setOpenPopup(false)}/>
    </div>
  )
}

export default PgyFloat
