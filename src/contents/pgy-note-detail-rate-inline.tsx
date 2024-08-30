import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
import {attachIndicatorsToElement} from "~src/libs/utils";

export const config: PlasmoCSConfig = {
  matches: ["https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  return document.querySelector('.note-data_title')
}

// Use this to optimize unmount lookups
export const getShadowHostId = () => "pgy-note-detail-inline-unique-id"

type Indicator = { name: string; value: number, rate?: { name: string, value: number, divideBy: string } };

const PgyNoteDetailRateInline = () => {
  let indicators: Indicator[];
  indicators = [
    {name: "曝光量", value: null},
    {name: "阅读量", value: null, rate: {name: "阅读率", value: null, divideBy: "曝光量"}},
    {name: "点赞量", value: null, rate: {name: "点赞率", value: null, divideBy: "阅读量"}},
    {name: "收藏量", value: null, rate: {name: "收藏率", value: null, divideBy: "阅读量"}},
    {name: "评论量", value: null, rate: {name: "评论率", value: null, divideBy: "阅读量"}},
    {name: "分享量", value: null, rate: {name: "分享率", value: null, divideBy: "阅读量"}},
    {name: "关注量", value: null, rate: {name: "关注率", value: null, divideBy: "阅读量"}},
  ];
  let allNodes = Array.from(document.querySelectorAll('.note-data_content .d-space-horizontal'));

  indicators.map(indicator => {
    let findNode = allNodes.find(n => {
      return n.textContent.trim().includes(indicator.name)
    });
    if (findNode) {
      indicator.value = parseInt(findNode.nextSibling.textContent.trim().replace(',', ''))
    }
    return indicator
  });

  indicators.map(indicator => {
    if (indicator.rate && !indicator.rate.value) {
      let divideBy = indicators.find(i => i.name === indicator.rate.divideBy).value;
      indicator.rate.value = indicator.value / divideBy
    }
    return indicator
  })

  attachIndicatorsToElement(indicators, allNodes);
}

export default PgyNoteDetailRateInline