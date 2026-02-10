import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns API key when authorization header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };

    const key = getAPIKey(headers);

    expect(key).toBe("my-secret-key");
  });

  test("returns null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};

    const key = getAPIKey(headers);

    expect(key).toBeNull();
  });

  test("returns null when authorization format is invalid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };

    const key = getAPIKey(headers);

    expect(key).toBeNull();
  });

  test("returns null when authorization prefix is not ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer my-secret-key",
    };

    const key = getAPIKey(headers);

    expect(key).toBeNull();
  });
});
