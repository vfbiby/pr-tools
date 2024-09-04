export type WpsResponse<T> = {
  data: {
    logs: [{ filename: string; timestamp: string; unix_time: number; level: string; args: string[] }];
    result: T
  };
  error: string;
  status: 'finished' | 'error'
}
export type WpsRequestParams<T> = {
  Context: {
    argv: {
      shtName: string;
      fields: keyof T[];
      pageSize: number;
      fetchAll: boolean;
      filter: Filter<T>;
    }
  }
}
type DynamicDateType =
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'last7Days'
  | 'last30Days'
  | 'thisWeek'
  | 'lastWeek'
  | 'nextWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'nextMonth';
type FilterValue = string | number | boolean | { type: 'Text'; value: string }
  | { type: 'Checkbox'; value: '0' | '1' }
  | { dynamicType: DynamicDateType; type: 'DynamicSimple' };
type FilterOp =
  | 'Equals'
  | 'NotEqu'
  | 'Greater'
  | 'GreaterEqu'
  | 'Less'
  | 'LessEqu'
  | 'GreaterEquAndLessEqu'
  | 'LessOrGreater'
  | 'BeginWith'
  | 'EndWith'
  | 'Contains'
  | 'NotContains'
  | 'Intersected'
  | 'Empty'
  | 'NotEmpty';
type FilterCriteria<T> = {
  field: keyof T;
  op: FilterOp;
  values: FilterValue[];
};
type Filter<T> = {
  mode: 'AND' | 'OR';
  criteria: FilterCriteria<T>[];
};