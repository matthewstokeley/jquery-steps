## jquery-steps

programmable, listenable checklists with forms for `jQuery`. 


### Example



### Public API Methods

```
register
```

register an event. 


`handle` - string, required


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


Deregister an event.

---


```
markComplete
```

Mark an event as complete. 


`name`  - string, the name of the object 


---


```
markIncomplete
```


Mark an event as incomplete.


---


```
review
```

###### Review return object

---


`complete`

Returns a `true` or `false` depending on if the all events are marked as complete. 

---

`completed`

Returns an `array` of the completed events.

---

`length`

Returns the number of events.

---


`percent`


Returns the percent completed.


---



```
listen
```


Accepts a `callback` function that fires whenever the `form` is changed.


---