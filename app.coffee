Screen.backgroundColor = "#FFF"
n = Screen.width/750

frameStep = 38
frameWidth = 260
frameRate = 1.6

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
	width: 260*n
	height: 180*n
	x: Align.center
	y: 120*n
	backgroundColor: null
	clip: true
	z: 2
	
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


scroll = new ScrollComponent
	width: Screen.width,
	height: Screen.height-128*n
	y: 128*n
	z: 3
	
scroll.content.draggable.horizontal = false
# scroll.content.draggable.constraints =
# 	x: 0
# 	y: 188*n
# 	height: 20
# 	
# scroll.content.states =
# 	on:
# 		y:152*n
# 		options: 
# 			delay:0
# 			curve: quick
# 	end:
# 		y:0		
# 		options: 
# 			delay:1.5
# 			curve: quick		
loadtxt = new TextLayer
	z: 2
	text: "下拉加载"
	fontSize: 24*n
	x: Align.center
	y: view.y+view.height-24*n
	opacity: 0
# 	text：“下拉加载”	

sound = new Audio("sounds/pop03.wav")
# animateA = new Animation scroll.content,
# 	y:180*n
# 	options: 
# 		delay:0
# 		curve: quick
# 		time:0	
# # animateA.start()		
# 						
# animateB = new Animation scroll.content,
# 	y:0		
# 	options: 
# 		delay:1
# 		curve: quick
# 		time: 2

# animateA.on Events.AnimationEnd, animateB.start
	
scroll.on Events.Move, ->
	scrolltoY(scroll.scrollY)
	
scrolltoY = (y) ->
	navbar.opacity = Utils.modulate(y, [0, -60*n], [1,0], true)
	topGdt.opacity = Utils.modulate(y, [0, -80*n], [0,1], true)
	loadtxt.opacity = Utils.modulate(y, [-80*n, -120*n], [0,1], true)
	view.y = Utils.modulate(y, [0, -80*n], [120*n,40*n], true)
	loadtxt.y = Utils.modulate(y, [0, -80*n], [view.y+view.height-24*n,view.y+view.height-32*n], true)
	s = Math.round(scroll.content.y/frameRate)
# 	print scroll.content.y
	
	beyondNum = frameStep*frameRate
	loadtxt.text = "下拉加载"
	
	
	if s < 0
		s = 0
		loadcontent.image = "images/startsprite.png"
	
	if s == 28
		sound.play()
		
	if s >= frameStep-1
# 		print s
		loadtxt.text = "加载中..."
		loadcontent.image = "images/sprite.gif"
# 		scroll.content.onDragEnd (event, layer) ->
# 			sound.play()
		s = frameStep-1
	else
		loadcontent.image = "images/startsprite.png"
	
	pullAnimate(s)	
	
	
	
			
	
# 	print loadcontent.x	

# 	print loadcontent.x
