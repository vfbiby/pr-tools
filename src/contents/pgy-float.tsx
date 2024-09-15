import type {PlasmoCSConfig} from "plasmo"
import React, {useEffect, useState} from "react";
import {LicenseInfo} from "@mui/x-license-pro";
import {CustomTab} from "~src/components/custom-tab";
import {extractBloggerIdFromPgyHomepage} from "~src/contents/xhs-explorer-inline-blogger-link";
import {sendToBackground} from "@plasmohq/messaging";

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

const saveDataByMessage = async (data: any, type: any) => {
  const resp = await sendToBackground({
    name: 'save/blogger',
    body: {data, type}
  })
  console.log(resp.message)
};

const onMessageListener = async (e: any) => {
  const type = e.detail.type
  const response = JSON.parse(e.detail.responseText);
  if (response.code !== 0) {
    console.log("blogger info getting error!")
    return
  }
  if (!response.data.userId) {
    response.data.userId = extractBloggerIdFromPgyHomepage(window.location.href);
  }
  response.data.createdAt = new Date();
  await saveDataByMessage(response.data, type);
}

const PgyFloat = () => {
  LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    window.addEventListener("FROM_INJECTED", onMessageListener, false)
    return () => {
      window.removeEventListener("FROM_INJECTED", onMessageListener)
    }
  }, [])

  return (
    <div style={{margin: "200px 0 0 10px"}}>
      {!openPopup && <button onClick={() => setOpenPopup(true)}>show</button>}
      <CustomTab open={openPopup} onClose={() => setOpenPopup(false)}/>
    </div>
  )
}

export default PgyFloat
