# jQuery UI Plugin Datetimepicker

Datetimepicker is a jQuery UI plugin based on Datepicker, which allows you
to pick a date and a time.

Something to note is, that it changes the ```name``` attribute of your input, so
if your input is named "datetime", you will now have two inputs "datetime-time"
and "datetime-date", each with their respective datetime value.

To use just include the css file ```ui-datetimepicker.css```, the js file 
```jquery-ui-datetimepicker.js``` in your html.

You can then use the ```datetimepicker``` method on any input element

```
$('#myInput').datetimepicker();

$('#myButton').click(function(){
    alert("The datetime is: " + $('#testInput').datetimepicker("getDatetime"));
});
```

## Options

### dateOptions
A configuration object for the datepicker (this is just jQuery UI 
standard datepicker)

###timeOptions
A configuration object for the timepicker. Default values

```
timeOptions: {
    'format': '24h' // 12h or 24h
}
```