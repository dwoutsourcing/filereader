# filereader
filereader, a jQuery extension to read local files

This set of utilities allow us to access the HTML5 FileReader API directly from jQuery.

Available funcions:

$.canReadFiles()
Returns true if current browser implements FileReader API

$.getFilesFromEvent(event)
Parameter event must be an event like the "drop" event parameter (so you can get the dropped files), or the "change" input event parameter (so you can get references to selected files once an input[type="file"] element has changed) 
Returns an array of File objects

$.fileReader()
Returns a jQuery object (a wrapper to a FileReader instance)

Once created, this instance exposes:


Properties:

$fileReader.file: a reference to the File instance beeing read.


Methods:

$fileReader.abort()
Attempts to abort the current operation.

$fileReader.readAsDataURL(file)
where file is a valid File instance

$fileReader.readAsText(file)
where file is a valid File instance

$fileReader.readAsBinaryString(file)
where file is a valid File instance

$fileReader.readAsArrayBuffer(file)
where file is a valid File instance


Events triggered:
progress(perc, loaded, total) where perc is a value between 0 and 1
loadstart(event, originalEvent)
error(event, originalEvent)
abort(event, originalEvent)
load(event, originalEvent, result)
loadend(event, originalEvent, result)
