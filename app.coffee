Screen.backgroundColor = "#FFF"
n = Screen.width/750
CarouselComponent = require "carouselcomponent/CarouselComponent"
primaryColor = "#0DBCE8"

# Springs缓动预定义
iOSAppLaunch = "spring(320,40,0)"
iOSKeyboard = "spring(280,33,10)"
iOSSlideView = "spring(220,28,0)"
iOSRetreat = "spring(220,28,0)"
iOSActionSheet = "spring(280,33,10)"

materialAppLaunch = "spring(260,32,16)"
materialKeyboard = "spring(220,35,25)"
materialSlideView = "spring(220,35,25)"
materialRetreat = "spring(160,30,10)"
materialActionSheet = "spring(250,37,20)"

floaty = "spring(160,40,10)"
hello = "spring(400,22,20)"
retreat = "spring(160,30,10)"
pop = "spring(280,13,10)"
bigPop = "spring(370,8,0)"
dramatic = "spring(120,140,0)"
slow = "spring(100,50,0)"
quick = "spring(400,23,6)"
loose = "spring(240,18,28)"

#下拉加载

frameStep = 38
frameWidth = 260
frameRate = 3

topGdt = new Layer
	width: Screen.width
	height: 360*n
	image: "images/gradiantbg.png"
	background:null
	z: 3
	opacity: 0


navbar = new Layer
	width: Screen.width
	height: 164*n
	image: "images/Navigation Bar1.png"
	opacity: 1
	z: 2
	backgroundColor: "null"

view = new Layer
	width: 260*n
	height: 180*n
	x: Align.center
	y: 140*n
	backgroundColor: null
	clip: true
	scale: 0.8
	opacity: 0
	z: 1
	
loadcontent = new Layer
	parent: view
	x: 0
	width: 9880*n
	height: 180*n
	image: "images/startsprite.png"
	
pullAnimate = (s) ->
	loadcontent.states =
		on:
			x:-frameWidth*n*s		
	loadcontent.animate "on",time:0


homeScroll = new ScrollComponent
	size: Screen.size
	z: 1
# 	y: -80*n
	
homeScroll.content.draggable.horizontal = false
homeScroll.content.backgroundColor = ""
homeScroll.contentInset = 
# 	bottom: 300*n
homeScroll.content.draggable.bounceOptions =
	friction: 60,
	tension: 1200,
	tolerance: 0.00001
	
loadtxt = new TextLayer
	text: "下拉加载"
	fontSize: 22*n
	x: Align.center
	y: view.y+view.height-24*n
	opacity: 0
# 	text：“下拉加载”	
view.placeBehind(homeScroll)
loadtxt.placeBehind(homeScroll)
topGdt.placeBefore(homeScroll)	
sound = new Audio("sounds/pop03.wav")
	



navbarWhite = new Layer
	width: Screen.width
	height: 164*n
	image: "images/Navigation Bar.png"
	opacity: 0
	z: 2
	backgroundColor: "#FFF"


if Screen.height>=812	
	bottom = new Layer
		width: Screen.width
		height:166*n
		y: Align.bottom()
		image: "images/bottom.png"
		shadowY: -4
		shadowColor: "rgba(0,0,0,0.03057065217391304)"
		shadowBlur: 8
		z: 3
else
	homeScroll.y = -44*n
	navbar.y = -40*n
	navbarWhite.y = -40*n
	bottom = new Layer
		width: Screen.width
		height:166*n
		y: Align.bottom(64*n)
		image: "images/bottom.png"
		shadowY: -4
		shadowColor: "rgba(0,0,0,0.03057065217391304)"
		shadowBlur: 8
		z: 3	

# 头部banner位
banner = new PageComponent
	parent: homeScroll.content
	width: Screen.width
	x: Align.center
	y: 0*n
	height: 360*n
	z: 2
	backgroundColor: "#f5f5f5"
