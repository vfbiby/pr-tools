import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
import {assignIndicatorsValue, attachIndicatorsToElement, calculateIndicatorsRate} from "~src/libs/utils";
import type {Indicator} from "~src/contents/pgy-note-list-rate-inline";

export const config: PlasmoCSConfig = {
  matches: ["https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  return document.querySelector('.note-data_title')
}

export const getShadowHostId = () => "pgy-note-detail-inline-unique-id"

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
  indicators = assignIndicatorsValue(indicators, allNodes);
  indicators = calculateIndicatorsRate(indicators);
  attachIndicatorsToElement(indicators, allNodes);
}

export default PgyNoteDetailRateInline