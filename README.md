# Simple Carousel

Basic React carousel.

This is a demo, not a standalone package (at least yet).

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

Please note, that `simplecarousel` uses `typescrtipt` - remember about using proper types with parameters. E. g., `duration = {300} //number - correct`, *NOT* `duration = "300" //string - incorrect`

| Option name   | Descripttion                                             | Default | Type                |
| ------------- | -------------------------------------------------------- | ------- | ------------------- |
| step          | Number of items visible in the carousel window at once   | 1       | number              |
| duration      | Transition effect time, ms                               | 300     | number              |
| itemStyles    | Styles to pass to each item wrapper, if needed           | {}      | React.CSSProperties |
| autoplay      | Should the carousel run automatically                    | false   | boolean             |
| autoplaySpeed | Autoplay change speed, ms                                | 3000    | boolean             |
| buttons       | Show buttons for going to a particular item/set of items | false   | boolean             |
| infinite      | Rotate items infinitely or stop at last / first slide    | false   | boolean             |