bannerpicArr = ["images/banner/banner01.png","images/banner/banner02.png"]
banner.content.draggable.vertical = false
banner.content.draggable.overdrag = false
for number in [0...bannerpicArr.length]
	bannerContent = new Layer
		parent: banner.content
		width: banner.width
		height: banner.height
		x: banner.width*number
		image: bannerpicArr[number]
		
#指示器
allIndicators = []
for number in [0...bannerpicArr.length]
	indicator = new Layer
		parent:homeScroll.content
		backgroundColor: "#FFF"
		width:12*n
		height:6*n
		x: (banner.width/36)*number+banner.width/2-24*n
		y: banner.y+banner.height-20*n
		z: 2
		opacity: 0.3
	indicator.states.add(active:{opacity:1})
	indicator.states.animationOptions = time:0.25
	allIndicators.push(indicator)	

allIndicators[0].opacity = 1
# allIndicators[0].scaleX = 1.5		
banner.on "change:currentPage", ->
	current = banner.horizontalPageIndex(banner.currentPage)
	indicator.states.switch("default") for indicator in allIndicators
	allIndicators[current].states.switch("active")			


# 十字交互体验优化
banner.content.on Events.DragMove, ->
	if Math.abs(banner.content.draggable.offset.x)>40*n
# 	if localHotItem.row.content.draggable.offset < 56*n
		homeScroll.content.draggable.enabled = false
	else
		homeScroll.content.draggable.enabled = true	

banner.content.on Events.DragEnd, ->
	homeScroll.content.draggable.enabled = true

#宫格
grid = new Layer
	parent: homeScroll.content
	width: Screen.width-16*n
	x: Align.center
	y: banner.y+banner.height+8*n
	height: 534*n
	image: "images/grid.png"

#图标导航
iconsNav = new Layer
	parent: homeScroll.content
	width: Screen.width-32*n
	height: 228*n
	x: Align.center
	y: grid.y+grid.height+16*n
	image: "images/iconsnav.png"
	borderColor: "#EEE"
# 	borderWidth: 1
# 	shadowY: 4
# 	shadowColor: "rgba(0,0,0,0.03057065217391304)"
# 	shadowBlur: 8
scrollTabNameData = ["玩当地","去远方","找低价","去比价","酒店旗舰","猜你喜欢"]	


CardsArr = []
cardView = new Layer
# 	parent: homeScroll.content
	width: Screen.width
	height:Screen.height-340*n
	y: iconsNav.y+iconsNav.height+10*n
	backgroundColor: null
	
for i in [0...scrollTabNameData.length]
	card = new Layer
		parent: homeScroll.content
		width: Screen.width
		height: 100*n
		x: Align.center
		y: iconsNav.y+iconsNav.height+40*n+650*n*i
		backgroundColor: null
	cardTitle = new TextLayer
		parent: card
		x: 32*n
		y: 0
		fontWeight: 900
		fontSize: 40*n
		text:scrollTabNameData[i]
		color: "#000"
		backgroundColor: null
			
	CardsArr.push(card)
# 	print CardsArr[i]	
	
CardsArr[CardsArr.length-1].height = 2200*n	


#480. 836. 356
# print 836-480			
homeScroll.on Events.Move, ->
	scrolltoY(homeScroll.scrollY)
homeScroll.on Events.Move, ->
	scrolltoY(homeScroll.scrollY)
	
scrolltoY = (y) ->
	navbarWhite.opacity = Utils.modulate(y, [0, 164*n], [0,1], true)
	navbar.opacity = Utils.modulate(y, [0, -20*n], [1,0], true)
	topGdt.opacity = Utils.modulate(y, [0, -80*n], [0,0.5], true)
	loadtxt.opacity = Utils.modulate(y, [20*n, -40*n], [0,1], true)
	view.y = Utils.modulate(y, [0, -10*n], [120*n,-30*n], true)
	view.opacity = Utils.modulate(y, [0, -20*n], [0,1], true)
	loadtxt.y = Utils.modulate(y, [0, -80*n], [view.y+view.height-24*n,view.y+view.height-32*n], true)
	s = Math.round(homeScroll.content.y/frameRate)

		
