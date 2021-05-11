# Simple Carousel

Basic React carousel. Supports 1 or more items on the screen at the same time, option to go to particular item / set of items, infinite option, scroll by swipe on touch devices.

This is a demo, not a standalone package (at least yet).

## Demo

https://codesandbox.io/s/github/pwojcieszuk/simplecarousel

## Local usage and development

Clone the repo, then run:

```
npm i
npm start
```

The main application entry point directs to a simple demo of the carousel. If you would rather use the carousel component, import it from the `src` folder, e.g.:

```
import Carousel from "./src/components/Carousel";


const myCarousel = () => (
    <>
        <Carousel /* options */>
            /* slides */
        </Carousel>);
    </>

...

```

## The _<Carousel>_ components' options:

Please note, that `simplecarousel` uses `typescrtipt` - remember about using proper types with parameters. E. g., `duration = {300} //number - correct`, **NOT** `duration = "300" //string - incorrect`

| Option name   | Descripttion                                             | Default | Type                |
| ------------- | -------------------------------------------------------- | ------- | ------------------- |
| step          | Number of items visible in the carousel window at once   | 1       | number              |
| duration      | Transition effect time, ms                               | 300     | number              |
| itemStyles    | Styles to pass to each item wrapper, if needed           | {}      | React.CSSProperties |
| autoplay      | Should the carousel run automatically                    | false   | boolean             |
| autoplaySpeed | Autoplay change speed, ms                                | 3000    | boolean             |
| buttons       | Show buttons for going to a particular item/set of items | false   | boolean             |
| infinite      | Rotate items infinitely or stop at last / first slide    | false   | boolean             |

## The _<Carousel>_ component - remarks

- Items can be any html content, as long as it is a valid `ReactElement`
- Items size will be automatically adjusted to the container - all issues related to items responsivenes / behaviour in different viewport sizes need to be handled by proper css settings for the container, or `itemStyles` options.

## Final remarks and todos list

- The carousel is pretty basic and could definitely be improved. It has not been extensively tested over an exhaustive list of different browseres and devices, nor for any edge cases. Maybe it happens someday
- It was built locally based on node version 14 (current stable version), some depndencies might need attention in other node versions
- webpack prod build is not optimized, it could use some love (e.g. tree shaking, webpack-merge, code splitting)
- It is not a proper package - it can be used as one using github dependency with some effort, but to become a real importable package it could use some more love, maybe it will get it one day
- Tests focus on logic, for components only some simple snapshot tests were prepared. As most of the logic is separated from the component code, this should be enough, at least until any bugs get discovered. This could have alo be given more love, maybe it happens in future
