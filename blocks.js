(function(scope) {
	var Blocks,
		interval 	= 200,
		context 	= document,
		options,
		watcher,
		i;

	function init(options) {
		if(!document.getElementsByTagName || !document.body) setTimeout(init, 20);

		options = {
			src_attr	: options.src_attr || 'data-src',
			type_attr	: options.src_type || 'data-type'
		}

		loadBlocks();
	}

	function loadBlocks() {
		var blocks = context.getElementsByTagName('*');

		for(var i = blocks.length; --i >= 0;) {
			var block = blocks[i];
			if(block.getAttribute(src_attr)) {
				loadBlock(block.getAttribute(options.src_attr), block, block.getAttribute(options.type_attr));
			}
		}
	}

	function loadBlock(blockURL, element, type) {
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP.3.0');
		xhr.open('GET', blockURL, true);
		
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				if(!/404/g.test(xhr.status)) {
					if(!type || type === 'wrap') {
						element.removeAttribute(src_attr);
						element.removeAttribute(type_attr);
						element.innerHTML = xhr.responseText;
					} else {
						var parent 	= element.parentNode,
							temp	= document.createElement('div');

						if(parent) {
							temp.innerHTML = xhr.responseText;
							parent.replaceChild(temp, element);
						}
					}
				}
			}
		};
		xhr.send(null);
	}

	function watch(timer) {
		watcher = setInterval(checkForBlocks, timer || interval);
	}

	function stop() {
		clearInterval(watcher);
	}

	Blocks = {
		init: init
	};

	scope.Blocks = Blocks;
})(window);