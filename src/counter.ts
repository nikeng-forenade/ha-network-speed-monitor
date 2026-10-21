export interface CounterRate {
  mbps: number;
  /** Timestamp (ms since epoch) of the sample the rate belongs to. */
  at: number;
}

interface CounterSample {
  bytes: number;
  at: number;
}

/**
 * Converts cumulative byte counters into a rate using the timestamp of the
 * actual samples (not the UI refresh interval).
 */
export class CounterRateTracker {
  private previous = new Map<string, CounterSample>();
  private rates = new Map<string, CounterRate>();
  private readonly staleMs: number;
  private readonly maxMbps: number;

  constructor(options: { staleMs?: number; maxMbps?: number } = {}) {
    this.staleMs = options.staleMs ?? 300_000;
    this.maxMbps = options.maxMbps ?? 1_000_000;
  }

  update(key: string, bytes: number, at: number): CounterRate | null {
    if (!Number.isFinite(bytes) || !Number.isFinite(at) || bytes < 0) {
      return this.rates.get(key) ?? null;
    }

    const previous = this.previous.get(key);
    this.previous.set(key, { bytes, at });

    if (!previous) return null;

    const elapsedSeconds = (at - previous.at) / 1000;
    if (elapsedSeconds <= 0) return this.rates.get(key) ?? null;

    if (elapsedSeconds * 1000 > this.staleMs) {
      // A long gap means the previous baseline is meaningless.
      this.rates.delete(key);
      return null;
    }

    let delta = bytes - previous.bytes;
    if (delta < 0) {
      // Counter reset (integration restart / device reboot): the counter now
      // holds the traffic since the reset.
      delta = bytes;
    }

    const mbps = (delta * 8) / (elapsedSeconds * 1_000_000);
    if (!Number.isFinite(mbps) || mbps > this.maxMbps) {
      return this.rates.get(key) ?? null;
    }

    const rate: CounterRate = { mbps, at };
    this.rates.set(key, rate);
    return rate;
  }

  get(key: string): CounterRate | undefined {
    return this.rates.get(key);
  }

  prune(maxAgeMs: number, now: number): void {
    for (const [key, rate] of this.rates) {
      if (now - rate.at > maxAgeMs) this.rates.delete(key);
    }
    for (const [key, sample] of this.previous) {
      if (now - sample.at > maxAgeMs) this.previous.delete(key);
    }
  }

  clear(): void {
    this.previous.clear();
    this.rates.clear();
  }
}
