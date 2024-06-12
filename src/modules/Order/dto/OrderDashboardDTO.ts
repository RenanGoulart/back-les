interface IDashboardOrderDTO {
  startDate: Date;
  endDate: Date;
  productFilters: string[];
}

interface IGroupedItemDTO {
  date: string;
  total: number;
  productName: string;
}

interface IDataset {
  label: string;
  values: number[];
}

interface IResult {
  labels: string[];
  datasets: IDataset[];
}

export { IDashboardOrderDTO, IGroupedItemDTO, IResult }
