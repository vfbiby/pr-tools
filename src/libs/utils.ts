import type {Indicator} from "~src/contents/pgy-note-list-rate-inline";

export function attachIndicatorsToElement(indicators: Indicator[], elements: Element[]) {
  indicators.filter(i => i.rate).forEach(indicator => {
    let indicatorLabel = elements.find(el => el.textContent.trim().includes(indicator.name));
    indicatorLabel.innerHTML = `${indicatorLabel.textContent.trim()}/${indicator.rate.name}`
    let indicatorValue = indicatorLabel.nextElementSibling;
    indicatorValue.innerHTML = `${indicatorValue.textContent.trim()}<span style="font-size: 11px">(${(indicator.rate.value * 100).toFixed(1)}%)</span>`
  })
}

export function assignIndicatorsValue(indicators: Indicator[], elements: Element[]) {
  return indicators.map(indicator => {
    let findNode = elements.find(n => {
      return n.textContent.trim().includes(indicator.name)
    });
    if (findNode) {
      indicator.value = parseInt(findNode.nextSibling.textContent.trim().replace(',', ''))
    }
    return {...indicator}
  });
}

export function calculateIndicatorsRate(indicators: Indicator[]) {
  return indicators.map(indicator => {
    if (indicator.rate && !indicator.rate.value) {
      let divideBy = indicators.find(i => i.name === indicator.rate.divideBy).value;
      indicator.rate.value = indicator.value / divideBy
    }
    return {...indicator}
  })
}