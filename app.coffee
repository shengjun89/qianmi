Screen.backgroundColor = "#FFF"
n = Screen.width/750
sound = new Audio("sounds/pop03.wav")
frameStep = 38
frameWidth = 260
frameRate = 1.6
loadWidth = 260*n
loadHeight = 180*n
imageStart = "images/startsprite.png"
imageLoop = "images/sprite.gif"

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

#创建一个scroll组件
scroll = new ScrollComponent
	width: Screen.width,
	height: Screen.height-128*n
	y: 128*n
	z: 3
	
scroll.content.draggable.horizontal = false


#初始化头部结构
topGdt = new Layer
	width: Screen.width
	height: 360*n
	image: "images/gradiantbg.png"
	background:null
	z: 2
	opacity: 0


navbar = new Layer
	width: Screen.width
	height: 128*n
	image: "images/navbar.png"
	opacity: 1
	z: 1

view = new Layer
	width: loadWidth
	height: loadHeight
	x: Align.center
	y: 120*n
	backgroundColor: null
	clip: true
	z: 2
	
loadcontent = new Layer
	parent: view
	x: 0
	width: loadWidth*frameStep
	height: loadHeight
	image: imageStart
	
loadtxt = new TextLayer
	z: 2
	text: "下拉加载"
	fontSize: 24*n
	x: Align.center
	y: view.y+view.height-24*n
	opacity: 0
	

#申明一个切换图片帧的函数，形参s为帧的步数
pullAnimate = (s) ->
	loadcontent.states =
		on:
			x:-frameWidth*n*s		
	loadcontent.animate "on",time:0

#页面移动后触发执行一个scrolltoY函数
scroll.on Events.Move, ->
	scrolltoY(scroll.scrollY)
scrolltoY = (y) ->
	navbar.opacity = Utils.modulate(y, [0, -60*n], [1,0], true)
	topGdt.opacity = Utils.modulate(y, [0, -80*n], [0,1], true)
	loadtxt.opacity = Utils.modulate(y, [-80*n, -120*n], [0,1], true)
	view.y = Utils.modulate(y, [0, -80*n], [120*n,40*n], true)
	loadtxt.y = Utils.modulate(y, [0, -80*n], [view.y+view.height-24*n,view.y+view.height-32*n], true)
	#将Y轴滑屏的距离转化成帧的步数
	s = -Math.round(y/frameRate)
# 	print -y
# 	print s
	loadtxt.text = "下拉加载"
	view.image = ""
	
	if s < 0
		s = 0

	if s == frameStep-1
		sound.play()
		
	if s > frameStep-1
		loadtxt.text = "加载中..."
		loadcontent.image = imageLoop
# 		view.image = "images/loadloop.gif"
		s = frameStep-1
	else
		loadcontent.image = imageStart
	
	pullAnimate(s)
