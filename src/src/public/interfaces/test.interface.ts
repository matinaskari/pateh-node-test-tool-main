export interface Test {
  id: number;
  testPeriod: number;
  responseTime: number;
  method: "GET" | "POST";
  numberOfRequests: number;
  doneRequests: number;
}
