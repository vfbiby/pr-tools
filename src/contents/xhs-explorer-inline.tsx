import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.xiaohongshu.com/explore/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector('#noteContainer .author-container .author-wrapper .info')

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const XhsExplorerInline = () => {
  return (
    <div
      style={{
        borderRadius: 4,
        padding: 4,
        background: "pink"
      }}>
      <a href="https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/667a7a3a00000000070047c5" target="_blank">
        蒲公英首页
      </a>
    </div>
  )
}

export default XhsExplorerInline