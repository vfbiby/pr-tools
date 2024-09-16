import type {GridRenderCellParams} from "@mui/x-data-grid-premium";
import {Box} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/material/Avatar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import type {IBloggerInfo} from "~src/columns/BloggerInfo";
import type {NoteType} from "~src/columns/NotesRate";
import React from "react";

export const bloggerNameRender = (params: GridRenderCellParams<any, IBloggerInfo>) => {
  return <span>{params.value?.name.trim()}</span>
};

export const numberRender = (params: GridRenderCellParams<any, number>) => {
  return <span>{params.value?.toLocaleString('en-US')}</span>
};

export const IDRender = (params: GridRenderCellParams<any, string>) => {
  if (!params.value) return '';
  return <a target="_blank"
            href={`https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/${params.value.trim()}`}>
    {params.value.trim()}
  </a>
};

export const dateValueFormatter = (value: string) => {
  return new Date(value).toLocaleString("zh-CN")
};

export const contentTagRender = (params: GridRenderCellParams<any, NoteType[]>) => {
  return <Box>{params.value?.map((type, index) =>
    <span key={index}>{type.contentTag}: {type.percent}%</span>)}</Box>
};

export const PercentageRender = (params: GridRenderCellParams<any, string>) => {
  return <span>{params.value?.trim()}%</span>
};

export const headRender = (params: GridRenderCellParams<any, string>) => {
  if (!params.value) return '';
  return <Avatar src={`${params.value?.trim()}`} alt="blogger header photo"/>
};

export const locationRender = (params: GridRenderCellParams<any, string>) => {
  if (!params.value) return '';
  return <Box><LocationOnIcon fontSize="small"/>{params.value.trim()}</Box>
};

export const noteSignRender = (params: GridRenderCellParams<any, { name: string, userId: string }>) => {
  if (!params.value) return '';
  return <Box>
    <ApartmentIcon fontSize="small" sx={{mr: 0.5}}/>
    <a target="_blank"
       href={`https://pgy.xiaohongshu.com/solar/pre-trade/view/mcn-detail/${params.value.userId}`}>
      {params.value.name}
    </a></Box>
};

