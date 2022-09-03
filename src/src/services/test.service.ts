import { TEST_URL } from "../config/config";
import { Flight } from "./interfaces/flight.interface";
import util from "../utils/reqSender";
import { iranAirports } from "../db/iranAirports.json";

class TestService {
  private static instance: TestService;
  private constructor() {}

  public static getInstance(): TestService {
    if (!TestService.instance) {
      TestService.instance = new TestService();
    }

    return TestService.instance;
  }

  private flights: Flight[] = [];

  private iatas = Array.from(iranAirports, (x: any) => x.iata);

  private sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  private create(number: number) {
    for (let index = 0; index < number; index++) {
      let randDay = Math.floor(Math.random() * 30 + 1);

      let randMonth = Math.floor(Math.random() * 12 + 1);

      let randOrigin =
        this.iatas[Math.floor(Math.random() * this.iatas.length)];

      let randDestination =
        this.iatas[Math.floor(Math.random() * this.iatas.length)];

      this.flights.push({
        provider: "test",
        origin: randOrigin,
        destination: randDestination,
        departure_date: `2022-${randMonth}-${randDay}`,
        type: "flight",
      });
    }

    return this.flights;
  }

  private async runner(testPeriod: number, testMethod: "POST" | "GET") {
    for (let flight of this.flights) {
      await this.sleep(testPeriod);
      await util.send(
        "http://searchqueue2:3000/api/search-queue",
        testMethod,
        flight
      );
    }
  }

  public exec(
    numberOfRequests: number,
    testPeriod: number,
    testMethod: "POST" | "GET"
  ) {
    this.flights = [];
    let data = this.create(numberOfRequests);
    this.runner(testPeriod, testMethod);

    return data;
  }
}

export default TestService.getInstance();
