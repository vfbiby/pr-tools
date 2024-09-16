import type {GridColDef} from "@mui/x-data-grid-premium";
import {
  agesRender,
  bloggerNameRender,
  cityRender,
  deviceRender,
  genderRender,
  IDRender,
  interestRender,
  provinceRender
} from "~src/libs/renders";
import type {FansProfile} from "~src/columns/FansProfile";
import React from "react";

export const PercentageSimple = ({value}: { value: number }) => {
  return <React.Fragment>{(value * 100).toFixed(2)}%</React.Fragment>
}

export function PercentageIndicator({name, value, index}: { name: string, value: number, index: number }) {
  return <span>{name}: <PercentageSimple value={value}/>{index < 2 ? ("，") : ("")}</span>;
}

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