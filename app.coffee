# Variables
# rows = 16
# gutter = 10
# rowHeight = 200
#Springs缓动预定义
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
quick = "spring(400,20,10)"
loose = "spring(240,18,28)"
normal = Bezier(0.645, 0.045, 0.355, 1)
skeleton.parent = main

loading.states.stateA = 
	rotation: 1480
	options: 
		curve:Bezier.linear
		delay: 2.5
		time: 3

skeleton.states.stateA =
	opacity: 0
	options: 
		delay: 5
		time:0.3
		curve: pop

loadinganimate = new Animation loading,
	loading.states.stateA
	
skeletonHidden = new Animation skeleton,
	skeleton.states.stateA

loadinganimate.start()	
skeletonHidden.start()

scroll =  ScrollComponent.wrap(scrollcontent)
scroll.scrollHorizontal = false

# print info.backgroundColor.a
avatar.originX = 0
avatar.originY = 1.2
# 初始化组件
info.y = 175
# $sheet = actionSheet.copy()
$sheet.parent = main
$sheet.y= Align.bottom(280)
$sheet.x= Align.center()

skeleton.placeBefore($sheet)
skeleton.x = Align.center()
module.parent = scrollcontent
module.x = Align.center()
module.y = 244

$tab = tab.copy()
$tab.parent = scrollcontent
$tab.x = Align.center()
$tab.y = module.y + module.height+20
# backtop.parent = $tab
backtop.x = Align.right(-16)
backtop.y = Align.bottom(-140)
backtop.opacity = 0
icon_group.x = Align.right(-16)
launch.parent = main
launch.x = Align.center
lauchbg = new Layer
	parent: launch
	x: Align.center
	y: Align.center(-40)
	opacity: 0.4
	backgroundColor: "#FFF"
# 	image:"images/design/ka3syowv.gif"

launchTxt.placeBefore(lauchbg)
launch.states.stateA =
	opacity: 0
	options: 
		delay: 2.5
		time:0.3
		curve: pop
launchHidden = new Animation launch,
	launch.states.stateA
launchHidden.start()

module.placeBehind(banner)
# $backtop = backtop.copy()

for i in [0...7]
	$list = list.copy()
	$list.parent = scrollcontent
	$list.placeBehind(banner)
	$list.y = ($list.height+12)*i+630
	$list.x = Align.center()

# float btn
fab.y = Align.bottom(-80)
fab.states = 
	stateA:
		backgroundColor:"#FFCC66"
		shadowColor: "#FFCC66"
		opacity: 1
		options: 
			curve:quick
			time: 0.5
	stateB:
		x: Align.right(-16)
		opacity: 1
		options: 
			curve:quick
			time: 0.5	
	
# print tab.y
scroll.on Events.Move, ->
	scrolltoY(scroll.scrollY)
scrolltoY = (y) ->	
# 	print y
# 	print info.y
	# 简介吸顶交互
	if y > 175 and y < tab.y+180
		info.parent = main
		info.placeBehind(topbar)
		info.y = 64
		info.height = 48
	else 
		info.parent = banner
		info.y = 175

	# 社区头像
	avatar.scale = Utils.modulate(y,[158,180],[1,0.5],true)
# 	avatar.y = Utils.modulate(y,[171,180],[-10,-24],true)
	# 社区标题
	info_title.opacity = Utils.modulate(y,[230,236],[0,1],true)
# 	info.y = Utils.modulate(y,[516,564],[175,20],true)
	backtop.opacity = Utils.modulate(y,[560,570],[0,1],true)
	navTitle.opacity = Utils.modulate(y,[560,570],[0,1],true)
# 	icon_group.x = Utils.modulate(y,[560,570],[240,200],true)
	
	if y > 560
		$tab.y = y

	# float btn 推动交互
# 	if y> 0 && scroll.direction == "down"
# 		fab.animate "stateA"
# 	if y> 0 && scroll.direction == "up"	
# 		fab.animate "stateB"
Edited = (a) ->
	a.height += 40
