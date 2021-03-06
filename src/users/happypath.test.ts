import handler from ".";

const event = {
  version: "2.0",
  routeKey: "GET /users",
  rawPath: "/dev/users",
  rawQueryString: "",
  headers: {
    "content-length": "0",
    host: "@[domainPrefix].com",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Darwin 19.3.0 Darwin Kernel Version 19.3.0",
    "x-amzn-trace-id": "Root=1-5e76faf5-2c0037f4e686d32a2fe51d6e",
    "x-forwarded-for": "110.175.111.146",
    "x-forwarded-port": "443",
    "x-forwarded-proto": "https",
  },
  requestContext: {
    accountId: "replaceme",
    apiId: "ddotikvly5",
    domainName: "replaceme.com",
    domainPrefix: "replaceme",
    http: {
      method: "GET",
      path: "/dev/users",
      protocol: "HTTP/1.1",
      sourceIp: "110.175.111.146",
      userAgent:
        "Mozilla/5.0 (Macintosh; Darwin 19.3.0 Darwin Kernel Version 19.3.0",
      requestId: "JxwmWiZlSwMEJOA=",
      routeKey: "GET /users",
      stage: "dev",
      time: "22/Mar/2020",
      timeEpoch: 1584855797350,
    },
  },
  isBase64Encoded: false,
};

describe("Get Users", () => {
  it("Should return list", async () => {
    handler(event);
  });
});
