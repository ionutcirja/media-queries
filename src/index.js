const mqList = {};

const addBreakPointListener = (bp, cb) => {
    if (mqList[bp]) {
        mqList[bp].addListener(cb);
    }
};

const removeBreakPointListener = (bp, cb) => {
    if (mqList[bp]) {
        mqList[bp].removeListener(cb);
    }
};

export const init = (breakpoints) => {
    Object.keys(breakpoints).forEach((key) => {
        mqList[key] = window.matchMedia(`(min-width: ${breakpoints[key]})`);
    });
};

export const addMQListener = (bpList, cb) => {
    if (Array.isArray(bpList)) {
        bpList.forEach((bp) => {
            addBreakPointListener(bp, cb);
        });
    } else {
        addBreakPointListener(bpList, cb);
    }
};

export const removeMQListener = (bpList, cb) => {
    if (Array.isArray(bpList)) {
        bpList.forEach((bp) => {
            removeBreakPointListener(bp, cb);
        });
    } else {
        removeBreakPointListener(bpList, cb);
    }
};

export const mqMatches = (bp) => {
    return !!mqList[bp] && mqList[bp].matches;
};
