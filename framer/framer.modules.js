require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"carouselcomponent/CarouselComponent":[function(require,module,exports){

/*
	 * USING THE CAROUSELCOMPONENT

	 * Require the module
	CarouselComponent = require "CarouselComponent"

	myCarousel = new CarouselComponent
		 * Item cells
		itemCount: <number>
		rounded: <boolean>
		itemMargin: <number>
		itemBorderRadius: <number>
		itemWidth: <number>
		itemHeight: <number>
		smallItemWidth: <number>
		smallItemHeight: <number>

		 * Labels
		title: <string>
		link: <string>
		captions: <array of strings>
		subcaptions: <array of strings>

		 * Layout
		margins: <array of numbers> ([topMargin, rightMargin, bottomMargin, leftMargin])
		wrap: <boolean>
		sideCaptions: <boolean>
		topAlignSideCaptions: <boolean>

		 * Hero-specific controls
		heroCaptionAlign: <string> ("left" | "center" | "right")
		centerheroItem: <boolean>
		sideHeroCaption: <boolean>
		topAlignHeroCaption: <boolean>

		 * Colors
		boxColor: <string> (hex or rgba)
		iconColor: <string> (hex or rgba)
		titleColor: <string> (hex or rgba)
		linkColor: <string> (hex or rgba)
		captionColor: <string> (hex or rgba)
		subcaptionColor: <string> (hex or rgba)

		 * Typography
		fontFamily: <string>
		titleFontSize: <number>
		titleFontWeight: <number>
		titleMargin: <number>
		linkFontSize: <number>
		linkFontWeight: <number>
		captionFontSize: <number>
		captionFontWeight: <number>
		captionMargin: <number>
		captionMaxHeight: <number>
		subcaptionFontSize: <number>
		subcaptionFontWeight: <number>
		subcaptionMargin: <number>
		subcaptionMaxHeight: <number>
		titleAlign: <string> ("left" | "center" | "right")
		captionAlign: <string> ("left" | "center" | "right")

		 * Icons
		icons: <boolean>
		iconBorderRadius: <number>
		iconSize: <number>
		iconMargin: <number>

		 * Image assets
		imagePrefix: <string> ("images" directory assumed)
		imageSuffix: <string>
		iconPrefix: <string> ("images" directory assumed)
		iconSuffix: <string>

		 * Actions
		itemActions: <array of actions>
		linkAction: <action>

		 * View CarouselComponent frame
		debug: <boolean>

		 * Other
		forceScrolling: <boolean>

	 * Using side captions
	Specify sideCaptions: true to vertically align captions alongside cells rather than underneath. Specify topAlignSideCaptions: true to align side captions to the tops of their adjacent cells.

	 * Using the wrap feature
	 * If you specify wrap: true, the first item in the carousel will display on its own row as a "hero" item. This item can be controlled independently of the rest of the carousel. Secondary cells will be sized according to smallItemWidth and smallItemHeight rather than itemWidth and itemHeight.

	 * Using icons
	 * Icons can be displayed under each item's cell. Specify icons: true to enable this. Enabling icons prevents the use of side captions.

	 * Using images
	 * All images are assumed to live in the images directory and be numbered with an initial index of zero. You may supply both a prefix and suffix. If your item images are located in an "items" directory within "images" and named:

	cell0.png
	cell1.png
	cell2.png

	 * then your imagePrefix would be "items/cell" and your suffix would be "png".

	 * Icon assets work the same way.

	 * Do not include the images directory in imagePrefix or iconPrefix.

	 * Assigning margins
	 * Margins are supplied in the same order as for CSS. margins: [40, 10, 15, 5] will provide a top margin of 40, a right margin of 10, a bottom margin of 15 and a left margin of 5. The first item is positioned according to the top margin; however the title and link are positioned relative to the first item using titleMargin.

	 * Scrolling
	 * The CarouselComponent will attempt to provide scrolling only when its content extends beyond the visible area. To enforce scrolling regardless, specify forceScrolling: true.

	 * Assigning actions
	 * The link button in the upper right of the carousel can be given an action, as can individual item cells. The link will only appear if you supply a string with link: <string> and the CarouselComponent includes at least two items. Item actions should be arranged in a comma-separated array, one action per line.
	linkAction: -> print "link"
	itemActions: [
		-> print "1",
		-> print "second",
		-> print "item the third"
	]

	 * Referring to parts of the CarouselComponent
	 * The CarouselComponent contains a PageComponent which can be accessed with .row. Items and their components can be accessed with the .items array. .heroItem is available when wrap is set to true.
	print myCarousel.row.currentPage
	print myCarousel.heroItem?.caption?.text
	print myCarousel.items[0].textBlock
	print myCarousel.items[0].cell
 */
var CarouselComponent, defaults, rounded,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaults = {
  itemCount: 3,
  debug: false,
  rounded: false,
  wrap: false,
  sideCaptions: false,
  captionAlign: "left",
  titleAlign: "left",
  topAlignSideCaptions: false,
  centerheroItem: false,
  heroCaptionAlign: "left",
  sideHeroCaption: false,
  topAlignHeroCaption: true,
  icons: false,
  clip: true,
  forceScrolling: false,
  margins: [40, 0, 0, 0],
  itemMargin: 12,
  itemBorderRadius: 10,
  itemWidth: 160,
  itemHeight: 120,
  smallItemWidth: 80,
  smallItemHeight: 60,
  titleFontSize: 20,
  titleFontWeight: 800,
  titleMargin: 4,
  linkFontSize: 16,
  linkFontWeight: 400,
  captionFontSize: 18,
  captionFontWeight: 400,
  captionMaxHeight: 100,
  subcaptionFontSize: 16,
  subcaptionFontWeight: 400,
  subcaptionMaxHeight: 100,
  iconBorderRadius: 10,
  iconSize: 40,
  iconMargin: 8,
  captionMargin: 10,
  subcaptionMargin: 0,
  backgroundColor: "clear",
  boxColor: "#F5F5F5",
  iconColor: "",
  titleColor: "#F5F5F5",
  linkColor: "",
  captionColor: "",
  subcaptionColor: "",
  fontFamily: "",
  title: "Carousel Title",
  link: "",
  imagePrefix: "",
  imageSuffix: "png",
  iconPrefix: "",
  iconSuffix: "png",
  captions: [],
  subcaptions: [],
  itemActions: [],
  linkAction: function() {}
};

rounded = {
  itemWidth: 120,
  itemHeight: 120,
  smallItemWidth: 60,
  smallItemHeight: 60
};

CarouselComponent = (function(superClass) {
  extend(CarouselComponent, superClass);

  function CarouselComponent(options) {
    var bottomMargin, createItem, heroItemContainer, i, j, leftMargin, link, margin, noop, offset, ref, ref1, ref2, ref3, rightMargin, row, title, topMargin;
    this.options = options != null ? options : {};
    this.options = _.assign({}, defaults, this.options);
    if (this.options.rounded === true) {
      this.options = _.assign({}, rounded, this.options);
    }
    CarouselComponent.__super__.constructor.call(this, this.options);
    noop = function() {};
    this.items = [];
    ref = this.options.margins, topMargin = ref[0], rightMargin = ref[1], bottomMargin = ref[2], leftMargin = ref[3];
    this.clip = this.options.clip;
    this.backgroundColor = this.options.backgroundColor;
    this.width = this.options.width || Screen.width;
    this.x = this.options.x;
    if (this.options.debug === true) {
      this.backgroundColor = "rgba(254, 163, 32, 0.25)";
    }
    if (this.options.icons === true) {
      this.options.sideCaptions = "none";
    }
    offset = this.options.wrap === true ? 1 : 0;
    margin = new Layer({
      parent: this,
      name: "margin",
      width: this.width,
      height: 1,
      visible: false
    });
    this.margin = margin;
    title = new TextLayer({
      parent: this,
      x: leftMargin,
      text: this.options.title,
      fontSize: this.options.titleFontSize,
      color: this.options.titleColor,
      textAlign: this.options.titleAlign,
      fontWeight: this.options.titleFontWeight,
      width: this.width - leftMargin - rightMargin
    });
    this.title = title;
    title.maxY = topMargin - this.options.titleMargin;
    if (this.options.fontFamily !== "") {
      title.fontFamily = this.options.fontFamily;
    }
    if (this.options.link !== "") {
      link = new TextLayer({
        parent: this,
        text: this.options.link,
        fontSize: this.options.titleFontSize,
        originX: 1,
        originY: 1,
        autoSize: true,
        autoSizeHeight: true,
        color: this.options.linkColor || this.options.captionColor || this.options.titleColor,
        textAlign: "right",
        fontWeight: this.options.linkFontWeight,
        x: Align.right(-rightMargin),
        y: title.y,
        scale: this.options.linkFontSize / this.options.titleFontSize
      });
      this.link = link;
      if (this.options.fontFamily !== "") {
        link.fontFamily = this.options.fontFamily;
      }
      if (this.options.linkAction !== noop) {
        link.onClick((function(_this) {
          return function() {
            return _this.options.linkAction();
          };
        })(this));
      }
    }
    createItem = (function(_this) {
      return function(i, parent, hero) {
        var block, caption, icon, indexOffset, item, itemHeight, itemWidth, subcaption, textBlock;
        if (i == null) {
          i = 0;
        }
        if (parent == null) {
          parent = null;
        }
        if (hero == null) {
          hero = false;
        }
        if (hero === false && _this.options.wrap === true) {
          indexOffset = 1;
          itemWidth = _this.options.smallItemWidth;
          itemHeight = _this.options.smallItemHeight;
        } else {
          indexOffset = 0;
          itemWidth = _this.options.itemWidth;
          itemHeight = _this.options.itemHeight;
        }
        item = new Layer({
          name: "item" + (i + indexOffset),
          width: itemWidth,
          height: itemHeight,
          backgroundColor: "clear",
          clip: false
        });
        if (parent instanceof PageComponent) {
          parent.addPage(item);
        } else {
          item.parent = parent;
        }
        block = new Layer({
          parent: item,
          name: "block" + (i + indexOffset),
          width: itemWidth,
          height: itemHeight,
          backgroundColor: _this.options.boxColor,
          borderRadius: _this.options.itemBorderRadius,
          image: "images/" + _this.options.imagePrefix + (i + indexOffset) + "." + _this.options.imageSuffix,
          style: {
            "background-position": "center center",
            "background-size": "cover"
          }
        });
        item.cell = block;
        if (_this.options.itemActions[i + indexOffset] !== noop && _this.options.itemActions[i + indexOffset] !== void 0) {
          item.onClick(function() {
            if (parent.parent.isDragging) {
              return;
            }
            return _this.options.itemActions[i + indexOffset]();
          });
        }
        if (_this.options.icons === true) {
          icon = new Layer({
            parent: item,
            name: "icon" + (i + indexOffset),
            width: _this.options.iconSize,
            height: _this.options.iconSize,
            backgroundColor: _this.options.iconColor || _this.options.boxColor,
            borderRadius: _this.options.iconBorderRadius,
            y: block.maxY + _this.options.iconMargin,
            image: "images/" + _this.options.iconPrefix + (i + indexOffset) + "." + _this.options.iconSuffix,
            style: {
              "background-position": "center center",
              "background-size": "cover"
            }
          });
          item.icon = icon;
        }
        textBlock = new Layer({
          parent: item,
          name: "textBlock" + (i + indexOffset),
          width: _this.options.icons === true ? itemWidth - _this.options.iconSize - _this.options.iconMargin : itemWidth,
          height: item.height,
          backgroundColor: "clear",
          x: _this.captionAlignHorizontal((_this.options.icons === true ? _this.options.iconSize : block.width), hero)
        });
        item.textBlock = textBlock;
        caption = new TextLayer({
          parent: textBlock,
          name: "caption" + (i + indexOffset),
          width: textBlock.width,
          color: _this.options.captionColor || _this.options.titleColor,
          text: _this.options.captions[i + indexOffset] || "",
          textAlign: "left",
          fontWeight: _this.options.captionFontWeight,
          fontSize: _this.options.captionFontSize
        });
        item.caption = caption;
        if (caption.height > _this.options.captionMaxHeight) {
          caption.height = _this.options.captionMaxHeight;
          caption.truncate = true;
        }
        if (_this.options.fontFamily !== "") {
          caption.fontFamily = _this.options.fontFamily;
        }
        if (_this.options.subcaptions !== []) {
          subcaption = new TextLayer({
            parent: textBlock,
            name: "subcaption" + (i + indexOffset),
            width: textBlock.width,
            color: _this.options.subcaptionColor || _this.options.captionColor || _this.options.titleColor,
            text: _this.options.subcaptions[i + indexOffset] || "",
            textAlign: "left",
            fontWeight: _this.options.subcaptionFontWeight,
            fontSize: _this.options.subcaptionFontSize,
            letterSpacing: -0.6,
            y: caption.maxY + _this.options.subcaptionMargin
          });
          item.subcaption = subcaption;
          if (subcaption.height > _this.options.subcaptionMaxHeight) {
            subcaption.height = _this.options.subcaptionMaxHeight;
            subcaption.truncate = true;
          }
          if (_this.options.fontFamily !== "") {
            subcaption.fontFamily = _this.options.fontFamily;
          }
        }
        if (_this.options.rounded === true) {
          block.borderRadius = Math.max(_this.options.itemWidth, _this.options.itemHeight) / 2;
        }
        caption.textAlign = _this.options.captionAlign;
        if (subcaption != null) {
          subcaption.textAlign = _this.options.captionAlign;
        }
        _this.items.push(item);
        textBlock.height = textBlock.contentFrame().height;
        textBlock.y = _this.captionAlignVertical(block.height, hero);
        item.height = item.contentFrame().height;
        item.width = item.contentFrame().width;
        if (_this.items.indexOf(item) > offset) {
          return item.x = item.x + _this.options.itemMargin;
        }
      };
    })(this);
    if (this.options.wrap === true) {
      heroItemContainer = new Layer({
        parent: this,
        name: "heroItemContainer",
        y: topMargin,
        x: this.options.centerheroItem === true ? Align.center : leftMargin,
        backgroundColor: "clear"
      });
      createItem(0, heroItemContainer, true);
      heroItemContainer.height = heroItemContainer.contentFrame().height;
      heroItemContainer.width = heroItemContainer.contentFrame().width;
      this.heroItem = heroItemContainer.children[0];
      this.heroItem.name = "heroItem";
      this.heroItem.caption.textAlign = this.options.heroCaptionAlign;
      if ((ref1 = this.heroItem.subcaption) != null) {
        ref1.textAlign = this.options.heroCaptionAlign;
      }
    }
    row = new PageComponent({
      parent: this,
      name: "row",
      y: this.options.wrap === true ? heroItemContainer.maxY + this.options.itemMargin : topMargin,
      scrollVertical: false,
      scrollHorizontal: true,
      velocityThreshold: 0.1,
      clip: false,
      originX: 0,
      contentInset: {
        top: 0,
        right: rightMargin,
        bottom: 0,
        left: leftMargin
      }
    });
    this.row = row;
    if (this.options.itemCount < 2) {
      row.scrollHorizontal = false;
      if (link != null) {
        link.destroy();
      }
    }
    for (i = j = 0, ref2 = this.options.itemCount - offset; 0 <= ref2 ? j < ref2 : j > ref2; i = 0 <= ref2 ? ++j : --j) {
      createItem(i, row, false);
    }
    row.onSwipeLeft((function(_this) {
      return function() {
        var maxPage;
        if (_this.options.forceScrolling !== true && _this.checkIfNeedsScrolling(row)) {
          maxPage = _this.options.itemCount - Math.floor(_this.width / (_this.options.itemWidth + _this.options.itemMargin)) - offset;
          if (row.content.maxX < _this.maxX) {
            return row.snapToPage(_this.items[maxPage]);
          }
        }
      };
    })(this));
    row.width = (ref3 = row.content.children[0]) != null ? ref3.width : void 0;
    row.content.width = row.content.contentFrame().width;
    row.content.height = row.content.contentFrame().height;
    row.height = row.contentFrame().height;
    row.content.clip = false;
    row.scrollHorizontal = this.checkIfNeedsScrolling(row);
    this.height = this.contentFrame().height + bottomMargin;
  }

  CarouselComponent.prototype.checkIfNeedsScrolling = function(layer) {
    var needsScrolling, ref;
    if (layer == null) {
      layer = null;
    }
    if (this.options.forceScrolling === true) {
      needsScrolling = true;
    } else if (((ref = layer.content) != null ? ref.contentFrame().width : void 0) > this.width) {
      needsScrolling = true;
    } else {
      needsScrolling = false;
    }
    return needsScrolling;
  };

  CarouselComponent.prototype.captionAlignVertical = function(itemHeight, hero) {
    var align;
    if (itemHeight == null) {
      itemHeight = 0;
    }
    if (hero == null) {
      hero = false;
    }
    align = itemHeight + this.options.captionMargin;
    if (this.options.icons === true) {
      align = itemHeight + this.options.iconMargin;
    } else if (hero === true) {
      if (this.options.sideHeroCaption === true) {
        if (this.options.topAlignHeroCaption === true) {
          align = Align.top;
        } else {
          align = Align.center;
        }
      }
    } else if (this.options.sideCaptions === true) {
      if (this.options.topAlignCaptions === true) {
        align = Align.top;
      } else {
        align = Align.center;
      }
    }
    return align;
  };

  CarouselComponent.prototype.captionAlignHorizontal = function(itemWidth, hero) {
    var align;
    if (itemWidth == null) {
      itemWidth = 0;
    }
    if (hero == null) {
      hero = false;
    }
    align = Align.left;
    if (this.options.icons === true) {
      align = itemWidth + this.options.iconMargin;
    } else if (hero === true) {
      if (this.options.sideHeroCaption === true) {
        align = itemWidth + this.options.captionMargin;
      }
    } else if (this.options.sideCaptions === true) {
      align = itemWidth + this.options.captionMargin;
    } else if (this.options.sideCaptions === true) {
      align = itemWidth + this.options.captionMargin;
    }
    return align;
  };

  return CarouselComponent;

})(Layer);

module.exports = CarouselComponent;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NoZW5nanVuL0Rlc2t0b3AvZnJhbWVyL3F1bmFyaG9tZXBhZ2UuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2hlbmdqdW4vRGVza3RvcC9mcmFtZXIvcXVuYXJob21lcGFnZS5mcmFtZXIvbW9kdWxlcy9jYXJvdXNlbGNvbXBvbmVudC9DYXJvdXNlbENvbXBvbmVudC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIyNcblx0IyBVU0lORyBUSEUgQ0FST1VTRUxDT01QT05FTlRcblxuXHQjIFJlcXVpcmUgdGhlIG1vZHVsZVxuXHRDYXJvdXNlbENvbXBvbmVudCA9IHJlcXVpcmUgXCJDYXJvdXNlbENvbXBvbmVudFwiXG5cblx0bXlDYXJvdXNlbCA9IG5ldyBDYXJvdXNlbENvbXBvbmVudFxuXHRcdCMgSXRlbSBjZWxsc1xuXHRcdGl0ZW1Db3VudDogPG51bWJlcj5cblx0XHRyb3VuZGVkOiA8Ym9vbGVhbj5cblx0XHRpdGVtTWFyZ2luOiA8bnVtYmVyPlxuXHRcdGl0ZW1Cb3JkZXJSYWRpdXM6IDxudW1iZXI+XG5cdFx0aXRlbVdpZHRoOiA8bnVtYmVyPlxuXHRcdGl0ZW1IZWlnaHQ6IDxudW1iZXI+XG5cdFx0c21hbGxJdGVtV2lkdGg6IDxudW1iZXI+XG5cdFx0c21hbGxJdGVtSGVpZ2h0OiA8bnVtYmVyPlxuXG5cdFx0IyBMYWJlbHNcblx0XHR0aXRsZTogPHN0cmluZz5cblx0XHRsaW5rOiA8c3RyaW5nPlxuXHRcdGNhcHRpb25zOiA8YXJyYXkgb2Ygc3RyaW5ncz5cblx0XHRzdWJjYXB0aW9uczogPGFycmF5IG9mIHN0cmluZ3M+XG5cblx0XHQjIExheW91dFxuXHRcdG1hcmdpbnM6IDxhcnJheSBvZiBudW1iZXJzPiAoW3RvcE1hcmdpbiwgcmlnaHRNYXJnaW4sIGJvdHRvbU1hcmdpbiwgbGVmdE1hcmdpbl0pXG5cdFx0d3JhcDogPGJvb2xlYW4+XG5cdFx0c2lkZUNhcHRpb25zOiA8Ym9vbGVhbj5cblx0XHR0b3BBbGlnblNpZGVDYXB0aW9uczogPGJvb2xlYW4+XG5cblx0XHQjIEhlcm8tc3BlY2lmaWMgY29udHJvbHNcblx0XHRoZXJvQ2FwdGlvbkFsaWduOiA8c3RyaW5nPiAoXCJsZWZ0XCIgfCBcImNlbnRlclwiIHwgXCJyaWdodFwiKVxuXHRcdGNlbnRlcmhlcm9JdGVtOiA8Ym9vbGVhbj5cblx0XHRzaWRlSGVyb0NhcHRpb246IDxib29sZWFuPlxuXHRcdHRvcEFsaWduSGVyb0NhcHRpb246IDxib29sZWFuPlxuXG5cdFx0IyBDb2xvcnNcblx0XHRib3hDb2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdGljb25Db2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdHRpdGxlQ29sb3I6IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblx0XHRsaW5rQ29sb3I6IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblx0XHRjYXB0aW9uQ29sb3I6IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblx0XHRzdWJjYXB0aW9uQ29sb3I6IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblxuXHRcdCMgVHlwb2dyYXBoeVxuXHRcdGZvbnRGYW1pbHk6IDxzdHJpbmc+XG5cdFx0dGl0bGVGb250U2l6ZTogPG51bWJlcj5cblx0XHR0aXRsZUZvbnRXZWlnaHQ6IDxudW1iZXI+XG5cdFx0dGl0bGVNYXJnaW46IDxudW1iZXI+XG5cdFx0bGlua0ZvbnRTaXplOiA8bnVtYmVyPlxuXHRcdGxpbmtGb250V2VpZ2h0OiA8bnVtYmVyPlxuXHRcdGNhcHRpb25Gb250U2l6ZTogPG51bWJlcj5cblx0XHRjYXB0aW9uRm9udFdlaWdodDogPG51bWJlcj5cblx0XHRjYXB0aW9uTWFyZ2luOiA8bnVtYmVyPlxuXHRcdGNhcHRpb25NYXhIZWlnaHQ6IDxudW1iZXI+XG5cdFx0c3ViY2FwdGlvbkZvbnRTaXplOiA8bnVtYmVyPlxuXHRcdHN1YmNhcHRpb25Gb250V2VpZ2h0OiA8bnVtYmVyPlxuXHRcdHN1YmNhcHRpb25NYXJnaW46IDxudW1iZXI+XG5cdFx0c3ViY2FwdGlvbk1heEhlaWdodDogPG51bWJlcj5cblx0XHR0aXRsZUFsaWduOiA8c3RyaW5nPiAoXCJsZWZ0XCIgfCBcImNlbnRlclwiIHwgXCJyaWdodFwiKVxuXHRcdGNhcHRpb25BbGlnbjogPHN0cmluZz4gKFwibGVmdFwiIHwgXCJjZW50ZXJcIiB8IFwicmlnaHRcIilcblxuXHRcdCMgSWNvbnNcblx0XHRpY29uczogPGJvb2xlYW4+XG5cdFx0aWNvbkJvcmRlclJhZGl1czogPG51bWJlcj5cblx0XHRpY29uU2l6ZTogPG51bWJlcj5cblx0XHRpY29uTWFyZ2luOiA8bnVtYmVyPlxuXG5cdFx0IyBJbWFnZSBhc3NldHNcblx0XHRpbWFnZVByZWZpeDogPHN0cmluZz4gKFwiaW1hZ2VzXCIgZGlyZWN0b3J5IGFzc3VtZWQpXG5cdFx0aW1hZ2VTdWZmaXg6IDxzdHJpbmc+XG5cdFx0aWNvblByZWZpeDogPHN0cmluZz4gKFwiaW1hZ2VzXCIgZGlyZWN0b3J5IGFzc3VtZWQpXG5cdFx0aWNvblN1ZmZpeDogPHN0cmluZz5cblxuXHRcdCMgQWN0aW9uc1xuXHRcdGl0ZW1BY3Rpb25zOiA8YXJyYXkgb2YgYWN0aW9ucz5cblx0XHRsaW5rQWN0aW9uOiA8YWN0aW9uPlxuXG5cdFx0IyBWaWV3IENhcm91c2VsQ29tcG9uZW50IGZyYW1lXG5cdFx0ZGVidWc6IDxib29sZWFuPlxuXG5cdFx0IyBPdGhlclxuXHRcdGZvcmNlU2Nyb2xsaW5nOiA8Ym9vbGVhbj5cblxuXHQjIFVzaW5nIHNpZGUgY2FwdGlvbnNcblx0U3BlY2lmeSBzaWRlQ2FwdGlvbnM6IHRydWUgdG8gdmVydGljYWxseSBhbGlnbiBjYXB0aW9ucyBhbG9uZ3NpZGUgY2VsbHMgcmF0aGVyIHRoYW4gdW5kZXJuZWF0aC4gU3BlY2lmeSB0b3BBbGlnblNpZGVDYXB0aW9uczogdHJ1ZSB0byBhbGlnbiBzaWRlIGNhcHRpb25zIHRvIHRoZSB0b3BzIG9mIHRoZWlyIGFkamFjZW50IGNlbGxzLlxuXG5cdCMgVXNpbmcgdGhlIHdyYXAgZmVhdHVyZVxuXHQjIElmIHlvdSBzcGVjaWZ5IHdyYXA6IHRydWUsIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBjYXJvdXNlbCB3aWxsIGRpc3BsYXkgb24gaXRzIG93biByb3cgYXMgYSBcImhlcm9cIiBpdGVtLiBUaGlzIGl0ZW0gY2FuIGJlIGNvbnRyb2xsZWQgaW5kZXBlbmRlbnRseSBvZiB0aGUgcmVzdCBvZiB0aGUgY2Fyb3VzZWwuIFNlY29uZGFyeSBjZWxscyB3aWxsIGJlIHNpemVkIGFjY29yZGluZyB0byBzbWFsbEl0ZW1XaWR0aCBhbmQgc21hbGxJdGVtSGVpZ2h0IHJhdGhlciB0aGFuIGl0ZW1XaWR0aCBhbmQgaXRlbUhlaWdodC5cblxuXHQjIFVzaW5nIGljb25zXG5cdCMgSWNvbnMgY2FuIGJlIGRpc3BsYXllZCB1bmRlciBlYWNoIGl0ZW0ncyBjZWxsLiBTcGVjaWZ5IGljb25zOiB0cnVlIHRvIGVuYWJsZSB0aGlzLiBFbmFibGluZyBpY29ucyBwcmV2ZW50cyB0aGUgdXNlIG9mIHNpZGUgY2FwdGlvbnMuXG5cblx0IyBVc2luZyBpbWFnZXNcblx0IyBBbGwgaW1hZ2VzIGFyZSBhc3N1bWVkIHRvIGxpdmUgaW4gdGhlIGltYWdlcyBkaXJlY3RvcnkgYW5kIGJlIG51bWJlcmVkIHdpdGggYW4gaW5pdGlhbCBpbmRleCBvZiB6ZXJvLiBZb3UgbWF5IHN1cHBseSBib3RoIGEgcHJlZml4IGFuZCBzdWZmaXguIElmIHlvdXIgaXRlbSBpbWFnZXMgYXJlIGxvY2F0ZWQgaW4gYW4gXCJpdGVtc1wiIGRpcmVjdG9yeSB3aXRoaW4gXCJpbWFnZXNcIiBhbmQgbmFtZWQ6XG5cblx0Y2VsbDAucG5nXG5cdGNlbGwxLnBuZ1xuXHRjZWxsMi5wbmdcblxuXHQjIHRoZW4geW91ciBpbWFnZVByZWZpeCB3b3VsZCBiZSBcIml0ZW1zL2NlbGxcIiBhbmQgeW91ciBzdWZmaXggd291bGQgYmUgXCJwbmdcIi5cblxuXHQjIEljb24gYXNzZXRzIHdvcmsgdGhlIHNhbWUgd2F5LlxuXG5cdCMgRG8gbm90IGluY2x1ZGUgdGhlIGltYWdlcyBkaXJlY3RvcnkgaW4gaW1hZ2VQcmVmaXggb3IgaWNvblByZWZpeC5cblxuXHQjIEFzc2lnbmluZyBtYXJnaW5zXG5cdCMgTWFyZ2lucyBhcmUgc3VwcGxpZWQgaW4gdGhlIHNhbWUgb3JkZXIgYXMgZm9yIENTUy4gbWFyZ2luczogWzQwLCAxMCwgMTUsIDVdIHdpbGwgcHJvdmlkZSBhIHRvcCBtYXJnaW4gb2YgNDAsIGEgcmlnaHQgbWFyZ2luIG9mIDEwLCBhIGJvdHRvbSBtYXJnaW4gb2YgMTUgYW5kIGEgbGVmdCBtYXJnaW4gb2YgNS4gVGhlIGZpcnN0IGl0ZW0gaXMgcG9zaXRpb25lZCBhY2NvcmRpbmcgdG8gdGhlIHRvcCBtYXJnaW47IGhvd2V2ZXIgdGhlIHRpdGxlIGFuZCBsaW5rIGFyZSBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIHRoZSBmaXJzdCBpdGVtIHVzaW5nIHRpdGxlTWFyZ2luLlxuXG5cdCMgU2Nyb2xsaW5nXG5cdCMgVGhlIENhcm91c2VsQ29tcG9uZW50IHdpbGwgYXR0ZW1wdCB0byBwcm92aWRlIHNjcm9sbGluZyBvbmx5IHdoZW4gaXRzIGNvbnRlbnQgZXh0ZW5kcyBiZXlvbmQgdGhlIHZpc2libGUgYXJlYS4gVG8gZW5mb3JjZSBzY3JvbGxpbmcgcmVnYXJkbGVzcywgc3BlY2lmeSBmb3JjZVNjcm9sbGluZzogdHJ1ZS5cblxuXHQjIEFzc2lnbmluZyBhY3Rpb25zXG5cdCMgVGhlIGxpbmsgYnV0dG9uIGluIHRoZSB1cHBlciByaWdodCBvZiB0aGUgY2Fyb3VzZWwgY2FuIGJlIGdpdmVuIGFuIGFjdGlvbiwgYXMgY2FuIGluZGl2aWR1YWwgaXRlbSBjZWxscy4gVGhlIGxpbmsgd2lsbCBvbmx5IGFwcGVhciBpZiB5b3Ugc3VwcGx5IGEgc3RyaW5nIHdpdGggbGluazogPHN0cmluZz4gYW5kIHRoZSBDYXJvdXNlbENvbXBvbmVudCBpbmNsdWRlcyBhdCBsZWFzdCB0d28gaXRlbXMuIEl0ZW0gYWN0aW9ucyBzaG91bGQgYmUgYXJyYW5nZWQgaW4gYSBjb21tYS1zZXBhcmF0ZWQgYXJyYXksIG9uZSBhY3Rpb24gcGVyIGxpbmUuXG5cdGxpbmtBY3Rpb246IC0+IHByaW50IFwibGlua1wiXG5cdGl0ZW1BY3Rpb25zOiBbXG5cdFx0LT4gcHJpbnQgXCIxXCIsXG5cdFx0LT4gcHJpbnQgXCJzZWNvbmRcIixcblx0XHQtPiBwcmludCBcIml0ZW0gdGhlIHRoaXJkXCJcblx0XVxuXG5cdCMgUmVmZXJyaW5nIHRvIHBhcnRzIG9mIHRoZSBDYXJvdXNlbENvbXBvbmVudFxuXHQjIFRoZSBDYXJvdXNlbENvbXBvbmVudCBjb250YWlucyBhIFBhZ2VDb21wb25lbnQgd2hpY2ggY2FuIGJlIGFjY2Vzc2VkIHdpdGggLnJvdy4gSXRlbXMgYW5kIHRoZWlyIGNvbXBvbmVudHMgY2FuIGJlIGFjY2Vzc2VkIHdpdGggdGhlIC5pdGVtcyBhcnJheS4gLmhlcm9JdGVtIGlzIGF2YWlsYWJsZSB3aGVuIHdyYXAgaXMgc2V0IHRvIHRydWUuXG5cdHByaW50IG15Q2Fyb3VzZWwucm93LmN1cnJlbnRQYWdlXG5cdHByaW50IG15Q2Fyb3VzZWwuaGVyb0l0ZW0/LmNhcHRpb24/LnRleHRcblx0cHJpbnQgbXlDYXJvdXNlbC5pdGVtc1swXS50ZXh0QmxvY2tcblx0cHJpbnQgbXlDYXJvdXNlbC5pdGVtc1swXS5jZWxsXG4jIyNcblxuZGVmYXVsdHMgPVxuXHRpdGVtQ291bnQ6IDNcblxuXHRkZWJ1ZzogZmFsc2Vcblx0cm91bmRlZDogZmFsc2Vcblx0d3JhcDogZmFsc2Vcblx0c2lkZUNhcHRpb25zOiBmYWxzZVxuXHRjYXB0aW9uQWxpZ246IFwibGVmdFwiXG5cdHRpdGxlQWxpZ246IFwibGVmdFwiXG5cdHRvcEFsaWduU2lkZUNhcHRpb25zOiBmYWxzZVxuXHRjZW50ZXJoZXJvSXRlbTogZmFsc2Vcblx0aGVyb0NhcHRpb25BbGlnbjogXCJsZWZ0XCJcblx0c2lkZUhlcm9DYXB0aW9uOiBmYWxzZVxuXHR0b3BBbGlnbkhlcm9DYXB0aW9uOiB0cnVlXG5cdGljb25zOiBmYWxzZVxuXHRjbGlwOiB0cnVlXG5cdGZvcmNlU2Nyb2xsaW5nOiBmYWxzZVxuXHRtYXJnaW5zOiBbNDAsMCwwLDBdXG5cdGl0ZW1NYXJnaW46IDEyXG5cdGl0ZW1Cb3JkZXJSYWRpdXM6IDEwXG5cdGl0ZW1XaWR0aDogMTYwXG5cdGl0ZW1IZWlnaHQ6IDEyMFxuXHRzbWFsbEl0ZW1XaWR0aDogODBcblx0c21hbGxJdGVtSGVpZ2h0OiA2MFxuXHR0aXRsZUZvbnRTaXplOiAyMFxuXHR0aXRsZUZvbnRXZWlnaHQ6IDgwMFxuXHR0aXRsZU1hcmdpbjogNFxuXHRsaW5rRm9udFNpemU6IDE2XG5cdGxpbmtGb250V2VpZ2h0OiA0MDBcblx0Y2FwdGlvbkZvbnRTaXplOiAxOFxuXHRjYXB0aW9uRm9udFdlaWdodDogNDAwXG5cdGNhcHRpb25NYXhIZWlnaHQ6IDEwMFxuXHRzdWJjYXB0aW9uRm9udFNpemU6IDE2XG5cdHN1YmNhcHRpb25Gb250V2VpZ2h0OiA0MDBcblx0c3ViY2FwdGlvbk1heEhlaWdodDogMTAwXG5cblx0aWNvbkJvcmRlclJhZGl1czogMTBcblx0aWNvblNpemU6IDQwXG5cdGljb25NYXJnaW46IDhcblxuXHRjYXB0aW9uTWFyZ2luOiAxMFxuXHRzdWJjYXB0aW9uTWFyZ2luOiAwXG5cblx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblx0Ym94Q29sb3I6IFwiI0Y1RjVGNVwiXG5cdGljb25Db2xvcjogXCJcIlxuXHR0aXRsZUNvbG9yOiBcIiNGNUY1RjVcIlxuXHRsaW5rQ29sb3I6IFwiXCJcblx0Y2FwdGlvbkNvbG9yOiBcIlwiXG5cdHN1YmNhcHRpb25Db2xvcjogXCJcIlxuXG5cdGZvbnRGYW1pbHk6IFwiXCJcblx0dGl0bGU6IFwiQ2Fyb3VzZWwgVGl0bGVcIlxuXHRsaW5rOiBcIlwiXG5cdGltYWdlUHJlZml4OiBcIlwiXG5cdGltYWdlU3VmZml4OiBcInBuZ1wiXG5cdGljb25QcmVmaXg6IFwiXCJcblx0aWNvblN1ZmZpeDogXCJwbmdcIlxuXHRjYXB0aW9uczogW11cblx0c3ViY2FwdGlvbnM6IFtdXG5cdGl0ZW1BY3Rpb25zOiBbXVxuXHRsaW5rQWN0aW9uOiAoKSAtPlxuXG5yb3VuZGVkID1cblx0aXRlbVdpZHRoOiAxMjBcblx0aXRlbUhlaWdodDogMTIwXG5cdHNtYWxsSXRlbVdpZHRoOiA2MFxuXHRzbWFsbEl0ZW1IZWlnaHQ6IDYwXG5cbiMgQ2Fyb3VzZWxDb21wb25lbnQgY2xhc3NcbmNsYXNzIENhcm91c2VsQ29tcG9uZW50IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucyA9IF8uYXNzaWduKHt9LCBkZWZhdWx0cywgQG9wdGlvbnMpXG5cdFx0aWYgQG9wdGlvbnMucm91bmRlZCA9PSB0cnVlXG5cdFx0XHRAb3B0aW9ucyA9IF8uYXNzaWduKHt9LCByb3VuZGVkLCBAb3B0aW9ucylcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0bm9vcCA9ICgpIC0+XG5cdFx0QC5pdGVtcyA9IFtdXG5cblx0XHQjIGJyZWFrIG91dCBtYXJnaW5zXG5cdFx0W3RvcE1hcmdpbiwgcmlnaHRNYXJnaW4sIGJvdHRvbU1hcmdpbiwgbGVmdE1hcmdpbl0gPSBAb3B0aW9ucy5tYXJnaW5zXG5cblx0XHQjIGNvbnRhaW5lciB2aWV3XG5cdFx0QC5jbGlwID0gQG9wdGlvbnMuY2xpcFxuXHRcdEAuYmFja2dyb3VuZENvbG9yID0gQG9wdGlvbnMuYmFja2dyb3VuZENvbG9yXG5cdFx0QC53aWR0aCA9IEBvcHRpb25zLndpZHRoIG9yIFNjcmVlbi53aWR0aFxuXHRcdEAueCA9IEBvcHRpb25zLnhcblx0XHRpZiBAb3B0aW9ucy5kZWJ1ZyA9PSB0cnVlXG5cdFx0XHRALmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTQsIDE2MywgMzIsIDAuMjUpXCJcblxuXHRcdCMgaWNvbiBzZXR0aW5nIGluY29tcGF0aWJpbGUgd2l0aCBzaWRlIGNhcHRpb25zIGZvciBub3dcblx0XHRpZiBAb3B0aW9ucy5pY29ucyA9PSB0cnVlXG5cdFx0XHRAb3B0aW9ucy5zaWRlQ2FwdGlvbnMgPSBcIm5vbmVcIlxuXG5cdFx0IyBvZmZzZXQgaXMgdXNlZCB0byBwYXNzIG92ZXIgMXN0IGNlbGwgaW4gYSB3cmFwcGluZyBzaXR1YXRpb25cblx0XHRvZmZzZXQgPSBpZiBAb3B0aW9ucy53cmFwID09IHRydWUgdGhlbiAxIGVsc2UgMFxuXG5cdFx0IyBoaWRkZW4gbWFyZ2luIGhlbHBzIGNvbnRlbnRGcmFtZSgpIHBlcmZvcm0gY29ycmVjdGx5XG5cdFx0bWFyZ2luID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwibWFyZ2luXCJcblx0XHRcdHdpZHRoOiBALndpZHRoXG5cdFx0XHRoZWlnaHQ6IDFcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cblx0XHRALm1hcmdpbiA9IG1hcmdpblxuXG5cdFx0IyBjYXJvdXNlbCB0aXRsZVxuXHRcdHRpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBsZWZ0TWFyZ2luXG5cdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0Zm9udFNpemU6IEBvcHRpb25zLnRpdGxlRm9udFNpemVcblx0XHRcdGNvbG9yOiBAb3B0aW9ucy50aXRsZUNvbG9yXG5cdFx0XHR0ZXh0QWxpZ246IEBvcHRpb25zLnRpdGxlQWxpZ25cblx0XHRcdGZvbnRXZWlnaHQ6IEBvcHRpb25zLnRpdGxlRm9udFdlaWdodFxuXHRcdFx0d2lkdGg6IEAud2lkdGggLSBsZWZ0TWFyZ2luIC0gcmlnaHRNYXJnaW5cblxuXHRcdEAudGl0bGUgPSB0aXRsZVxuXG5cdFx0dGl0bGUubWF4WSA9IHRvcE1hcmdpbiAtIEBvcHRpb25zLnRpdGxlTWFyZ2luXG5cdFx0aWYgQG9wdGlvbnMuZm9udEZhbWlseSAhPSBcIlwiIHRoZW4gdGl0bGUuZm9udEZhbWlseSA9IEBvcHRpb25zLmZvbnRGYW1pbHlcblxuXHRcdCMgY2Fyb3VzZWwgbGlua1xuXHRcdGlmIEBvcHRpb25zLmxpbmsgIT0gXCJcIlxuXHRcdFx0bGluayA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHRleHQ6IEBvcHRpb25zLmxpbmtcblx0XHRcdFx0Zm9udFNpemU6IEBvcHRpb25zLnRpdGxlRm9udFNpemVcblx0XHRcdFx0b3JpZ2luWDogMVxuXHRcdFx0XHRvcmlnaW5ZOiAxXG5cdFx0XHRcdGF1dG9TaXplOiB0cnVlXG5cdFx0XHRcdGF1dG9TaXplSGVpZ2h0OiB0cnVlXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy5saW5rQ29sb3Igb3IgQG9wdGlvbnMuY2FwdGlvbkNvbG9yIG9yIEBvcHRpb25zLnRpdGxlQ29sb3Jcblx0XHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdFx0Zm9udFdlaWdodDogQG9wdGlvbnMubGlua0ZvbnRXZWlnaHRcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLXJpZ2h0TWFyZ2luKVxuXHRcdFx0XHR5OiB0aXRsZS55XG5cdFx0XHRcdHNjYWxlOiBAb3B0aW9ucy5saW5rRm9udFNpemUvQG9wdGlvbnMudGl0bGVGb250U2l6ZVxuXG5cdFx0XHRALmxpbmsgPSBsaW5rXG5cblx0XHRcdGlmIEBvcHRpb25zLmZvbnRGYW1pbHkgIT0gXCJcIiB0aGVuIGxpbmsuZm9udEZhbWlseSA9IEBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRcdGlmIEBvcHRpb25zLmxpbmtBY3Rpb24gIT0gbm9vcFxuXHRcdFx0XHRsaW5rLm9uQ2xpY2sgPT5cblx0XHRcdFx0XHRAb3B0aW9ucy5saW5rQWN0aW9uKClcblxuXHRcdCMgaXRlbSBjcmVhdGlvblxuXHRcdGNyZWF0ZUl0ZW0gPSAoaSA9IDAsIHBhcmVudCA9IG51bGwsIGhlcm8gPSBmYWxzZSkgPT5cblx0XHRcdGlmIGhlcm8gPT0gZmFsc2UgYW5kIEBvcHRpb25zLndyYXAgPT0gdHJ1ZVxuXHRcdFx0XHRpbmRleE9mZnNldCA9IDFcblx0XHRcdFx0aXRlbVdpZHRoID0gQG9wdGlvbnMuc21hbGxJdGVtV2lkdGhcblx0XHRcdFx0aXRlbUhlaWdodCA9IEBvcHRpb25zLnNtYWxsSXRlbUhlaWdodFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpbmRleE9mZnNldCA9IDBcblx0XHRcdFx0aXRlbVdpZHRoID0gQG9wdGlvbnMuaXRlbVdpZHRoXG5cdFx0XHRcdGl0ZW1IZWlnaHQgPSBAb3B0aW9ucy5pdGVtSGVpZ2h0XG5cdFx0XHRpdGVtID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IFwiaXRlbVwiICsgKGkgKyBpbmRleE9mZnNldClcblx0XHRcdFx0d2lkdGg6IGl0ZW1XaWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGl0ZW1IZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblx0XHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdGlmIHBhcmVudCBpbnN0YW5jZW9mIFBhZ2VDb21wb25lbnRcblx0XHRcdFx0cGFyZW50LmFkZFBhZ2UoaXRlbSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0aXRlbS5wYXJlbnQgPSBwYXJlbnRcblxuXHRcdFx0IyBpdGVtIGNlbGxcblx0XHRcdGJsb2NrID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogaXRlbVxuXHRcdFx0XHRuYW1lOiBcImJsb2NrXCIgKyAoaSArIGluZGV4T2Zmc2V0KVxuXHRcdFx0XHR3aWR0aDogaXRlbVdpZHRoXG5cdFx0XHRcdGhlaWdodDogaXRlbUhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBvcHRpb25zLmJveENvbG9yXG5cdFx0XHRcdGJvcmRlclJhZGl1czogQG9wdGlvbnMuaXRlbUJvcmRlclJhZGl1c1xuXHRcdFx0XHRpbWFnZTogXCJpbWFnZXMvXCIgKyBAb3B0aW9ucy5pbWFnZVByZWZpeCArIChpICsgaW5kZXhPZmZzZXQpICsgXCIuXCIgKyBAb3B0aW9ucy5pbWFnZVN1ZmZpeFxuXHRcdFx0XHRzdHlsZTpcblx0XHRcdFx0XHRcImJhY2tncm91bmQtcG9zaXRpb25cIiA6IFwiY2VudGVyIGNlbnRlclwiXG5cdFx0XHRcdFx0XCJiYWNrZ3JvdW5kLXNpemVcIiA6IFwiY292ZXJcIlxuXG5cdFx0XHRpdGVtLmNlbGwgPSBibG9ja1xuXG5cdFx0XHQjIGFzc2lnbiBpdGVtIGFjdGlvblxuXHRcdFx0aWYgQG9wdGlvbnMuaXRlbUFjdGlvbnNbaSArIGluZGV4T2Zmc2V0XSAhPSBub29wIGFuZCBAb3B0aW9ucy5pdGVtQWN0aW9uc1tpICsgaW5kZXhPZmZzZXRdICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRpdGVtLm9uQ2xpY2sgPT5cblx0XHRcdFx0XHRyZXR1cm4gaWYgcGFyZW50LnBhcmVudC5pc0RyYWdnaW5nXG5cdFx0XHRcdFx0QG9wdGlvbnMuaXRlbUFjdGlvbnNbaSArIGluZGV4T2Zmc2V0XSgpXG5cblx0XHRcdCMgaXRlbSBpY29uXG5cdFx0XHRpZiBAb3B0aW9ucy5pY29ucyA9PSB0cnVlXG5cdFx0XHRcdGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRwYXJlbnQ6IGl0ZW1cblx0XHRcdFx0XHRuYW1lOiBcImljb25cIiArIChpICsgaW5kZXhPZmZzZXQpXG5cdFx0XHRcdFx0d2lkdGg6IEBvcHRpb25zLmljb25TaXplXG5cdFx0XHRcdFx0aGVpZ2h0OiBAb3B0aW9ucy5pY29uU2l6ZVxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQG9wdGlvbnMuaWNvbkNvbG9yIG9yIEBvcHRpb25zLmJveENvbG9yXG5cdFx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBAb3B0aW9ucy5pY29uQm9yZGVyUmFkaXVzXG5cdFx0XHRcdFx0eTogYmxvY2subWF4WSArIEBvcHRpb25zLmljb25NYXJnaW5cblx0XHRcdFx0XHRpbWFnZTogXCJpbWFnZXMvXCIgKyBAb3B0aW9ucy5pY29uUHJlZml4ICsgKGkgKyBpbmRleE9mZnNldCkgKyBcIi5cIiArIEBvcHRpb25zLmljb25TdWZmaXhcblx0XHRcdFx0XHRzdHlsZTpcblx0XHRcdFx0XHRcdFwiYmFja2dyb3VuZC1wb3NpdGlvblwiIDogXCJjZW50ZXIgY2VudGVyXCJcblx0XHRcdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvdmVyXCJcblxuXHRcdFx0XHRpdGVtLmljb24gPSBpY29uXG5cblx0XHRcdCMgaXRlbSB0ZXh0IGNvbnRhaW5lciwgZW5hYmxlcyB2ZXJ0aWNhbCBhbGlnbm1lbnRcblx0XHRcdHRleHRCbG9jayA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IGl0ZW1cblx0XHRcdFx0bmFtZTogXCJ0ZXh0QmxvY2tcIiArIChpICsgaW5kZXhPZmZzZXQpXG5cdFx0XHRcdHdpZHRoOiBpZiBAb3B0aW9ucy5pY29ucyA9PSB0cnVlIHRoZW4gaXRlbVdpZHRoIC0gQG9wdGlvbnMuaWNvblNpemUgLSBAb3B0aW9ucy5pY29uTWFyZ2luIGVsc2UgaXRlbVdpZHRoXG5cdFx0XHRcdGhlaWdodDogaXRlbS5oZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblx0XHRcdFx0eDogQGNhcHRpb25BbGlnbkhvcml6b250YWwoKGlmIEBvcHRpb25zLmljb25zID09IHRydWUgdGhlbiBAb3B0aW9ucy5pY29uU2l6ZSBlbHNlIGJsb2NrLndpZHRoKSwgaGVybylcblxuXHRcdFx0aXRlbS50ZXh0QmxvY2sgPSB0ZXh0QmxvY2tcblxuXHRcdFx0IyBpdGVtIGNhcHRpb25cblx0XHRcdGNhcHRpb24gPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdHBhcmVudDogdGV4dEJsb2NrXG5cdFx0XHRcdG5hbWU6IFwiY2FwdGlvblwiICsgKGkgKyBpbmRleE9mZnNldClcblx0XHRcdFx0d2lkdGg6IHRleHRCbG9jay53aWR0aFxuXHRcdFx0XHRjb2xvcjogQG9wdGlvbnMuY2FwdGlvbkNvbG9yIG9yIEBvcHRpb25zLnRpdGxlQ29sb3Jcblx0XHRcdFx0dGV4dDogQG9wdGlvbnMuY2FwdGlvbnNbKGkgKyBpbmRleE9mZnNldCldIG9yIFwiXCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdFx0XHRmb250V2VpZ2h0OiBAb3B0aW9ucy5jYXB0aW9uRm9udFdlaWdodFxuXHRcdFx0XHRmb250U2l6ZTogQG9wdGlvbnMuY2FwdGlvbkZvbnRTaXplXG5cblx0XHRcdGl0ZW0uY2FwdGlvbiA9IGNhcHRpb25cblxuXHRcdFx0aWYgY2FwdGlvbi5oZWlnaHQgPiBAb3B0aW9ucy5jYXB0aW9uTWF4SGVpZ2h0XG5cdFx0XHRcdGNhcHRpb24uaGVpZ2h0ID0gQG9wdGlvbnMuY2FwdGlvbk1heEhlaWdodFxuXHRcdFx0XHRjYXB0aW9uLnRydW5jYXRlID0gdHJ1ZVxuXG5cdFx0XHRpZiBAb3B0aW9ucy5mb250RmFtaWx5ICE9IFwiXCIgdGhlbiBjYXB0aW9uLmZvbnRGYW1pbHkgPSBAb3B0aW9ucy5mb250RmFtaWx5XG5cblx0XHRcdCMgaXRlbSBzdWJjYXB0aW9uXG5cdFx0XHRpZiBAb3B0aW9ucy5zdWJjYXB0aW9ucyAhPSBbXVxuXHRcdFx0XHRzdWJjYXB0aW9uID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRcdHBhcmVudDogdGV4dEJsb2NrXG5cdFx0XHRcdFx0bmFtZTogXCJzdWJjYXB0aW9uXCIgKyAoaSArIGluZGV4T2Zmc2V0KVxuXHRcdFx0XHRcdHdpZHRoOiB0ZXh0QmxvY2sud2lkdGhcblx0XHRcdFx0XHRjb2xvcjogQG9wdGlvbnMuc3ViY2FwdGlvbkNvbG9yIG9yIEBvcHRpb25zLmNhcHRpb25Db2xvciBvciBAb3B0aW9ucy50aXRsZUNvbG9yXG5cdFx0XHRcdFx0dGV4dDogQG9wdGlvbnMuc3ViY2FwdGlvbnNbKGkgKyBpbmRleE9mZnNldCldIG9yIFwiXCJcblx0XHRcdFx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cdFx0XHRcdFx0Zm9udFdlaWdodDogQG9wdGlvbnMuc3ViY2FwdGlvbkZvbnRXZWlnaHRcblx0XHRcdFx0XHRmb250U2l6ZTogQG9wdGlvbnMuc3ViY2FwdGlvbkZvbnRTaXplXG5cdFx0XHRcdFx0bGV0dGVyU3BhY2luZzogLTAuNlxuXHRcdFx0XHRcdHk6IGNhcHRpb24ubWF4WSArIEBvcHRpb25zLnN1YmNhcHRpb25NYXJnaW5cblxuXHRcdFx0XHRpdGVtLnN1YmNhcHRpb24gPSBzdWJjYXB0aW9uXG5cblx0XHRcdFx0aWYgc3ViY2FwdGlvbi5oZWlnaHQgPiBAb3B0aW9ucy5zdWJjYXB0aW9uTWF4SGVpZ2h0XG5cdFx0XHRcdFx0c3ViY2FwdGlvbi5oZWlnaHQgPSBAb3B0aW9ucy5zdWJjYXB0aW9uTWF4SGVpZ2h0XG5cdFx0XHRcdFx0c3ViY2FwdGlvbi50cnVuY2F0ZSA9IHRydWVcblxuXHRcdFx0XHRpZiBAb3B0aW9ucy5mb250RmFtaWx5ICE9IFwiXCIgdGhlbiBzdWJjYXB0aW9uLmZvbnRGYW1pbHkgPSBAb3B0aW9ucy5mb250RmFtaWx5XG5cblx0XHRcdCMgcm91bmQgaXRlbSBibG9jayBpZiBzcGVjaWZpZWRcblx0XHRcdGlmIEBvcHRpb25zLnJvdW5kZWQgPT0gdHJ1ZVxuXHRcdFx0XHRibG9jay5ib3JkZXJSYWRpdXMgPSBNYXRoLm1heChAb3B0aW9ucy5pdGVtV2lkdGgsIEBvcHRpb25zLml0ZW1IZWlnaHQpLzJcblxuXHRcdFx0IyB0ZXh0IGFsaWdubWVudFxuXHRcdFx0Y2FwdGlvbi50ZXh0QWxpZ24gPSBAb3B0aW9ucy5jYXB0aW9uQWxpZ25cblx0XHRcdHN1YmNhcHRpb24/LnRleHRBbGlnbiA9IEBvcHRpb25zLmNhcHRpb25BbGlnblxuXG5cdFx0XHQjIGFkZCB0byBhcnJheVxuXHRcdFx0QC5pdGVtcy5wdXNoKGl0ZW0pXG5cblx0XHRcdCMgc2l6ZSB0ZXh0IGJsb2NrIGhlaWdodCB0byBtYXRjaCBjb250ZW50XG5cdFx0XHR0ZXh0QmxvY2suaGVpZ2h0ID0gdGV4dEJsb2NrLmNvbnRlbnRGcmFtZSgpLmhlaWdodFxuXHRcdFx0dGV4dEJsb2NrLnkgPSBAY2FwdGlvbkFsaWduVmVydGljYWwoYmxvY2suaGVpZ2h0LCBoZXJvKVxuXG5cdFx0XHQjIHNpemUgaXRlbSBoZWlnaHQgdG8gbWF0Y2ggY29udGVudFxuXHRcdFx0aXRlbS5oZWlnaHQgPSBpdGVtLmNvbnRlbnRGcmFtZSgpLmhlaWdodFxuXHRcdFx0aXRlbS53aWR0aCA9IGl0ZW0uY29udGVudEZyYW1lKCkud2lkdGhcblxuXHRcdFx0IyBjYXJvdXNlbCBtYXJpZ25zIGFyZSBhcHBsaWVkIGFmdGVyIHBhZ2UgaXMgaW4gcGxhY2Vcblx0XHRcdGlmIEAuaXRlbXMuaW5kZXhPZihpdGVtKSA+IG9mZnNldFxuXHRcdFx0XHRpdGVtLnggPSBpdGVtLnggKyBAb3B0aW9ucy5pdGVtTWFyZ2luXG5cblx0XHQjIGNyZWF0ZSBoZXJvIGNlbGxcblx0XHRpZiBAb3B0aW9ucy53cmFwID09IHRydWVcblx0XHRcdGhlcm9JdGVtQ29udGFpbmVyID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRuYW1lOiBcImhlcm9JdGVtQ29udGFpbmVyXCJcblx0XHRcdFx0eTogdG9wTWFyZ2luXG5cdFx0XHRcdHg6IGlmIEBvcHRpb25zLmNlbnRlcmhlcm9JdGVtID09IHRydWUgdGhlbiBBbGlnbi5jZW50ZXIgZWxzZSBsZWZ0TWFyZ2luXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRjcmVhdGVJdGVtKDAsIGhlcm9JdGVtQ29udGFpbmVyLCB0cnVlKVxuXHRcdFx0aGVyb0l0ZW1Db250YWluZXIuaGVpZ2h0ID0gaGVyb0l0ZW1Db250YWluZXIuY29udGVudEZyYW1lKCkuaGVpZ2h0XG5cdFx0XHRoZXJvSXRlbUNvbnRhaW5lci53aWR0aCA9IGhlcm9JdGVtQ29udGFpbmVyLmNvbnRlbnRGcmFtZSgpLndpZHRoXG5cblx0XHRcdEAuaGVyb0l0ZW0gPSBoZXJvSXRlbUNvbnRhaW5lci5jaGlsZHJlblswXVxuXHRcdFx0QC5oZXJvSXRlbS5uYW1lID0gXCJoZXJvSXRlbVwiXG5cblx0XHRcdCMgaGVybyB0ZXh0IGFsaWdubWVudFxuXHRcdFx0QC5oZXJvSXRlbS5jYXB0aW9uLnRleHRBbGlnbiA9IEBvcHRpb25zLmhlcm9DYXB0aW9uQWxpZ25cblx0XHRcdEAuaGVyb0l0ZW0uc3ViY2FwdGlvbj8udGV4dEFsaWduID0gQG9wdGlvbnMuaGVyb0NhcHRpb25BbGlnblxuXG5cdFx0IyBjcmVhdGUgdGhlIGNhcm91c2VsXG5cdFx0cm93ID0gbmV3IFBhZ2VDb21wb25lbnRcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJyb3dcIlxuXHRcdFx0eTogaWYgQG9wdGlvbnMud3JhcCA9PSB0cnVlIHRoZW4gaGVyb0l0ZW1Db250YWluZXIubWF4WSArIEBvcHRpb25zLml0ZW1NYXJnaW4gZWxzZSB0b3BNYXJnaW5cblx0XHRcdHNjcm9sbFZlcnRpY2FsOiBmYWxzZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogdHJ1ZVxuXHRcdFx0dmVsb2NpdHlUaHJlc2hvbGQ6IDAuMVxuXHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdG9yaWdpblg6IDBcblx0XHRcdGNvbnRlbnRJbnNldDpcblx0XHRcdFx0dG9wOiAwXG5cdFx0XHRcdHJpZ2h0OiByaWdodE1hcmdpblxuXHRcdFx0XHRib3R0b206IDBcblx0XHRcdFx0bGVmdDogbGVmdE1hcmdpblxuXG5cdFx0QC5yb3cgPSByb3dcblxuXHRcdCMgYWNjb3VudCBmb3IgYSBcInNob3J0XCIgY2Fyb3VzZWxcblx0XHRpZiBAb3B0aW9ucy5pdGVtQ291bnQgPCAyXG5cdFx0XHRyb3cuc2Nyb2xsSG9yaXpvbnRhbCA9IGZhbHNlXG5cdFx0XHRsaW5rPy5kZXN0cm95KClcblxuXHRcdCMgYWN0dWFsbHkgcG9wdWxhdGUgdGhlIGNhcm91c2VsIHJvdyB3aXRoIGl0cyBpdGVtc1xuXHRcdGZvciBpIGluIFswLi4uQG9wdGlvbnMuaXRlbUNvdW50IC0gb2Zmc2V0XVxuXHRcdFx0Y3JlYXRlSXRlbShpLCByb3csIGZhbHNlKVxuXG5cdFx0IyBwcmV2ZW50IG92ZXJzY3JvbGxcblx0XHRyb3cub25Td2lwZUxlZnQgPT5cblx0XHRcdGlmIEBvcHRpb25zLmZvcmNlU2Nyb2xsaW5nICE9IHRydWUgYW5kIEBjaGVja0lmTmVlZHNTY3JvbGxpbmcocm93KVxuXHRcdFx0XHRtYXhQYWdlID0gQG9wdGlvbnMuaXRlbUNvdW50IC0gTWF0aC5mbG9vcihALndpZHRoIC8gKEBvcHRpb25zLml0ZW1XaWR0aCArIEBvcHRpb25zLml0ZW1NYXJnaW4pKSAtIG9mZnNldFxuXHRcdFx0XHRpZiByb3cuY29udGVudC5tYXhYIDwgQC5tYXhYXG5cdFx0XHRcdFx0cm93LnNuYXBUb1BhZ2UoQC5pdGVtc1ttYXhQYWdlXSlcblxuXHRcdCMgYWRqdXN0IGNhcm91c2VsIHRvIG1hdGNoIGNvbnRlbnRcblx0XHRyb3cud2lkdGggPSByb3cuY29udGVudC5jaGlsZHJlblswXT8ud2lkdGhcblx0XHRyb3cuY29udGVudC53aWR0aCA9IHJvdy5jb250ZW50LmNvbnRlbnRGcmFtZSgpLndpZHRoXG5cdFx0cm93LmNvbnRlbnQuaGVpZ2h0ID0gcm93LmNvbnRlbnQuY29udGVudEZyYW1lKCkuaGVpZ2h0XG5cdFx0cm93LmhlaWdodCA9IHJvdy5jb250ZW50RnJhbWUoKS5oZWlnaHRcblx0XHRyb3cuY29udGVudC5jbGlwID0gZmFsc2Vcblx0XHRyb3cuc2Nyb2xsSG9yaXpvbnRhbCA9IEBjaGVja0lmTmVlZHNTY3JvbGxpbmcocm93KVxuXHRcdEAuaGVpZ2h0ID0gQC5jb250ZW50RnJhbWUoKS5oZWlnaHQgKyBib3R0b21NYXJnaW5cblxuXHRjaGVja0lmTmVlZHNTY3JvbGxpbmc6IChsYXllciA9IG51bGwpIC0+XG5cdFx0aWYgQG9wdGlvbnMuZm9yY2VTY3JvbGxpbmcgPT0gdHJ1ZVxuXHRcdFx0bmVlZHNTY3JvbGxpbmcgPSB0cnVlXG5cdFx0ZWxzZSBpZiBsYXllci5jb250ZW50Py5jb250ZW50RnJhbWUoKS53aWR0aCA+IEAud2lkdGhcblx0XHRcdG5lZWRzU2Nyb2xsaW5nID0gdHJ1ZVxuXHRcdGVsc2Vcblx0XHRcdG5lZWRzU2Nyb2xsaW5nID0gZmFsc2Vcblx0XHRyZXR1cm4gbmVlZHNTY3JvbGxpbmdcblxuXHRjYXB0aW9uQWxpZ25WZXJ0aWNhbDogKGl0ZW1IZWlnaHQgPSAwLCBoZXJvID0gZmFsc2UpIC0+XG5cdFx0YWxpZ24gPSBpdGVtSGVpZ2h0ICsgQG9wdGlvbnMuY2FwdGlvbk1hcmdpblxuXHRcdGlmIEBvcHRpb25zLmljb25zID09IHRydWVcblx0XHRcdGFsaWduID0gaXRlbUhlaWdodCArIEBvcHRpb25zLmljb25NYXJnaW5cblx0XHRlbHNlIGlmIGhlcm8gPT0gdHJ1ZVxuXHRcdFx0aWYgQG9wdGlvbnMuc2lkZUhlcm9DYXB0aW9uID09IHRydWVcblx0XHRcdFx0aWYgQG9wdGlvbnMudG9wQWxpZ25IZXJvQ2FwdGlvbiA9PSB0cnVlXG5cdFx0XHRcdFx0YWxpZ24gPSBBbGlnbi50b3Bcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGFsaWduID0gQWxpZ24uY2VudGVyXG5cdFx0ZWxzZSBpZiBAb3B0aW9ucy5zaWRlQ2FwdGlvbnMgPT0gdHJ1ZVxuXHRcdFx0aWYgQG9wdGlvbnMudG9wQWxpZ25DYXB0aW9ucyA9PSB0cnVlXG5cdFx0XHRcdGFsaWduID0gQWxpZ24udG9wXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGFsaWduID0gQWxpZ24uY2VudGVyXG5cdFx0cmV0dXJuIGFsaWduXG5cblx0Y2FwdGlvbkFsaWduSG9yaXpvbnRhbDogKGl0ZW1XaWR0aCA9IDAsIGhlcm8gPSBmYWxzZSkgLT5cblx0XHRhbGlnbiA9IEFsaWduLmxlZnRcblx0XHRpZiBAb3B0aW9ucy5pY29ucyA9PSB0cnVlXG5cdFx0XHRhbGlnbiA9IGl0ZW1XaWR0aCArIEBvcHRpb25zLmljb25NYXJnaW5cblx0XHRlbHNlIGlmIGhlcm8gPT0gdHJ1ZVxuXHRcdFx0aWYgQG9wdGlvbnMuc2lkZUhlcm9DYXB0aW9uID09IHRydWVcblx0XHRcdFx0YWxpZ24gPSBpdGVtV2lkdGggKyBAb3B0aW9ucy5jYXB0aW9uTWFyZ2luXG5cdFx0ZWxzZSBpZiBAb3B0aW9ucy5zaWRlQ2FwdGlvbnMgPT0gdHJ1ZVxuXHRcdFx0YWxpZ24gPSBpdGVtV2lkdGggKyBAb3B0aW9ucy5jYXB0aW9uTWFyZ2luXG5cdFx0ZWxzZSBpZiBAb3B0aW9ucy5zaWRlQ2FwdGlvbnMgPT0gdHJ1ZVxuXHRcdFx0YWxpZ24gPSBpdGVtV2lkdGggKyBAb3B0aW9ucy5jYXB0aW9uTWFyZ2luXG5cdFx0cmV0dXJuIGFsaWduXG5tb2R1bGUuZXhwb3J0cyA9IENhcm91c2VsQ29tcG9uZW50XG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTs7QURBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUEsb0NBQUE7RUFBQTs7O0FBZ0lBLFFBQUEsR0FDQztFQUFBLFNBQUEsRUFBVyxDQUFYO0VBRUEsS0FBQSxFQUFPLEtBRlA7RUFHQSxPQUFBLEVBQVMsS0FIVDtFQUlBLElBQUEsRUFBTSxLQUpOO0VBS0EsWUFBQSxFQUFjLEtBTGQ7RUFNQSxZQUFBLEVBQWMsTUFOZDtFQU9BLFVBQUEsRUFBWSxNQVBaO0VBUUEsb0JBQUEsRUFBc0IsS0FSdEI7RUFTQSxjQUFBLEVBQWdCLEtBVGhCO0VBVUEsZ0JBQUEsRUFBa0IsTUFWbEI7RUFXQSxlQUFBLEVBQWlCLEtBWGpCO0VBWUEsbUJBQUEsRUFBcUIsSUFackI7RUFhQSxLQUFBLEVBQU8sS0FiUDtFQWNBLElBQUEsRUFBTSxJQWROO0VBZUEsY0FBQSxFQUFnQixLQWZoQjtFQWdCQSxPQUFBLEVBQVMsQ0FBQyxFQUFELEVBQUksQ0FBSixFQUFNLENBQU4sRUFBUSxDQUFSLENBaEJUO0VBaUJBLFVBQUEsRUFBWSxFQWpCWjtFQWtCQSxnQkFBQSxFQUFrQixFQWxCbEI7RUFtQkEsU0FBQSxFQUFXLEdBbkJYO0VBb0JBLFVBQUEsRUFBWSxHQXBCWjtFQXFCQSxjQUFBLEVBQWdCLEVBckJoQjtFQXNCQSxlQUFBLEVBQWlCLEVBdEJqQjtFQXVCQSxhQUFBLEVBQWUsRUF2QmY7RUF3QkEsZUFBQSxFQUFpQixHQXhCakI7RUF5QkEsV0FBQSxFQUFhLENBekJiO0VBMEJBLFlBQUEsRUFBYyxFQTFCZDtFQTJCQSxjQUFBLEVBQWdCLEdBM0Jo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
