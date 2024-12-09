import changeDateType from "../changeDateType";

describe("changeDateType", () => {
  let cases = [
    { date: "01.05.2019", expected: "2019-05-01" },
    { date: "24.01.2020", expected: "2020-01-24" },
    { date: "12.12.2024", expected: "2024-12-12" },
  ];
  it.each(cases)("$date should be $expected", ({ date, expected }) => {
    let result = changeDateType(date);
    expect(result).toBe(expected);
  });
});
