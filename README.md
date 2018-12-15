## jquery-steps

programmable, listenable checklists with forms for `jQuery`. 


### Example

@todo

```



```


### Public API Methods

```
register
```

register an event. 


`handle` - string, require


`message` - string, optional


#### Example
```
$('.form').steps().register({
	handle: "name input complete",
	message: "the name input has been completed"
})
```


---



```
deregister
```


---


```
markComplete
```

accepts a string, the event's handle.

`name`  - string, the name of the object 


---


```
markIncomplete
```


---


```
review
```

returns an object with the following methods:

---


`complete`

returns a `boolean` if the checklist is complete

---

`completed`

returns an `array` of the completed events

---

`length`

returns the number of events

---


`percent`

---

returns percent complete


---



```
listen
```


accepts a `callback` function that fires whenever the `form` is changed.


---


---