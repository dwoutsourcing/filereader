/*
 * Author: dwoutsourcing (dwoutsourcing@gmail.com)
 * License: MIT
 */
(function($, undefined) {
	var Reader = function() {
		if(!Reader.Caniuse())
			throw new Error('FileReader not available');
		
		this.initializeReader();
	};
	Reader.prototype.abort = function() {
		this.reader.abort();
	};
	Reader.prototype.readDataURL = function(file) {
		this._initializeFile(file);
		this.reader.readAsDataURL(this.file);
	};
	Reader.prototype.readBinaryString = function(file) {
		this._initializeFile(file);
		this.reader.readAsBinaryString(this.file);
	};
	Reader.prototype.readArrayBuffer = function(file) {
		this._initializeFile(file);
		this.reader.readAsArrayBuffer(this.file);
	};
	Reader.prototype.readText = function(file) {
		this._initializeFile(file);
		this.reader.readAsText(this.file);
	};
	Reader.prototype._initializeFile = function(file) {
		if(this.file) {
			try {
				this.abort();
			} catch(e) {};
		}
		
		this.file = file;
	};
	Reader.prototype.initializeReader = function() {
		this.reader = new FileReader;
		
		var fileReader = this.reader;
		var $fileReader = $(fileReader);
		var that = this;
		var $this = $(this);
		
		$fileReader
			.on('progress', function(event) {
				var originalEvent = event.originalEvent;
				var perc = originalEvent.loaded / originalEvent.total;
				$this.trigger('progress', [originalEvent, perc, originalEvent.loaded, originalEvent.total]);
				
				if(perc == 1) {
					window.setTimeout(function() {
						if(!that.ended) {
							that.ended = true;
							$this.trigger('load', [originalEvent, fileReader.result]);
						}
					}, 250);
				}
			})
			.on('loadstart', function(event) {
				that.ended = false;
				$this.trigger('loadstart', [event.originalEvent]);
			})
			.on('error', function(event) {
				$this.trigger('error', [event.originalEvent]);
			})
			.on('abort', function(event) {
				$this.trigger('abort', [event.originalEvent]);
			})
			.on('load', function(event) {
				that.ended = true;
				$this.trigger('load', [event.originalEvent, this.result]);
			})
			.on('loadend', function(event) {
				that.ended = true;
				$this.trigger('loadend', [event.originalEvent, this.result]);
			})
		;
	};

	Reader.Caniuse = function() {
		return ('FileReader' in window);
	};
	Reader.FilesFromEvent = function(event) {
		var files;
		
		if(event)
			files = event.target.files || event.dataTransfer.files;
		
		return files;
	};
	
	function createReader() {
		var reader = new Reader;
		var $reader = $(reader);
		
		$reader.abort = function() {
			reader.abort();
			return $reader;
		};
		
		$reader.readAsDataURL = function(file) {
			reader.readDataURL(file);
			return $reader;
		};
		$reader.readAsText = function(file) {
			reader.readText(file);
			return $reader;
		};
		$reader.readAsBinaryString = function(file) {
			reader.readBinaryString(file);
			return $reader;
		};
		$reader.readAsArrayBuffer = function(file) {
			reader.readArrayBuffer(file);
			return $reader;
		};
		
		return $reader;
	}
	
	$.extend({
		fileReader: function() {
			return createReader();
		},
		
		getFilesFromEvent: function(event) {
			return Reader.FilesFromEvent(event.originalEvent || event);
		},
		
		canReadFiles: function() {
			return Reader.Caniuse();
		}
	});
}( jQuery ));