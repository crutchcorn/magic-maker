/**
The following should be unwrapped to `console.log("Test");`:

```
function Test() {
    console.log("Test");
}
```

```
const Test = () => {
    console.log("Test");
}
```

```
const Test = () => console.log("Test");
```
 */
export default () => {};
