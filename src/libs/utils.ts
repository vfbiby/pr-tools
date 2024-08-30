import type {Indicator} from "~src/contents/pgy-blogger-detail-rate-inline";

export function attachIndicatorsToElement(indicators: Indicator[], elements: Element[]) {
  indicators.filter(i => i.rate).forEach(indicator => {
    let indicatorLabel = elements.find(el => el.textContent.trim().includes(indicator.name));
    indicatorLabel.innerHTML = `${indicatorLabel.textContent.trim()}/${indicator.rate.name}`
    let indicatorValue = indicatorLabel.nextElementSibling;
    indicatorValue.innerHTML = `${indicatorValue.textContent.trim()}<span style="font-size: 11px">(${(indicator.rate.value * 100).toFixed(1)}%)</span>`
  })
}