# 	print homeScroll.content.y
	
	beyondNum = frameStep*frameRate
	loadtxt.text = "下拉加载"
	if s < 0
		s = 0
		loadcontent.image = "images/startsprite.png"
	
# 	if s == 30
# 		sound.play()
		
	if s >=  frameStep-1
# 		print s
		loadtxt.text = "加载中..."
		s = frameStep-1
		loadcontent.image = "images/sprite.gif"
	else
		loadcontent.image = "images/startsprite.png"
	
	pullAnimate(s)	


if Screen.height>=812
	frameRate = 3
	scrolltoY = (y) ->
		navbarWhite.opacity = Utils.modulate(y, [0, 164*n], [0,1], true)
		navbar.opacity = Utils.modulate(y, [0, -20*n], [1,0], true)
		topGdt.opacity = Utils.modulate(y, [0, -80*n], [0,0.5], true)
		loadtxt.opacity = Utils.modulate(y, [20*n, -40*n], [0,1], true)
		view.y = Utils.modulate(y, [0, -10*n], [120*n,30*n], true)
		view.opacity = Utils.modulate(y, [0, -20*n], [0,1], true)
		loadtxt.y = Utils.modulate(y, [0, -80*n], [view.y+view.height-24*n,view.y+view.height-32*n], true)
		s = Math.round(homeScroll.content.y/frameRate)
		beyondNum = frameStep*frameRate
		loadtxt.text = "下拉加载"
		if s < 0
			s = 0
			loadcontent.image = "images/startsprite.png"
	
		if s >=  frameStep-1
	# 		print s
			loadtxt.text = "加载中..."
			s = frameStep-1
			loadcontent.image = "images/sprite.gif"
		else
			loadcontent.image = "images/startsprite.png"
		
		pullAnimate(s)
		

# 玩当地
blockScroll = new ScrollComponent
	parent: CardsArr[0]
	width: Screen.width+20*n
	height: 180*n
	z: 1
	x: Align.left(-16*n)
	y: 30*n
	
blockScroll.content.draggable.vertical = false
blockScroll.content.width = 800*n
blockScroll.contentInset = 
	right = 44*n
blockScroll.content.image = "images/navblock.png"
# 当地热门
# localHotItem = new CarouselComponent
# 	parent: CardsArr[0]
# 	x: 0
# 	y: blockScroll.y+blockScroll.height-40*n
# 	backgroundColor:"#FFF"
# 	title: ""
# 	titleFontSize: 36*n
# 	titleFontWeight: 500
# 	titleColor: "rgba(63,69,72,1)"
# 	itemCount: 2
# 	itemMargin: 10*n
# 	itemWidth: 566*n
# 	itemHeight: 566*n
# 	itemBorderRadius: 0
# 	imagePrefix: "images/items"
# 	margins: [72*n, 40*n, 40*n, 32*n]
# 	titleMargin: 32*n
# 
# 
# 
# localHotItem.row.width = 750*n
# localHotItem.row.height = 576*n
# localHotItem.row.content.children[0].height = 576*n
# localHotItem.row.content.children[1].height = 576*n
# localHotItem.row.content.children[0].borderColor = "rgba(231,233,241,1)"	
# # localHotItem.row.content.children[0].borderWidth = 1*n
# localHotItem.row.content.children[0].shadowColor = "rgba(0,0,0,0.03057065217391304)"
# localHotItem.row.content.children[0].shadowY = 16*n
# localHotItem.row.content.children[0].shadowBlur = 32*n
# 
# localHotItem.row.content.children[1].borderColor = "rgba(231,233,241,1)"	
# # localHotItem.row.content.children[1].borderWidth = 1*n
# localHotItem.row.content.children[1].shadowColor = "rgba(0,0,0,0.03057065217391304)"
# localHotItem.row.content.children[1].shadowY = 16*n
# localHotItem.row.content.children[1].shadowBlur = 32*n
# localHotItem.row.content.children[0].children[1].destroy()
# localHotItem.row.content.children[1].children[1].destroy()
# # localHotItem.destroy()
# # 十字交互体验优化
# localHotItem.row.content.on Events.DragMove, ->
# 	if Math.abs(localHotItem.row.content.draggable.offset.x)>40*n
# # 	if localHotItem.row.content.draggable.offset < 56*n
# 		homeScroll.content.draggable.enabled = false
# 	else
# 		homeScroll.content.draggable.enabled = true	
# # 
# localHotItem.row.content.on Events.DragEnd, ->
# 	homeScroll.content.draggable.enabled = true

