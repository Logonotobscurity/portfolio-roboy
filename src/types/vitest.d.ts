/// <reference types="vitest" />

declare module 'vitest' {
  interface Suite {
    name: string;
    mode: 'run' | 'skip' | 'only' | 'todo';
    test: Test;
    options: Record<string, any>;
  }

  interface Test {
    name: string;
    mode: 'run' | 'skip' | 'only' | 'todo';
    concurrent: boolean;
    suite: Suite;
    options: Record<string, any>;
  }

  interface TestContext {
    expect: typeof expect;
    test: Test;
    suite: Suite;
  }

  interface SnapshotState {
    _updateSnapshot: 'new' | 'all' | 'none';
    added: number;
    updated: number;
    unmatched: number;
    matched: number;
  }

  interface ExpectStatic {
    extend(matchers: Record<string, any>): void;
    assertions(count: number): void;
    hasAssertions(): void;
    anything(): any;
    any(constructor: any): any;
    getState(): SnapshotState;
    setState(state: Partial<SnapshotState>): void;
  }
} 