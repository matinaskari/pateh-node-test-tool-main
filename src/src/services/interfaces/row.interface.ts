export interface Row {
  id?: number;
  testPeriod: number;
  responseTime: number;
  method: "POST" | "GET";
  numberOfRequests: number;
  doneRequests: number;
}