# CardsArr[1].y = localHotItem.height+localHotItem.y+920*n


hotDestarrow = new Layer
	parent: CardsArr[1]
	x: 160*n
	y: 8*n
	width: 36*n
	height: 36*n
	background:null
	image: "images/arrow.svg"

pageCount = 48
gutter = -5*n

# Create PageComponent
pageScroller = new PageComponent
	parent: CardsArr[1]
	x: 32*n
	y: 90*n
	point: Align.center
	width: 222*n
	height: 400*n
	scrollVertical: false
	clip: false

hotdestTxt = new Layer
	parent: homeScroll.content
	width: Screen.width-64*n
	x: 40*n
	y: CardsArr[1].y+424*n
	height: 132*n
	image: "images/hotdesttxt01.png"

hotDestPics = ["images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png","images/hotdest01.png","images/hotdest02.png","images/hotdest03.png"]

hotDestTxtArr = ["images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png","images/hotdesttxt01.png","images/hotdesttxt02.png","images/hotdesttxt03.png"]		
pages = []
# Loop to create pages
for index in [0...pageCount]
	page = new Layer
		width: pageScroller.width
		height: 294*n
		x: (222*n + gutter) * index+24*n
		backgroundColor: "#f5f5f5"
		originX: 0.9
# 		hueRotate: index * 20
		parent: pageScroller.content
		image: hotDestPics[index]
# 		borderColor: "rgba(231,233,241,1)"
		borderWidth: 0.5
		shadowColor: "rgba(0,0,0,0.12)"
		shadowX: 0
		shadowY: 8
		shadowBlur: 8
		shadowSpread: 0

	pages.push(page)
	pages[index].scale = 0.9
	
	page.states =
		on:
			scale : 1.16
			options: 
				curve: "spring(160,30,10)"
		off:	
			scale : 0.9
			options: 
				curve: "spring(160,30,10)"
pages[0].scale = 1.1
pages[0].z = 2
# pages[0].shadowBlur = 32*n
# pages[0].shadowY = 8*n
# pages[0].shadowColor = "rgba(0,0,0,0.2)"
# pages[0].style =
# 	"padding-right": "32px"

# 十字交互体验优化
pageScroller.content.on Events.DragMove, ->
	if Math.abs(pageScroller.content.draggable.offset.x)>40*n
		homeScroll.content.draggable.enabled = false
	else
		homeScroll.content.draggable.enabled = true	

pageScroller.content.on Events.DragEnd, ->
	homeScroll.content.draggable.enabled = true


pageScroller.animationOptions =
	curve: Bezier.ease
	time: 0.25
pageScroller.on "change:currentPage", ->
	pageScroller.x = 64*n
	current = pageScroller.currentPage.index
	for index in [0...pageCount]
		pages[index].animate "off"
		pages[index].z = 1
	for index in [0...current]
		pages[index].opacity = 0.2
# 		pages[index].z = 1
	for index in [current...pageCount]
		pages[index].opacity = 1
	pages[current].animate "on"
	pages[current].z = 2
	hotdestTxt.image = hotDestTxtArr[current]
	
CardsArr[2].y = CardsArr[1].y+600*n	

