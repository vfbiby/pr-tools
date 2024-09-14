// import { GridLocaleText } from '../models/api/gridLocaleTextApi';

import type { GridLocaleText } from "@mui/x-data-grid-premium";

export const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {
  // Root
  noRowsLabel: '没有行数',
  noResultsOverlayLabel: '没有查询结果.',

  // Density selector toolbar button text
  toolbarDensity: '行高',
  toolbarDensityLabel: '行高',
  toolbarDensityCompact: '紧凑',
  toolbarDensityStandard: '标准',
  toolbarDensityComfortable: '舒适',

  // Columns selector toolbar button text
  toolbarColumns: '列名',
  toolbarColumnsLabel: '选择列',

  // Filters toolbar button text
  toolbarFilters: '筛选',
  toolbarFiltersLabel: '显示筛选器',
  toolbarFiltersTooltipHide: '隐藏筛选器',
  toolbarFiltersTooltipShow: '显示筛选器',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} 激活多个筛选器` : `${count} 激活单个筛选器`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: '搜索…',
  toolbarQuickFilterLabel: '搜索',
  toolbarQuickFilterDeleteIconLabel: '清除',

  // Export selector toolbar button text
  toolbarExport: '导出',
  toolbarExportLabel: '导出',
  toolbarExportCSV: '导出CSV',
  toolbarExportPrint: '打印',
  toolbarExportExcel: '导出Excel',

  // Columns management text
  columnsManagementSearchTitle: '搜索',
  columnsManagementNoColumns: '没有列',
  columnsManagementShowHideAllText: '显示/隐藏 全部',
  columnsManagementReset: '重置',

  // Filter panel text
  filterPanelAddFilter: '添加过滤',
  filterPanelRemoveAll: '移除全部',
  filterPanelDeleteIconLabel: '删除',
  filterPanelLogicOperator: '逻辑操作',
  filterPanelOperator: '操作',
  filterPanelOperatorAnd: '并且',
  filterPanelOperatorOr: '或者',
  filterPanelColumns: '列',
  filterPanelInputLabel: '值',
  filterPanelInputPlaceholder: '过滤值',

  // Filter operators text
  filterOperatorContains: '包含',
  filterOperatorDoesNotContain: '不包含',
  filterOperatorEquals: '等于',
  filterOperatorDoesNotEqual: '不等于',
  filterOperatorStartsWith: '开头是',
  filterOperatorEndsWith: '结尾是',
  filterOperatorIs: '是',
  filterOperatorNot: '不是',
  filterOperatorAfter: '在之后',
  filterOperatorOnOrAfter: '在…之时或之后',
  filterOperatorBefore: '在…之前',
  filterOperatorOnOrBefore: '在…之时或之前',
  filterOperatorIsEmpty: '为空',
  filterOperatorIsNotEmpty: '不为空',
  filterOperatorIsAnyOf: '任意',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',

  // Header filter operators text
  headerFilterOperatorContains: '包含',
  headerFilterOperatorDoesNotContain: '不包含',
  headerFilterOperatorEquals: '等于',
  headerFilterOperatorDoesNotEqual: '不等于',
  headerFilterOperatorStartsWith: '开头是',
  headerFilterOperatorEndsWith: '结尾是',
  headerFilterOperatorIs: '是',
  headerFilterOperatorNot: '不是',
  headerFilterOperatorAfter: '是之后',
  headerFilterOperatorOnOrAfter: '在…之时或之后',
  headerFilterOperatorBefore: '在…之前',
  headerFilterOperatorOnOrBefore: '在…之时或之前',
  headerFilterOperatorIsEmpty: '为空',
  headerFilterOperatorIsNotEmpty: '不为空',
  headerFilterOperatorIsAnyOf: '任意',
  'headerFilterOperator=': '等于',
  'headerFilterOperator!=': '不等于',
  'headerFilterOperator>': '大于',
  'headerFilterOperator>=': '大于等于',
  'headerFilterOperator<': '小于',
  'headerFilterOperator<=': '小于等于',

  // Filter values text
  filterValueAny: '任意',
  filterValueTrue: '真',
  filterValueFalse: '假',

  // Column menu text
  columnMenuLabel: '菜单',
  columnMenuShowColumns: '显示列',
  columnMenuManageColumns: '合并弄',
  columnMenuFilter: '过滤',
  columnMenuHideColumn: '隐藏列',
  columnMenuUnsort: '不排序',
  columnMenuSortAsc: '升序',
  columnMenuSortDesc: '降序',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} 激活过滤器` : `${count} 激活过滤器`,
  columnHeaderFiltersLabel: '显示过滤器',
  columnHeaderSortIconLabel: '排序',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `选中 ${count.toLocaleString()} 行`
      : `选中 ${count.toLocaleString()} 行`,

  // Total row amount footer text
  footerTotalRows: '总计行数:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} 或者 ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: '复选框',
  checkboxSelectionSelectAllRows: '选择全部行',
  checkboxSelectionUnselectAllRows: '反选全部行',
  checkboxSelectionSelectRow: '选择行',
  checkboxSelectionUnselectRow: '反选行',

  // Boolean cell text
  booleanCellTrueLabel: '是',
  booleanCellFalseLabel: '否',

  // Actions cell more text
  actionsCellMore: '更多',

  // Column pinning text
  pinToLeft: '冻结到左边',
  pinToRight: '冻结到右边',
  unpin: '不红绫',

  // Tree Data
  treeDataGroupingHeaderName: '分组',
  treeDataExpand: '显示子项',
  treeDataCollapse: '隐藏子项',

  // Grouping columns
  groupingColumnHeaderName: '分组',
  groupColumn: (name) => `以 ${name} 分组`,
  unGroupColumn: (name) => `停止以 ${name} 分组`,

  // Master/detail
  detailPanelToggle: '详细面板切换',
  expandDetailPanel: '展开',
  collapseDetailPanel: '收缩',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: '行渲染',

  // Aggregation
  aggregationMenuItemHeader: '聚合',
  aggregationFunctionLabelSum: '汇总',
  aggregationFunctionLabelAvg: '平均',
  aggregationFunctionLabelMin: '最小值',
  aggregationFunctionLabelMax: '最大值',
  aggregationFunctionLabelSize: '数量',
};