# 	a.children[0].opacity = 0.2
	a.shadowY = 8
	a.shadowColor = "#F5F5F5"

	edite_group_intro = edite_group.copy()
	edite_group_intro.parent = a
	edite_group_intro.x = Align.right()	
	edite_group_intro.y = 0
	edite_group_intro.visible = true
	
Saved = (a) ->
	a.height-=40
# 	a.children[0].opacity = 0.2
	a.shadowY = 0
	a.shadowColor = "#F5F5F5"
	a.children[a.children.length-1].destroy()
	a.children[a.children.length-1].visible = false

scroll.contentInset = 
	bottom: 80
	
fresh=()->
	scroll.scrollToPoint(y:20)

# 回顶部
backtop.onClick (event, layer) -> 
	fresh()

fab.ignoreEvents = true
$fab = fab.copy()
$fab.parent = main
$fab.children[1].text = "保存"
$fab.backgroundColor = "#63D9A0"
$fab.shadowColor = "rgba(9, 185, 141, 0.2)"

$fab.visible = false
$fab.placeBehind($sheet)


# 装修&保存
# decorate.switch = true	
# decorate.onClick (event, layer) ->
# 	if @switch == true
# 		$fab.visible = true
# 		@children[0].text = "保存"
# 		$sheet.stateSwitch("stateB","stateA")
# 		overlay.stateSwitch("stateB","stateA")
# 		Edited(info)
# 		Edited($tab)
# 		avatar.y = -28	
# 		$tab.children[0].y = 50
# 		$tab.children[1].y = 44
# 		@switch = false
# 		info.children[2].minY = 16
# 		scroll
# 		scrollcontent.height = scrollcontent.contentFrame().height
# 		fresh()
# 	
# 	else
# 		Saved(info)
# 		Saved($tab)	
# 		$tab.children[0].y = 10
# 		$tab.children[1].y = 0
# 		$fab.visible = false
# 		@children[0].text = "装修"
# 		@switch = true
# 		$sheet.stateSwitch("stateB","stateA")
# 		overlay.stateSwitch("stateB","stateA")
# 		avatar.visible = true
# 		backtop.visible = true	
# 		backtop.y = Align.center(4)
# 		fresh()

			
# $fab.onClick (event, layer) ->
# 	Saved(info)
# 	Saved($tab)	
# 	decorate.switch = true
# 	$tab.children[0].y = 14
# 	$tab.children[1].y = 10
# 	@visible = false
# 	decorate.children[0].text = "装修"
# 	info.y = 185
# 	info.height = 66
# 	fresh()
# 	avatar.visible = true
# 	backtop.visible = true
# 	backtop.y = Align.center(4)	

$tab.states = 
	stateA:
		backgroundColor:null
		options: 
			time: 0.2
	stateB:
		backgroundColor: "#FFF"
		opacity:1
		options: 
			time: 0.2
$tab.children[0].states = 
	stateA:
		opacity:0
		options: 
			time:0.2
	stateB:
		opacity:1
		options: 
			time:0.2					
# 	
# $tab.onClick (event, layer) ->
# 	@stateCycle("stateA","stateB")
# 	$tab.children[0].stateCycle("stateA","stateB")
# 	print $tab.children.length-1

# 设置交互	
overlay.states.stateA = 
	visible: true
	options: 
		curve: iOSActionSheet
		time: 0.1
overlay.states.stateB = 
	visible: false
	options: 
		curve: iOSActionSheet
		time: 0.1
		
$sheet.states.stateA =
	y: Align.bottom()
	options: 
		curve: iOSActionSheet
		time: 0.1
$sheet.states.stateB =
	y: Align.bottom(280)
	options: 
		curve: iOSActionSheet
		time: 0.1			

overlay.visible = false
settings.onClick (event, layer) -> 
	overlay.stateCycle("stateA","stateB")
	$sheet.stateCycle("stateA","stateB")


overlay.onClick (event, layer) ->
	overlay.stateSwitch("stateB","stateA")
	$sheet.stateCycle("stateA","stateB")	


