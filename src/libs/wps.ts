// noinspection NonAsciiCharacters,JSNonASCIINames

import type {WpsRequestParams, WpsResponse} from "~src/libs/wps.def";

export const token = "448evsptlyNBrC0ZhhJEca";
export const getUrl = 'https://www.kdocs.cn/api/v3/ide/file/ckyzatnqMqb3/script/V2-64ZKKzjHBFQwbudp0mhrtD/sync_task';
export const createUrl = 'https://www.kdocs.cn/api/v3/ide/file/ckyzatnqMqb3/script/V2-6HuKuOC590vCLHes7hpniZ/sync_task';

type BloggerTable = {
  账号名: string;
  博主ID: string;
  首页链接: string;
  蒲首页: string;
}

type DWBRCreateRecords<T> = {
  fields: Record<keyof T, any>
}[];

type DWBResponseRecords<T> = {
  fields: Record<keyof T | 'id', any>
}[];

async function createRecordsTo<T>(shtName: string, recordsToBeCreate: DWBRCreateRecords<T>) {
  let saveResponse = await fetch(createUrl, {
    method: 'POST',
    headers: {
      'AirScript-Token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'Context': {
        'argv': {
          'shtName': shtName,
          'fields': recordsToBeCreate,
        }
      }
    })
  });
  return await saveResponse.json() as WpsResponse<DWBResponseRecords<T>>;
}

async function getRecordsFrom<T>(noteParams: WpsRequestParams<T>) {
  return await fetch(getUrl, {
    method: 'POST',
    headers: {
      'AirScript-Token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(noteParams)
  });
}

