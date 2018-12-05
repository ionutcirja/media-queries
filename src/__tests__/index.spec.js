import mq from '../index';

describe('Media queries', () => {
  const breakpoints = {
    small: '480px',
    medium: '768px',
    large: '1024px',
  };
  let listeners;
  let addListener;
  let removeListener;
  let callback;

  beforeEach(() => {
    callback = jest.fn();
    addListener = jest.fn();
    removeListener = jest.fn();
    listeners = {
      addListener,
      removeListener,
    };
    window.matchMedia = jest.fn()
      .mockImplementationOnce(() => ({ matches: true, ...listeners }))
      .mockImplementationOnce(() => ({ matches: false, ...listeners }))
      .mockImplementationOnce(() => ({ matches: false, ...listeners }));
    mq.init(breakpoints);
  });

  it('should initialise the media queries list list when init method is called', () => {
    expect(window.matchMedia.mock.calls.length).toEqual(3);
    expect(window.matchMedia.mock.calls[0][0]).toEqual('(min-width: 480px)');
    expect(window.matchMedia.mock.calls[1][0]).toEqual('(min-width: 768px)');
    expect(window.matchMedia.mock.calls[2][0]).toEqual('(min-width: 1024px)');
  });

  it('should return true if media query matches breakpoint when matchesBP is invoked', () => {
    expect(mq.matchesBP('small')).toEqual(true);
    expect(mq.matchesBP('medium')).toEqual(false);
    expect(mq.matchesBP('large')).toEqual(false);
    expect(mq.matchesBP('undefined')).toEqual(false);
  });

  it('should add a listener for a media query when'
    + 'addMQListener is called with a single breakpoint if that breakpoint exists', () => {
    mq.addMQListener('small', callback);
    mq.addMQListener('medium', callback);
    mq.addMQListener('undefined', callback);
    expect(addListener.mock.calls.length).toEqual(2);
    expect(addListener.mock.calls[0][0]).toEqual(callback);
    expect(addListener.mock.calls[1][0]).toEqual(callback);
  });

  it('should add a listener for a list of media queries when'
    + 'addMQListener is called with a list of breakpoints if that breakpoints exists', () => {
    mq.addMQListener(['small', 'large', 'undefined'], callback);
    expect(addListener.mock.calls.length).toEqual(2);
    expect(addListener.mock.calls[0][0]).toEqual(callback);
    expect(addListener.mock.calls[1][0]).toEqual(callback);
  });

  it('should remove a listener for a media query when'
    + 'removeMQListener is called with a single breakpoint if that breakpoint exists', () => {
    mq.removeMQListener('small', callback);
    mq.removeMQListener('medium', callback);
    mq.removeMQListener('undefined', callback);
    expect(removeListener.mock.calls.length).toEqual(2);
    expect(removeListener.mock.calls[0][0]).toEqual(callback);
    expect(removeListener.mock.calls[1][0]).toEqual(callback);
  });

  it('should remove a listener for a list of media queries when'
    + ' removeMQListener is called with a list of breakpoints if that breakpoints exists', () => {
    mq.removeMQListener(['small', 'large', 'undefined'], callback);
    expect(removeListener.mock.calls.length).toEqual(2);
    expect(removeListener.mock.calls[0][0]).toEqual(callback);
    expect(removeListener.mock.calls[1][0]).toEqual(callback);
  });
});