lowPic = new Layer
	y: 72*n
	x: 32*n
	parent: CardsArr[2]
	width: Screen.width-64*n
	height: 702*n
	image: "images/lowprice.png"
	
CardsArr[3].y = CardsArr[2].y+860*n	
priceInqPic = new Layer
	y: 72*n
	x: 0
	parent: CardsArr[3]
	width: Screen.width
	height: 390*n
	image: "images/priceinq.png"
# 	borderWidth: 0.12
# 	shadowColor: "rgba(0,0,0,0.02)"
# 	shadowX: 0
# 	shadowY: 8
# 	shadowBlur: 8
# 	shadowSpread: 0	

CardsArr[4].y = CardsArr[3].y+520*n


# 酒店旗舰店

# hotDest.addArrow()
innerPicArrow = new Layer
	parent: CardsArr[4]
	x: 200*n
	y: 8*n
	width: 36*n
	height: 36*n
	background:null
	image: "images/arrow.svg"

innerCount = 3
innergutter = 10*n

# Create PageComponent
innerScroller = new ScrollComponent
	parent: CardsArr[4]
	x: 40*n
	y: 80*n
	point: Align.center
	width: 216*n
	height: 286*n
	scrollVertical: false
	clip: false
	z: 2
	
innerScroller.contentInset =
	top: 0
# 	right: -518*n
	bottom: 0
	left: 0

innerScroller.content.draggable.bounceOptions =
	friction: 36,
	tension: 400,
	tolerance: 0.00001

innerPics = ["images/inner01.png","images/inner02.png","images/inner03.png"]
innerScroller.content.draggable = false

changeBtn = new Layer
	parent: CardsArr[4]
	y: 8*n
	x: 570*n
	width: 28*n
	height: 28*n
	image: "images/flesh.svg"

changeAnimate = new Animation changeBtn,
	rotation:360
	options:
		curve:"spring(400,40,0)"
		time:0.2
		
changeBtnTxt = new TextLayer
	parent: CardsArr[4]
	y: 8*n
	x: 612*n
	text: "换一批"
	fontSize: 24*n	
	
# print RandoNumber
innerPages = []
# Loop to create pages
for index in [0...innerCount]
	innerpage = new Layer
		width: innerScroller.width
		height: 286*n
		x: (216*n + innergutter) * index
		backgroundColor: "#f5f5f5"
		originX: 0.9
# 		hueRotate: index * 20
		parent: innerScroller.content
		image: innerPics[index]
		borderColor: "rgba(231,233,241,1)"
		borderWidth: 0.12
		shadowColor: "rgba(0,0,0,0.02)"
		shadowX: 0
		shadowY: 8
		shadowBlur: 8
		shadowSpread: 0
	innerPages.push(innerpage)	



randomSort = (a, b) ->
	return Math.random() > 0.5 ? -1 : 1
arr =  ["images/inner01.png","images/inner02.png","images/inner03.png"]

changeBtnTxt.onTap (event, layer) ->
# 	print arr.sort(randomSort)
	changeAnimate.reset()
	changeAnimate.start()
	for index in [0...innerCount]
		innerPages[index].image = arr.sort(randomSort)[index]
	
changeBtn.onTap (event, layer) ->
# 	print arr.sort(randomSort)
	changeAnimate.reset()
	changeAnimate.start()
	
	for index in [0...innerCount]
		innerPages[index].image = arr.sort(randomSort)[index]

CardsArr[5].y = CardsArr[4].y+440*n

# 猜你喜欢
guessPicNum = 8



guessPicArr = ["images/guess01.png","images/guess02.png","images/guess03.png","images/guess01.png","images/guess02.png","images/guess03.png","images/guess01.png","images/guess02.png","images/guess03.png"]	
for i in [0..guessPicNum]
	guessPic = new Layer
		parent: CardsArr[5]
		width: Screen.width-64*n
		height: 219*n
		x:32*n
		y: 68*n+219*n*i
		image: guessPicArr[i]