(function(scope) {
	var Blocks,
		loading 	= [],
		loaded 		= [],
		queue 		= [],
		interval 	= 200,
		context 	= document,
		watcher,
		i;

	function init() {
		if(!document.getElementsByTagName || !document.body) setTimeout(init, 20);

		loadBlocks();
	}

	function loadBlocks() {
		var blocks = context.getElementsByTagName('*');

		for(var i = blocks.length; --i >= 0;) {
			var block = blocks[i];
			if(block.getAttribute('data-src')) {
				loadBlock(block.getAttribute('data-src'), block, block.getAttribute('data-type'));
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
						element.removeAttribute('data-src');
						element.removeAttribute('data-type');
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
		}
		xhr.send('?');
	}

	function watch(timer) {
		watcher = setInterval(checkForBlocks, timer || interval);
	}

	function stop() {
		clearInterval(watcher);
	}

	Blocks = {
		init: init
	}

	scope.Blocks = Blocks;
})(window);