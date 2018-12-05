// @flow

type Queries = {
  [key: string]: MediaQueryList,
};

type Breakpoints = {
  [key: string]: string,
};

const mqs: Queries = {};

const addBPListener = (bp: string, cb: Function) => {
  if (mqs[bp]) {
    mqs[bp].addListener(cb);
  }
};

const removeBPListener = (bp: string, cb: Function) => {
  if (mqs[bp]) {
    mqs[bp].removeListener(cb);
  }
};

const init = (bps: Breakpoints) => {
  Object.keys(bps).forEach((key) => {
    mqs[key] = window.matchMedia(`(min-width: ${bps[key]})`);
  });
};

const addMQListener = (bps: Array<string> | string, cb: Function) => {
  if (Array.isArray(bps)) {
    bps.forEach((bp) => {
      addBPListener(bp, cb);
    });
  } else {
    addBPListener(bps, cb);
  }
};

const removeMQListener = (bps: Array<string> | string, cb: Function) => {
  if (Array.isArray(bps)) {
    bps.forEach((bp) => {
      removeBPListener(bp, cb);
    });
  } else {
    removeBPListener(bps, cb);
  }
};

const matchesBP = (bp: string) => !!mqs[bp] && mqs[bp].matches;

export default {
  init,
  addMQListener,
  removeMQListener,
  matchesBP,
};
