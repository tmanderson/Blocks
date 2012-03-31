##Blocks
####A super-simple, super-compatible, super-awesome way to reuse blocks of HTML.

With Blocks, you can reuse your HTML on the client side:
    <div data-src="path/to/file.html">
    	This content is displayed before content is added/replaced.
    </div>

Blocks also currently supports two types of block loads: wrap, and replace.

**Replace** will replace the element that has the data-src with the content loaded from the server.

**Wrap** is the default setting (if no data-type is supplied) and just replaces the element's contents with the loaded content.

The settings can be used with the data-type attribute:
    <div data-src="path/to/file.html" data-type="wrap">
    	This content is displayed before content is added in here.
    </div>

Blocks also offers a **watch** feature, which will enable Blocks to load content in anytime there is a new blocks element added. Simply call the
    Blocks.watch();
function, which also takes an optional duration for DOM checks (defauts to 200ms). Use
    Blocks.stop();
to stop watching for blocks.

That's all there is to it!

###Current Support
- IE 5+
- Safari 4+
- Chrome 
- Firefox 3.0+
- iOS 3.0+
- Android 1.6+

* The current listed support is only what I've tested, I'm sure older versions of all (with the exception of IE) the browsers would support Blocks as well.