export interface OperationIface {
  accountId: string;
  body: any;
}

export type OperationFn = (p: OperationIface) => any;
