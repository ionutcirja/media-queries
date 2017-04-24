const mqList = {};

const addBPListener = (bp, cb) => {
    if (mqList[bp]) {
        mqList[bp].addListener(cb);
    }
};

const removeBPListener = (bp, cb) => {
    if (mqList[bp]) {
        mqList[bp].removeListener(cb);
    }
};

export const init = (bps) => {
    Object.keys(bps).forEach((key) => {
        mqList[key] = window.matchMedia(`(min-width: ${bps[key]})`);
    });
};

export const addMQListener = (bpList, cb) => {
    if (Array.isArray(bpList)) {
        bpList.forEach((bp) => {
	        addBPListener(bp, cb);
        });
    } else {
	    addBPListener(bpList, cb);
    }
};

export const removeMQListener = (bpList, cb) => {
    if (Array.isArray(bpList)) {
        bpList.forEach((bp) => {
	        removeBPListener(bp, cb);
        });
    } else {
	    removeBPListener(bpList, cb);
    }
};

export const matches = (bp) => {
    return !!mqList[bp] && mqList[bp].matches;
};

export default {
	init,
	addMQListener,
	removeMQListener,
	matches
};
