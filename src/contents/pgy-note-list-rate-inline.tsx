import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
import {assignIndicatorsValue, attachIndicatorsToElement, calculateIndicatorsRate} from "~src/libs/utils";

export const config: PlasmoCSConfig = {
  matches: ["https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  return document.querySelector('.note-card__mask')
}

export const getShadowHostId = () => "pgy-blogger-detail-inline-unique-id"

export type Indicator = { name: string; value: number, rate?: { name: string, value: number, divideBy: string } };

const PgyNoteListRateInline = () => {
  let allNodes = Array.from(document.querySelectorAll('.note-case__wrapper .note-card-wrapper'));
  allNodes.forEach(el => {
    let indicators: Indicator[];
    indicators = [
      {name: "阅读", value: null},
      {name: "点赞", value: null, rate: {name: "点赞率", value: null, divideBy: "阅读"}},
      {name: "收藏", value: null, rate: {name: "收藏率", value: null, divideBy: "阅读"}},
    ];

    let elements = Array.from(el.querySelectorAll(".note-card__info .note-card__data .card-data__item .card-data__title"));
    indicators = assignIndicatorsValue(indicators, elements);
    indicators = calculateIndicatorsRate(indicators);
    attachIndicatorsToElement(indicators, elements);
  })
}

export default PgyNoteListRateInline