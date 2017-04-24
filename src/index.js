const mqList = {};

function addBreakPointListener(bp, cb) {
    if (mqList[bp]) {
        mqList[bp].addListener(cb);
    }
}

function removeBreakPointListener(bp, cb) {
    if (mqList[bp]) {
        mqList[bp].removeListener(cb);
    }
}

export function initMediaQueries(breakpoints) {
    Object.keys(breakpoints).forEach((key) => {
        mqList[key] = window.matchMedia(`(min-width: ${breakpoints[key]})`);
    });
}

export function addMQListener(bpList, cb) {
    if (Array.isArray(bpList)) {
        bpList.forEach((bp) => {
            addBreakPointListener(bp, cb);
        });
    } else {
        addBreakPointListener(bpList, cb);
    }
}

export function removeMQListener(bpList, cb) {
    if (Array.isArray(bpList)) {
        bpList.forEach((bp) => {
            removeBreakPointListener(bp, cb);
        });
    } else {
        removeBreakPointListener(bpList, cb);
    }
}

export function mqMatches(bp) {
    return !!mqList[bp] && mqList[bp].matches;
}
