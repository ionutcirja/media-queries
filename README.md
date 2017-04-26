# Media queries

This is a simple utility to deal with breakpoints in javascript in a mobile first manner.

Any pull request for optimisations and new additions is more than welcome.

# Installing media-queries

```
npm install mobile-first-media-queries
```

# Usage

```js
import mq from 'mobile-first-media-queries';
```

## Methods

### init

Takes breakpoints object as a parameter.

```js
const breakpoints = {
    small: '480px',
    medium: '768px',
    large: '1024px',
};

mq.init(breakpoints);
```

### addMQListener

Takes a breakpoint (or a list of breakpoints) and a callback as parameters.

```js
const listener = () => {
    // do something here, maybe change the layout, some classes, render something else etc
};
mq.addMQListener('small', listener); // single breakpoint example
mq.addMQListener(['small', 'medium'], listener); // list of breakpoints example
```

### removeMQListener

Takes a breakpoint (or a list of breakpoints) and a callback as parameters.

```js
mq.removeMQListener('small', listener); // single breakpoint example
mq.removeMQListener(['small', 'medium'], listener); // list of breakpoints example
```

### matchesBP

Takes a breakpoint as a parameter.

Returns true/false if current window size matches/doesn't match the breakpoint value.

```js
mq.matchesBP('large');
```