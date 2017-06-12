# Prefix Data

Prefix Data is [jQuery](https://jquery.com/) plugin. Return the value at the prefixed data store for the first element
in the set of matched elements. Returned value can be an object based on the attribute values and attributes name
structure.

## Quick start

Put the script at the [bottom](https://developer.yahoo.com/performance/rules.html#js_bottom) of your markup right after
jQuery:

```html
<script src="jquery.js"></script>
<script src="jquery.prefixData.js"></script>
```

### Usage

Take any HTML tag with multi `data-*` attributes with the same prefix. In the example we focus on myprefix prefix.

```html
<div id="example-tag"
     data-myprefix='{"property1": "value1", "property2": {"property21": "value21"}, "property3": "value2"}'
     data-myprefix-property2='{"property22": "value22"}'
     data-myprefix-property2-property23="value23"
     data-myprefix-property3="overwite-value3"
     data-myprefix-property4='{"property41": "value41"}'
     data-other="We do not read it"></div>
```

If you want to read data from `data-myprefix` and every `data-myprefix-*` attribute you can use `.prefixData()` with given
prefix.

```javascript
$('#example-tag').prefixData('myprefix');
```

The previous example returns the object:
```
{
    property1: "value1",
    property2: {
        property21: "value21",
        property22: "value22",
        property23: "value23"
    },
    property3: "overwite-value3",
    property4: {
        property41: "value41"
    }
}
```

**Warning:** It is important to remember that data from more complex `data-*` attributes (eg. `data-myprefix-property3`)
will overwrite data from main attributes (eg. `data-myprefix`).

**Live example** available on
[http://example.silversite.pl/prefix-data/index.html](http://example.silversite.pl/prefix-data/index.html)

## License

Code released under the MIT license.
