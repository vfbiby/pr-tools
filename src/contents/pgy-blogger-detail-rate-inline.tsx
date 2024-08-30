import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
import {attachIndicatorsToElement} from "~src/libs/utils";

export const config: PlasmoCSConfig = {
  matches: ["https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  // return document.querySelector('.note-card-wrapper')
  return (document.querySelectorAll('.note-card-wrapper:last-child'))[0]
}

// Use this to optimize unmount lookups
export const getShadowHostId = () => "pgy-blogger-detail-inline-unique-id"

export type Indicator = { name: string; value: number, rate?: { name: string, value: number, divideBy: string } };

const PgyNoteDetailRateInline = () => {
  let allNodes = Array.from(document.querySelectorAll('.note-case__wrapper .note-card-wrapper'));

  allNodes.forEach(el => {
    let indicators: Indicator[];
    indicators = [
      {name: "阅读", value: null},
      {name: "点赞", value: null, rate: {name: "点赞率", value: null, divideBy: "阅读"}},
      {name: "收藏", value: null, rate: {name: "收藏率", value: null, divideBy: "阅读"}},
    ];

    let elements = Array.from(el.querySelectorAll(".note-card__info .note-card__data .card-data__item .card-data__title"));
    indicators = indicators.map(indicator => {
      let findNode = elements.find(n => {
        return n.textContent.trim().includes(indicator.name)
      });
      if (findNode) {
        indicator.value = parseInt(findNode.nextSibling.textContent.trim().replace(',', ''))
      }
      return {...indicator}
    });

    indicators = indicators.map(indicator => {
      if (indicator.rate && !indicator.rate.value) {
        let divideBy = indicators.find(i => i.name === indicator.rate.divideBy).value;
        indicator.rate.value = indicator.value / divideBy
      }
      return {...indicator}
    })

    attachIndicatorsToElement(indicators, elements);

  })
  return (<span>hello</span>)
}

export default PgyNoteDetailRateInline