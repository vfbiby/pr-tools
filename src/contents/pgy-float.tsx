import type {PlasmoCSConfig} from "plasmo"
import React, {useState} from "react";
import {LicenseInfo} from "@mui/x-license-pro";
import {CustomTab} from "~src/components/custom-tab";

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

const PgyFloat = () => {
  LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

  const [openPopup, setOpenPopup] = useState(false)
  return (
    <div style={{margin: "200px 0 0 10px"}}>
      {!openPopup && <button onClick={() => setOpenPopup(true)}>show</button>}
      <CustomTab open={openPopup} onClose={() => setOpenPopup(false)}/>
    </div>
  )
}

export default PgyFloat
