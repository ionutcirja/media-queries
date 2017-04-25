const mqs = {};

const addBPListener = (bp, cb) => {
    if (mqs[bp]) {
        mqs[bp].addListener(cb);
    }
};

const removeBPListener = (bp, cb) => {
    if (mqs[bp]) {
        mqs[bp].removeListener(cb);
    }
};

const init = (bps) => {
    Object.keys(bps).forEach((key) => {
        mqs[key] = window.matchMedia(`(min-width: ${bps[key]})`);
    });
};

const addMQListener = (bps, cb) => {
    if (Array.isArray(bps)) {
        bps.forEach((bp) => {
            addBPListener(bp, cb);
        });
    } else {
        addBPListener(bps, cb);
    }
};

const removeMQListener = (bps, cb) => {
    if (Array.isArray(bps)) {
        bps.forEach((bp) => {
            removeBPListener(bp, cb);
        });
    } else {
        removeBPListener(bps, cb);
    }
};

const matchesBP = (bp) => {
    return !!mqs[bp] && mqs[bp].matches;
};

export default {
    init,
    addMQListener,
    removeMQListener,
    matchesBP,
};
