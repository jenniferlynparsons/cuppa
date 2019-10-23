import timerHelpers from "../timerHelpers";

describe("convertTimeToMinSec", () => {
  test("returns object containing minute and seconds", () => {
    expect(timerHelpers.convertTimeToMinSec(288)).toEqual({
      minute: "04",
      seconds: "48"
    });
  });
});

describe("convertTimeToSec", () => {
  test("returns total number of seconds", () => {
    expect(timerHelpers.convertTimeToSec(2, 30)).toEqual(150);
  });
});
