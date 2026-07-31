import { describe, expect, it } from "bun:test";

import { Lichess } from "@lichess/api";

import type { TvFeed } from "@lichess/api/schemas";

describe.concurrent("Lichess", () => {
  it("should work", () => {
    const lichess = new Lichess({ token: null });
    expect(lichess).toBeDefined();
    expect(lichess).toBeInstanceOf(Lichess);
  }, 1_000);

  it("should correctly make a simple request", async () => {
    const lichess = new Lichess({ token: null });
    const liveStreamers = (await lichess.streamerLive()).data;
    expect(liveStreamers).toBeArray();
  }, 2_000);

  it("should correctly handle streaming ndjson", async () => {
    const received: TvFeed[] = [];

    const lichess = new Lichess({ token: null });
    const { stream } = await lichess.tvFeed();

    for await (const obj of stream) {
      received.push(obj);
      if (received.length >= 2) {
        break;
      }
    }

    expect(received.length).toBeGreaterThanOrEqual(2);
    expect(received[0]?.t).toBe("featured");
  }, 20_000);
});
