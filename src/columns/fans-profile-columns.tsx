import type {GridColDef, GridRenderCellParams} from "@mui/x-data-grid-premium";
import {bloggerNameRender, IDRender} from "~src/libs/renders";
import type {
  FansProfile,
  FansProfileAge,
  FansProfileCity,
  FansProfileDevice,
  FansProfileGender,
  FansProfileInterest,
  FansProfileProvince
} from "~src/columns/FansProfile";
import React from "react";

export const PercentageSimple = ({value}: { value: number }) => {
  return <React.Fragment>{(value * 100).toFixed(2)}%</React.Fragment>
}

export function PercentageIndicator({name, value, index}: { name: string, value: number, index: number }) {
  return <span>{name}: <PercentageSimple value={value}/>{index < 2 ? ("，") : ("")}</span>;
}

export const agesRender = (params: GridRenderCellParams<any, FansProfileAge[]>) =>
  <React.Fragment>{params.value?.slice(0, 3).map((age, index) =>
    <PercentageIndicator key={index} index={index} name={age.group} value={age.percent}/>)}
  </React.Fragment>;

export const interestRender = (params: GridRenderCellParams<any, FansProfileInterest[]>) =>
  <React.Fragment>{params.value?.slice(0, 3).map((interest, index) =>
    <PercentageIndicator key={index} index={index} name={interest.name} value={interest.percent}/>)}
  </React.Fragment>;

export const provinceRender = (params: GridRenderCellParams<any, FansProfileProvince[]>) =>
  <React.Fragment>{params.value?.slice(0, 3).map((province, index) =>
    <PercentageIndicator key={index} index={index} name={province.name} value={province.percent}/>)}
  </React.Fragment>

export const cityRender = (params: GridRenderCellParams<any, FansProfileCity[]>) =>
  <React.Fragment>{params.value?.slice(0, 3).map((city, index) =>
    <PercentageIndicator key={index} index={index} name={city.name} value={city.percent}/>)}
  </React.Fragment>

export const deviceRender = (params: GridRenderCellParams<any, FansProfileDevice[]>) =>
  <React.Fragment>{params.value?.slice(0, 3).map((device, index) =>
    <PercentageIndicator key={index} index={index} name={device.desc} value={device.percent}/>)}
  </React.Fragment>

export const genderRender = (params: GridRenderCellParams<any, FansProfileGender>) =>
  <React.Fragment>
    <span>女性：<PercentageSimple value={params.value.female}/>，男性：<PercentageSimple value={params.value.male}/></span>
  </React.Fragment>

export const columns: GridColDef<FansProfile>[] = [
  {
    field: 'userId', headerName: 'ID', width: 90,
    renderCell: IDRender
  },
  {
    field: 'blogger', headerName: '名字', width: 90,
    renderCell: bloggerNameRender
  },
  {
    field: 'ages', headerName: '年龄', width: 300,
    renderCell: agesRender
  },
  {
    field: 'gender', headerName: '性别', width: 200,
    renderCell: genderRender
  },
  {
    field: 'interests', headerName: '兴趣', width: 300,
    renderCell: interestRender
  },
  {
    field: 'provinces', headerName: '省份', width: 300,
    renderCell: provinceRender
  },
  {
    field: 'cities', headerName: '城市', width: 300,
    renderCell: cityRender
  },
  {
    field: 'devices', headerName: '设备', width: 300,
    renderCell: deviceRender
  },
];