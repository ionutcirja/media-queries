import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as mq from './';

chai.use(sinonChai);

describe('Media queries', () => {
    const breakpoints = {
        small: '480px',
        medium: '768px',
        large: '1024px'
    };
    const sandbox = sinon.sandbox.create();
    let matchMediaStub;
    let listeners;
    let addListenerStub;
    let removeListenerStub;
    let callback;

    beforeEach(() => {
        callback = sandbox.spy();
        addListenerStub = sandbox.spy();
        removeListenerStub = sandbox.spy();
        listeners = {
            addListener: addListenerStub,
            removeListener: removeListenerStub
        };
        matchMediaStub = sandbox.stub(window, 'matchMedia');
        matchMediaStub.withArgs('(min-width: 480px)').returns(Object.assign({}, { matches: true, ...listeners }));
        matchMediaStub.withArgs('(min-width: 768px)').returns(Object.assign({}, { matches: false, ...listeners }));
        matchMediaStub.withArgs('(min-width: 1024px)').returns(Object.assign({}, { matches: false, ...listeners }));
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should initialise the media queries list when initMediaQueries is invoked', () => {
        mq.initMediaQueries(breakpoints);
        expect(window.matchMedia.callCount).to.equal(3);
        expect(window.matchMedia.args[0][0]).to.equal('(min-width: 480px)');
        expect(window.matchMedia.args[1][0]).to.equal('(min-width: 768px)');
        expect(window.matchMedia.args[2][0]).to.equal('(min-width: 1024px)');
    });

    it('should return true if media query matches when mqMatches is invoked', () => {
        mq.initMediaQueries(breakpoints);
        expect(mq.mqMatches('small')).to.equal(true);
        expect(mq.mqMatches('medium')).to.equal(false);
        expect(mq.mqMatches('large')).to.equal(false);
        expect(mq.mqMatches('undefined')).to.equal(false);
    });

    it('should add a listener for a media query when ' +
        'addMQListener is called with a single breakpoint if that breakpoint exists', () => {
        mq.initMediaQueries(breakpoints);
        mq.addMQListener('small', callback);
        mq.addMQListener('medium', callback);
        mq.addMQListener('undefined', callback);
        expect(addListenerStub.callCount).to.equal(2);
        expect(addListenerStub.args[0][0]).to.equal(callback);
        expect(addListenerStub.args[1][0]).to.equal(callback);
    });

    it('should add a listener for a list of media queries when ' +
        'addMQListener is called with a list of breakpoints if that breakpoints exists', () => {
        mq.initMediaQueries(breakpoints);
        mq.addMQListener(['small', 'large', 'undefined'], callback);
        expect(addListenerStub.callCount).to.equal(2);
        expect(addListenerStub.args[0][0]).to.equal(callback);
        expect(addListenerStub.args[1][0]).to.equal(callback);
    });

    it('should remove a listener for a media query when ' +
        'removeMQListener is called with a single breakpoint if that breakpoint exists', () => {
        mq.initMediaQueries(breakpoints);
        mq.removeMQListener('small', callback);
        mq.removeMQListener('medium', callback);
        mq.removeMQListener('undefined', callback);
        expect(removeListenerStub.callCount).to.equal(2);
        expect(removeListenerStub.args[0][0]).to.equal(callback);
        expect(removeListenerStub.args[1][0]).to.equal(callback);
    });

    it('should remove a listener for a list of media queries when ' +
        'removeMQListener is called with a list of breakpoints if that breakpoints exists', () => {
        mq.initMediaQueries(breakpoints);
        mq.removeMQListener(['small', 'large', 'undefined'], callback);
        expect(removeListenerStub.callCount).to.equal(2);
        expect(removeListenerStub.args[0][0]).to.equal(callback);
        expect(removeListenerStub.args[1][0]).to.equal(callback);
    });
});
