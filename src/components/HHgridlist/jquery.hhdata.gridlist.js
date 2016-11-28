/**
* @name jquery.hhdata.gridlist.js
* @author hbf
* @version 2.0.9_build14
* @lastUpdate 2016-11-15
* @copyright hhdata
**/

import jQuery from 'jquery'

(function($){
	var setting = { //默认设置，提取出来后，供外部调用控制
		width:"auto",
		height:"auto",
		maxHeight:"auto",
		title:null,
		enableNum : true,//是否开启序号列
		loadingTimeout:500, //最小等待遮罩显示时间ms
		cols:[],
		colFormatter : {},
		onComplete:function () {},//表格加载完成回调
		colOpera : false,
		colOperaClass : '',
		onColPromptShow : function (colList,fixedCols,dataCols) {},
		onColOperaSubmit : function (colList,fixedCols,dataCols) {},
		colOperaInfo : null,//为特殊需求添加的接口，支持添加icon于colOperaPrompt的按钮组旁
		gridQuery : false,
		gridQueryClass : '',
		table:{
			fullMode:false,//是否置满页面（让页面不出现滚动条）
			url:'',//加载数据请求的url
			queryParams:{},//加载数据请求url所跟的条件参数
			data:[],//初始化的数据
			loadMode:"local_load",//加载数据场景
			dataKey:"list",//加载数据对应在对象里的键
			onRowClick:function(rows,rowData){},
			onRowEnter:function(rows,rowData){},
			onRowLeave:function(rows,rowData){},
			checkbox:false,
			checkboxName:"",
			onChecked:function($rowArgs,$td,rowData,checked){},//当点击复选框
			onCheckedAll:function(checked){},//当全选
			onLoadData:function(){},//当开始更新数据时
			onLoadDataFinish:function(res){},//ajax数据加载完成回调
			onLoadDataSessionout:function(res){},//ajax数据加载session超时回调
			onLoadDataError:function(res){},//ajax数据加载错误回调
			onRenderDataFinish:function(){},//数据加载完成回调（包括ajax）
			operaCol:{},//{ operaColKey: function($rowArgs,$td,rowData,idx){} } operaColKey为data-opera的值 其对应的是操作列的格式化函数
		},
		extTable:{
			data:[],//汇总行数据
			dataKey:"extList",//汇总行对应在返回数据里的key
			onRowClick:function(rows,rowData){}
		},
		fixedTable:{
			fixedColName:[]
		},
		page:{
			sizeFresh:0,//记录每次删除的个数变化
			dataKey:"pagination",
			pageNumber:1,//当前分页索引
			pageSize:20,//当前分页显示条数
			pageList:[20,50,100],//分页显示条数可选范围
			dataTotal:0//总数据条数
		},

		gridTips:{
			width:100,
			height:100,
			background:"rgba(255,255,255,.8)",
			timeout:2000
		}
	};
	$.fn.gridList = function(option){
		var $table = $(this);
		//对象是否存在
		if(!$table.length){
			 console.info("Can't find selectElement which selector is :"+$table.selector);
		 		return false;
		 }

		//已创建过实例的，就返回实例
		if($table.data()["grid"]){
			return $table.data()["grid"];
		}
		$table.hide();//先将源表格隐藏
		//合并参数
		var opts = $.extend(true,{},setting,option);

		// --------------------------------------------------------------------------------------
		var strUtil = {
			firstP : '第一页',
			prevP : '上一页',
			nextP : '下一页',
			lastP : '最后一页',
			Num : '序号'
		}
		var utilFn = {
			"debounce":function(func, wait, immediate) {
         var timeout;
         return function() {
             var context = this, args = arguments;
             var later = function() {
                 timeout = null;
                 if (!immediate) func.apply(context, args);
             };
             var callNow = immediate && !timeout;
             clearTimeout(timeout);
             timeout = setTimeout(later, wait);
             if (callNow) func.apply(context, args);
         };
     	},
		 	"getDeepVal" : function (data,keys,def) {
				if (!!!keys && keys !== 0) {//keys不存在时，直接返回空字符串
					return "";
				}
				var keys =!!keys? keys.split(".") : "",out = data;
				try{
					[].forEach.call(keys,function(k) {
						if(/\[\d\]/.test(k)){//数组
							var idx = k.replace(/^.*\[(\d)\]/,"$1"),
									key = k.replace(/(^.*)\[\d\]/,"$1");
							out = !!key ? out[key][idx] : out[idx];
						}else{
							out = out[k];
						}
					})
				}catch(e){
					return  (!!def || def == 0) ? def : " ";
				}
				return  (!!out || out == 0) ? out : def;
			},
			"timer" : function (fn,args) {
				var t1 = new Date().getTime()
				fn.apply(grid,args);
				var t2 = new Date().getTime()
				console.log(t2-t1);
			}
		};
		// --------------------------------------------------------------------------------------
		var _getRowData = function($rows){
			var self = grid,
				key = $rows.data("key");
			return self.sourceDataMap[key];
		};
		var _getColArgs = function(cell){
			var self = grid,
				$td = $(cell),
				colIndex = $td.index(),
				$colArgs = $td.parents(".grid-table-wraper").find("tr").find("td:eq("+colIndex+")");
			return $colArgs;
		};
		var _refreshSort = function(){
			var self = grid;
			self.$element.find(".asc,.desc").removeClass("asc desc");
		};

		var _resizeGrid = function(){
			var self = grid,
				$grid = self.$element;

		    if(Boolean(opts.table["fullMode"])){
	            var isBodyFull = $("body").height() == $(window).height();//body是否填满window
	            var style,$div;//临时style样式及计算高度div
	            if(!isBodyFull){//body不填满window的话，临时加个style样式使body填满页面
                var rule = "margin:0;padding:0;width:100%;height:100%;overflow:hidden;position: relative;";
                var sheet = (function() {
                    style = document.createElement("style");
                    style.appendChild(document.createTextNode(""));
                    document.head.appendChild(style);
                    var insertedStylesheet = style.sheet || style.styleSheet;
                    return insertedStylesheet;
                })();
                function addCSSRule(sheet, selector, rules, index) {
                    try{
                        if("insertRule" in sheet) {
                        sheet.insertRule(selector + "{" + rules + "}", index);
                        }
                        else if("addRule" in sheet) {
                            sheet.addRule(selector, rules, index);
                        }
                    }catch(e){
                        console.log(e)
                    }
                }
                    addCSSRule(sheet, "html,body", rule,0);
                }
                //创建临时div块，使其top跟grid一致，然后使其bottom至底，即得其高度(bottom:12px,其中距底为10px，再加上纵向边框高度2px)
                $div = $("<div>").appendTo(document.body).css({"position":"absolute","top":$grid.offset().top,"bottom":2,"left":0,"right":0})
                var sumHeight = Math.floor($div.height()); //向下取整
                $grid.parents().each(function(i,ele){
                    var $ele = $(ele);
                    var diff = $ele.outerHeight()-$ele.height()
                    sumHeight -= diff/2;
                })
                //把临时铺满高度赋给grid
                $grid.height(Math.floor(sumHeight));
                //回收临时div块及style
                $div.remove();
                !isBodyFull && $(style).remove();
            }else if(!isNaN(Number(opts.maxHeight))){//自适应最大高度
            	//整体的高度
                var dataHeight = $grid.find(".grid-body-data table").outerHeight(true)+
																	$grid.find(".grid-head-data").outerHeight(true)+
																	$grid.find(".grid-ext-data").outerHeight(true)+
																	$grid.find(".grid-page").outerHeight(true)+
																	$grid.find(".grid-title:visible").outerHeight(true);
                var fixedHeight = $grid.find(".grid-body-fixed table").outerHeight(true)+
																	$grid.find(".grid-head-fixed").outerHeight(true)+
																	$grid.find(".grid-ext-fixed").outerHeight(true)+
																	$grid.find(".grid-page").outerHeight(true)+
																	$grid.find(".grid-title:visible").outerHeight(true);
                $grid.height(Math.min(opts.maxHeight,Math.max(dataHeight,fixedHeight)));
            }else{
            	var h = opts.height;
            	var isIE = !!window.ActiveXObject || "ActiveXObject" in window
            	//在IE10~11下，height auto无法将容器撑起来，故需重算高度
            	if(isIE && opts.height == "auto"){
            		h = $grid.find(".grid-body-data table").outerHeight(true)+$grid.find(".grid-head-data").outerHeight(true)+$grid.find(".grid-ext-data").outerHeight(true)+$grid.find(".grid-page").outerHeight(true)+$grid.find(".grid-title:visible").outerHeight(true);
	            }
            	$grid.height(h);
            }

            //设置容器高宽
            $grid.width(opts.width);
          //滚动同步
            _refreshScroll();

		};

		//同步容器间的偏移值
		var _aynScrollLeft = function  (argument) {
			var self = grid,
					$grid = self.$element,
					$scrollEleHead = $grid.find(".grid-head-data .grid-scroll-wrap"),
					$scrollEleExt = $grid.find(".grid-ext-data .grid-scroll-wrap"),
					$fixedEle = $grid.find(".grid-body-fixed"),
					$scrollEle = $grid.find(".grid-body-scrollEle"),
					scrollLeft = $scrollEleHead.scrollLeft();
			$scrollEle.add($scrollEleExt).scrollLeft(scrollLeft)
		}
		//设置滚动条
		var _setScroll = function  () {
			var self = grid,
				$grid = self.$element,
				$scrollBody = $grid.find(".grid-body-data"),
			 	$scrollEle = $("<div>").addClass("grid-body-scrollEle").appendTo($scrollBody),
			 	$scrollTable = $scrollBody.children("table").appendTo($scrollEle);

			self.$element.$x = $("<div class='grid-handle-x'></div>").appendTo($scrollBody);
			self.$element.$y = $("<div class='grid-handle-y'></div>").appendTo($scrollBody);

			_setScrollEvent();
			_refreshScroll();
		};
		var _refreshScroll = function  () {
			var self = grid,
			    $grid = self.$element;
			if(!$grid.$x || !$grid.$y) return;
			_setScrollPos();
			_setScrollSize();
		}
		//改变滚动条状态
		var _setScrollSize = function  () {
			var self = grid,
				$grid = self.$element,
				scrollEle = $grid.find(".grid-body-scrollEle")[0],
				w = Math.max(scrollEle.clientWidth- (scrollEle.scrollWidth - scrollEle.clientWidth),50),
				h = Math.max(scrollEle.clientHeight- (scrollEle.scrollHeight - scrollEle.clientHeight),50),
				$x = $grid.$x,
				$y = $grid.$y;
			scrollEle.scrollBarWidth = w;
			scrollEle.scrollBarHeight = h;
			$x.toggle(scrollEle.scrollWidth - scrollEle.clientWidth > 2 && scrollEle.scrollWidth > 50);//可滚动距离在2px以内则不展示滚动条
			$y.toggle(scrollEle.scrollHeight - scrollEle.clientHeight > 2 && scrollEle.scrollHeight>50);
			$x.width(w);
			$y.height(h);

		}
		//定位滚动条
		var _setScrollPos = function  () {
			var self = grid,
				$grid = self.$element,
				scrollEle = $grid.find(".grid-body-scrollEle")[0],
				$x = $grid.$x,
				$y = $grid.$y;
			$x[0].style.left = ((scrollEle.clientWidth - scrollEle.scrollBarWidth) * scrollEle.scrollLeft / (scrollEle.scrollWidth - scrollEle.clientWidth)) + 'px';
			$y[0].style.top = ((scrollEle.clientHeight - scrollEle.scrollBarHeight) * scrollEle.scrollTop / (scrollEle.scrollHeight - scrollEle.clientHeight)) + 'px';
		}
		//设置滚动条事件
		var _setScrollEvent =function  () {
			var self = grid,
				$grid = self.$element,
				$scrollEle = $grid.find(".grid-body-scrollEle"),
				$scrollEleHead = $grid.find(".grid-head-data").wrapInner("<div class='grid-scroll-wrap'></div>").find(".grid-scroll-wrap"),
				$scrollEleExt = $grid.find(".grid-ext-data").wrapInner("<div class='grid-scroll-wrap'></div>").find(".grid-scroll-wrap"),
				$fixedEle = $grid.find(".grid-body-fixed"),
			 	scrollEle = $scrollEle[0],
			 	$x = $grid.$x,//x滑块
				$y = $grid.$y,//y滑块
				scrollPageY = 0,scrollY = 0,//y滚动
				scrollPageX = 0,scrollX = 0,//x滚动
				isY = false,
				isScorlling = false;//是否在移动中
			//按下
			$x.add($y).on("mousedown",function  (e) {
				isY = $(this).hasClass("grid-handle-y");
				if(isY){
					scrollPageY = e.clientY;
					scrollY = scrollEle.scrollTop;
				}else{
					scrollPageX = e.clientX;
					scrollX = scrollEle.scrollLeft;
				}
				isScorlling = true;
				document.body.onselectstart = function(){return false};
				return false;
			})
			//移动
			$grid.on("mousemove",function  (e) {
				if(!isScorlling) return;
				var per;
				if(isY){
					per = (scrollEle.scrollHeight - scrollEle.clientHeight) / (scrollEle.clientHeight - scrollEle.scrollBarHeight);
					scrollEle.scrollTop = scrollY - (scrollPageY - e.clientY) * per;
					$fixedEle.scrollTop(scrollEle.scrollTop)
				}else{
					per = (scrollEle.scrollWidth - scrollEle.clientWidth) / (scrollEle.clientWidth - scrollEle.scrollBarWidth);
					scrollEle.scrollLeft = scrollX - (scrollPageX - e.clientX) * per;
					$scrollEleHead.scrollLeft(scrollEle.scrollLeft);
					$scrollEleExt.scrollLeft(scrollEle.scrollLeft);
				}
				_setScrollPos();
			})
			//松开
			$grid.on("mouseup mouseleave",function  (e) {
				if(!isScorlling) return;
				isScorlling = false;
				document.body.onselectstart = function(){return true};
			})
			var mouseScroll = function  (evt) {
				if(scrollEle.scrollHeight - scrollEle.clientHeight < 3) return true;//
				var speed = scrollEle.scrollHeight/20;
				evt = evt || event;
				var delta = evt.wheelDelta || evt.detail,//ff是evt.detail
					condition = evt.wheelDelta? delta < 0 : delta > 0;//ff是向下滚动是正值

				if(condition){
					if(scrollEle.scrollTop >= (scrollEle.scrollHeight - scrollEle.clientHeight)) return true;
					scrollEle.scrollTop += speed;
				}else{
					if(scrollEle.scrollTop == 0) return true;
					scrollEle.scrollTop -= speed;
				}
				$fixedEle.scrollTop(scrollEle.scrollTop)
				_setScrollPos();
			}

			//鼠标滚轮
			$grid.find(".grid-body")[0].onmousewheel = function(evt){
				var flag =	mouseScroll(evt);
				if (!flag) {
					evt.preventDefault();
				}
			}
			$grid.find(".grid-body")[0].addEventListener("DOMMouseScroll", function(evt) {//兼容ff
				var flag =	mouseScroll(evt);
				if (!flag) {
					evt.preventDefault();
				}
			});
		}

		var _goNextPage = function(){
			var self = grid,
				$grid = self.$element,
				$page = $grid.find(".grid-page"),
				pageNumber = parseInt($page.find(".page-number").val()),
				pageSize = $page.find(".page-list").val(),
				pageOpt = self.page,
				nextPNumber = Math.min(++pageNumber,pageOpt.pageTotal);
			goPage(nextPNumber)
		};
		var _goPrevPage = function(){
			var self = grid,
				$grid = self.$element,
				$page = $grid.find(".grid-page"),
				pageNumber = parseInt($page.find(".page-number").val()),
				pageSize = $page.find(".page-list").val(),
				pageOpt = self.page,
				prevPNumber = Math.max(--pageNumber,1);
			goPage(prevPNumber)
		};
		var _goFirstPage = function(){
			var self = grid,
				$grid = self.$element,
				$page = $grid.find(".grid-page"),
				pageNumber = parseInt($page.find(".page-number").val()),
				pageSize = $page.find(".page-list").val(),
				pageOpt = self.page;
			goPage(1);
		};
		var _goLastPage = function(){
			var self = grid,
				$grid = self.$element,
				$page = $grid.find(".grid-page"),
				pageNumber = parseInt($page.find(".page-number").val()),
				pageSize = $page.find(".page-list").val(),
				pageOpt = self.page;
			goPage(pageOpt.pageTotal);
		};
		var _initPageOpt = function(){
			var self = grid,
				pageOpt = self.page,
				dataTotal;
			if(getLoadMode().hasUrl){//has url?
				dataTotal =pageOpt.dataTotal;
			}else{
				dataTotal =self.data.length;
			}
			pageOpt.pageTotal = Math.ceil(dataTotal / pageOpt.pageSize);
		}
		var _refreshPage = function(){
			var self = grid,
				$grid = self.$element,
				$page = $grid.find(".grid-page"),
				$pageNumber = $page.find(".page-number"),
				$pageTotal = $page.find(".page-total"),
				$dataTotal = $page.find(".page-data-total"),
				$pageList = $page.find(".page-list"),
				tempData = self.data,
				dataTotal = tempData.length,
				pageOpt = self.page;
			pageOpt.pageSize = parseInt($pageList.val());
			_initPageOpt();
			//每页显示条数
			$pageList.val(pageOpt.pageSize);
			//当前页
			if(pageOpt.pageTotal){
			    //若当前页为0而页面有数据，这使当前页变为第1页; edit by hbf 2015/7/2
			    if(self.data.length && pageOpt.pageNumber == 0) {
			        pageOpt.pageNumber = 1
		        }
				pageOpt.pageNumber = Math.min(pageOpt.pageNumber,pageOpt.pageTotal);
			}
			$pageNumber.val(pageOpt.pageNumber);
			//总页数
			$pageTotal.text(pageOpt.pageTotal);
			//总数据
			$dataTotal.text(pageOpt.dataTotal);
		};
		var _urlLoadData = function(){
			var self = grid,
				tableOpt = self.opt.table,
				extTableOpt = self.opt.extTable,
				key = tableOpt.dataKey,
				extKey = extTableOpt.dataKey,
				data = [];
			return $.ajax({
				url:tableOpt.url,
				type:'post',
				async:false,//must!
				data:tableOpt.queryParams,
				cache:true,
				error:function(){
					console.log("network error!");
				}
			}).done(function(res){
				 var flag = res["result"] || 0;
					switch(flag){
					case 1://数据正常返回
						//table
						data = eval("res."+key);
						self.data = data;

						//回调
						self.opt.table["onLoadDataFinish"](res);
						break;
					case 2://session超时
							self.opt.table["onLoadDataSessionout"](res);
							break;
					case 0://数据返回失败
						self.opt.table["onLoadDataError"](res);
						break;
					default:
							self.opt.table["onLoadDataError"](res);
							break;
					}
			});
			// return data;
		};
		var _urlLoadDataPage = function(){
			var self = grid,
				pageOpt = self.page,
				tableOpt = self.opt.table,
				extTableOpt = self.opt.extTable,
				key = tableOpt.dataKey,
				pageKey = pageOpt.dataKey,
				extKey = extTableOpt.dataKey,
				postPageOpt,postOpt,
				data = [];

			/*防止传超出实际大小和0的页码*/
			var realPages=Math.ceil((pageOpt.dataTotal+self.page.sizeFresh) / pageOpt.pageSize);
			if(pageOpt.pageNumber>realPages){
				pageOpt.pageNumber=Math.max(1,realPages);
				self.page.sizeFresh=0;
			}
			if(typeof(tableOpt.queryParams) == "object"){
				postPageOpt ={currentPage:Math.max(1,pageOpt.pageNumber),pageSize:pageOpt.pageSize};
				postOpt = $.extend({},tableOpt.queryParams,postPageOpt);
			}else{
				postPageOpt ="currentPage="+Math.max(1,pageOpt.pageNumber)+"&pageSize="+pageOpt.pageSize;
				postOpt = tableOpt.queryParams+"&"+postPageOpt;
			}
			return $.ajax({
				url:tableOpt.url,
				type:'post',
				data:postOpt,
				cache:true,
				error:function(){
					console.log("network error!");
				}
			}).done(function(res){
					var flag = res["result"] || 0;
					switch(flag){
					case 1://数据正常返回
						var resOpt =res[pageKey];
						self.page['dataTotal'] = resOpt.dataTotal;
						self.data = resOpt[key]||[];
						if(!self.data.length){
							 self.page.pageNumber = 0;
						}else{
							//防止因出错导致页码为0 modified by hanhui
							if(self.page.pageNumber == 0){
								self.page.pageNumber=1;
							}
						}

						//回调
						tableOpt["onLoadDataFinish"](res);
						break;
					case 2://session超时
						tableOpt["onLoadDataSessionout"](res);
						break;
					case 0://数据返回失败
						tableOpt["onLoadDataError"](res);
						break;
					default:
						tableOpt["onLoadDataError"](res);
						break;
					}
				});
			// return data;
		};
		var _refreshChecked = function(){
			var self = grid,
				$grid = self.$element,
				$head = $grid.find("[class^=grid-head-]");
				$head.find(":checkbox").each(function(i,ele){
					ele.checked = false;
				})
		}
		var _refreshGridOpera = function(){
			var self = grid;
			_refreshSort();
			_refreshChecked();
		}
		var _restoreGridScroll = function(){
		    var self = grid;
		    var $grid = self.$element;
		    $grid.find(".grid-body-scrollEle").scrollLeft(0).scrollTop(0);
		    $grid.find(".grid-head-data .grid-scroll-wrap").scrollLeft(0);
		    $grid.find(".grid-ext-data .grid-scroll-wrap").scrollLeft(0);
		    $grid.find(".grid-body-fixed").scrollTop(0);
		    _refreshScroll();
		}

		var _isVisible =function(){
				var self = grid,
						$grid = self.$element;
				return !$grid.is(":hidden");
		}

		// --------------------------------------------------------------------------------------

		var init = function (opts) {
			var self = grid;
			self.$element = renderWraper();
			// self.gid = creatGId();

			if (opts.cols && opts.cols.length) {
				self.header = createHeaderByColParams(opts.cols)
			}else{
				self.header = creatHeaderByTable();
			}
			setColFormatter();
			self.$style = creatStyle();
			// self.$cloneRow = creatCloneRow();
			self.page = createPage();
			//设置表格title行
			setTitle(opts.title);
			self.sourceDataMap = {};
			bindGridEvent();
			loadData();
			self.extRows = creatRow(self.extData);
			renderExtData();
			colResize();
			gTrigger('g.reDraw');
		}
		var creatGId = function () {
			return Math.floor(Math.random()*new Date().getTime());
		}
		var creatStyle = function () {
			var $style = $("<style>").appendTo("body");
			$style.data("gid",grid.gid);
			return $style;
		}
		var creatCloneRow = function () {//todo 在输出的行中绑定col
			var self = grid;
			// 复制表头作为行模板
			var $rowArgs = self.$element.find("[class^=grid-head] table tr").clone().addClass('g-row');
			$rowArgs.find(".grid-td-div").empty();
			// $rowArgs.find(".grid-td-div:not('.grid-chk-div')").each(function (i,ele) {
			// 	$(this).removeClass().addClass('grid-td-div').empty();//重置样式并清空内容
			// })
			self.$rowClone = $rowArgs;
			return $rowArgs;
		}
		var renderWraper = function(){
			var $grid = $("<div class='grid-list'>"+
								"<div class='grid-title'></div>"+//标题
								"<div class='grid-query'><span class='grid-query-inp-wraper'><input type='text' placeholder='请输入关键字' class='grid-query-inp'/><span class='grid-query-clear'></span></span></div>"+//表格内过滤
								"<div class='grid-body'>"+//正文
										"<div class='grid-fixed grid-table-wraper'>"+
												"<div class='grid-head-fixed'><table></table></div>"+
												"<div class='grid-body-fixed'><table></table></div>"+
												"<div class='grid-ext-fixed'><table></table></div>"+
										"</div>"+
										"<div class='grid-data grid-table-wraper'>"+
												"<div class='grid-head-data'><table></table></div>"+
												"<div class='grid-body-data'><table></table></div>"+
												"<div class='grid-ext-data'><table></table></div>"+
										"</div>"+
								"</div>"+

								"<div class='grid-page'></div>"+//分页
								"<div class='grid-col-prompt'><div class='grid-col-prompt-header'><input type='checkbox' class='grid-col-prompt-chk-all' /><label class='grid-col-prompt-label'>全选</label></div><div class='grid-col-prompt-content'></div><div class='grid-col-prompt-btns'><span class='grid-col-prompt-btn grid-col-prompt-submit'>保存</span><span class='grid-col-prompt-btn grid-col-prompt-keep'>暂存</span><span class='grid-col-prompt-btn grid-col-prompt-cancel'>取消</span></div></div>"+//呈现列列表
							"</div>").insertAfter($table);
			//列操作框的上下移箭头
			var $promptHeader = $grid.find('.grid-col-prompt-header'),
					$up = $("<span>").addClass('grid-col-prompt-move-up').appendTo($promptHeader),
					$down = $("<span>").addClass('grid-col-prompt-move-down').appendTo($promptHeader);
			if(opts.colOperaInfo){//如果存在蛋疼的外嵌icon,则硬塞
				$grid.find('.grid-col-prompt-btns').prepend(opts.colOperaInfo);
			}
			$table.appendTo($grid);//扔进grid就可以不管了
			return $grid;
		};
		var renderHead = function (header) {
			var self = grid,
				$grid = self.$element,
				colMap = header.colMap;
			var wrapTd = function (col) {
				var $td = col.dom,
						child = $td[0].childNodes,
						$div = $("<div>").addClass("grid-td-div");
				$(child).appendTo($div);
				$div.appendTo($td)
				if (!!!col.isChk) {
					$div.css("width",$td.data("width") || $td.width() || 50);//todo 序号列的宽度控制
				}else {
					$div.css("width",'33px').addClass('grid-chk-div');
				}
				if(col.sortable){
					$div.addClass('sortable').attr("data-sortable","");
				}
			}
			var $fixedHeaderTable = $grid.find(".grid-head-fixed table").empty();
			var $dataHeaderTable = $grid.find(".grid-head-data table").empty();
			//固定列
			var $fixedTr = $("<tr data-role='fixed'>").appendTo($fixedHeaderTable);
			var $dataTr = $("<tr data-role='data'>").appendTo($dataHeaderTable);

			if (opts.table.checkbox) {//复选框列
				var col = header.colMap.chkCol;
				var $td = col.dom;
				if(!col.isWraped){
					var $checkbox = $("<input type='checkbox' class='g-chk-all' />").appendTo($td).wrap("<span></span>");
					//checkboxName
					if(opts.table.checkboxName.length){
						$checkbox.attr("data-checkboxname",opts.table.checkboxName);
					}
					wrapTd(col)
					col.isWraped = true
				}
				$td.appendTo($fixedTr);
			}

			if (opts.enableNum) {//序号列
				var col = header.colMap.numCol;
				var $td = col.dom;
				if(!col.isWraped){
					wrapTd(col)
					col.isWraped = true
				}
				$td.appendTo($fixedTr);
			}



			$.each(colMap.fixedCols,function (i,col) {
				var $td = col.dom;
				if(!col.isWraped){
					wrapTd(col)
					col.isWraped = true
				}
				$td.appendTo($fixedTr);
			})
			//常规列
			$.each(colMap.dataCols,function (i,col) {
				var $td = col.dom;
				if(!col.isWraped){
					wrapTd(col)
					col.isWraped = true
				}
				$td.appendTo($dataTr);
			})
			return self.$element.find("[class^=grid-head]");
		}
		var creatHeaderByTable = function () {
			var header = {},
					colList = [],
					$header = $table.find("tr:eq(0) td");
					// header.cols = [];
			header.colMap = {chkCol:null,numCol:null,fixedCols:[],dataCols:[]};
			if(opts.table.checkbox){//复选框
				// header.colMap.fixedCols.push(new Col($("<td data-checkbox ></td>")));
				var col = new Col($("<td data-checkbox ></td>"))
				header.colMap.chkCol = col
				colList.push(col);
			}
			if (opts.enableNum) {//激活序号列
				var col;
				if(!!$table.has('[data-number],[data-name="number"]').length){//存在序号列
					col = new Col($table.find('[data-number]'));
				}else {
					col = new Col($("<td data-number >"+strUtil['Num']+"</td>"));
				}
				col.isNum = true;//标识是序号列
				// header.colMap.fixedCols.push(col);
				header.colMap.numCol = col;
				colList.push(col);
			}
			$header.filter(':not([data-number])').each(function (i,td) {//除去序号列
				var col = new Col($(td));
				if(col.fixed){
					header.colMap.fixedCols.push(col);
				}else {
					header.colMap.dataCols.push(col);
				}
			})
			colList = colList.concat( header.colMap.fixedCols)
			colList = colList.concat( header.colMap.dataCols)
			//按顺序来的列集合
			header.colList = colList;
			// header.colList = $.extend([], header.colMap.fixedCols.concat(header.colMap.dataCols));

			$.each(colList,function(idx, col) {
				col.index = idx;
				col.currIndex = idx;
				if(!col.visible){
					col.dom.addClass("grid-ele-hidden");//表头td添加隐藏样式
				}
			});

			//渲染表格grid-head
			header.dom = renderHead(header);
			return header;
		}
		var createHeaderByColParams = function (colParams) {
			var self = grid,header = {},newColList = [],
					newFixedList = [], newDataList = [];
			header.colMap = {chkCol:null,numCol:null,fixedCols:[],dataCols:[]};
			if (opts.table.checkbox) {
				var col = new PCol({checkbox:true},0)
				header.colMap.chkCol = col
			}
			if (opts.enableNum) {
				var col = new PCol({number:true,text:"序号",sort:true},1)
				header.colMap.numCol = col
			}
			$.each(colParams,function(i, nCol) {//遍历列配置集合
				var id = nCol.id || nCol.name;//列标识
				if (!id)  return true;
				if (nCol.number)  return true;//序号列不处理
				var col = new PCol(nCol)
				if(col.fixed){
					newFixedList.push(col);
				}else {
					newDataList.push(col)
				}
				newColList.push(col)
			});
			header.colMap.fixedCols = newFixedList;
			header.colMap.dataCols = newDataList;
			header.colList = getColList(header);
			header.dom = renderHead(header);
			return header;
		}
		var bindGridEvent = function () {
			var self = grid,
					$element = self.$element;
			$element.on({
				"g.clearRow" : clearRow,
				"g.loadData" : loadData,
				"g.renderData" : renderData,
				"g.renderExtData" : renderExtData,
				"g.reDraw" : reDraw,
				"g.repage" : _refreshPage
			}).on('click','.first-page',_goFirstPage)
			.on('click','.prev-page',_goPrevPage)
			.on('click','.next-page',_goNextPage)
			.on('click','.last-page',_goLastPage)
			.on("blur",'.page-number',goNumPage)
			.on("change",".page-list",changePageList)
			.on('click','.g-chk-all',onChkAll)
			.on('click','.g-chk',onChk)
			.on('click','.g-row',onRowClick)
			.on('mouseenter','.g-row',onRowEnter)
			.on('mouseleave','.g-row',onRowLeave)
			.on('click','[class^="grid-head"] div[data-sortable]',onColSort)
			.on('click','.grid-query-trigger',onGridQueryShow)
			.on('click','.grid-col-prompt-trigger',onColPromptShow)
			.on('click','.grid-col-prompt-submit',onColPromptSubmit)
			.on('click','.grid-col-prompt-keep',onColPromptSave)
			// .on('click','.grid-col-prompt-chk',onColPromptCheck)
			.on('click','.grid-col-prompt-chk-all',onColPromptCheckAll)
			.on('click','.grid-col-prompt-cancel',onColPromptCancel)
			.on('click','.grid-col-prompt-li',onColPromptSelected)
			.on('click','.grid-col-prompt-move-up',onColPromptMoveUp)
			.on('click','.grid-col-prompt-move-down',onColPromptMoveDown)
			.on('keyup','.grid-query-inp',onGridQuery)
			.on('click','.grid-query-clear',onGridQueryClear)
			var resize = utilFn.debounce(function(){
					if(!_isVisible()) return false;
					resizeGrid();
			}, 25);
			$(window).on("resize",resize);
		}
		var goNumPage = function () {
			var self = grid,pageOpt = self.page,
				 	val = $(this).val(),
					numReg = new RegExp("^[0-9]*$");
			if(!numReg.test(val) || parseInt(val)>pageOpt.pageTotal || val.length <1 || parseInt(val) <= 0){
				$(this).val(pageOpt.pageNumber);
				return;
			}
			goPage(val);
		}
		var changePageList = function () {
			var self = grid,
				loadMode = getLoadMode();
			gTrigger("g.repage");
			if (loadMode.hasPost) {
				loadData(true);
			}else {
				renderData(true);
			}
		}
		var createPage = function () {
			var self = grid;
			self.page = opts.page;
			var page = self.page;
			//渲染分页
			page.enable = getLoadMode().hasPage;
			page.ele = renderPage();
			setPageVal();
			return page;
		}
		var initPage = function () {
			var self = grid,
				pageOpt = self.page,
				dataTotal;
			if(getLoadMode().hasUrl){//has url?
				dataTotal = pageOpt.dataTotal;
			}else{
				dataTotal = self.data.length;
			}
			pageOpt.pageTotal = Math.ceil(dataTotal / pageOpt.pageSize);
			return pageOpt;
		}
		var renderPage = function () {
			var self = grid,
				$grid = self.$element,
				$page = $grid.find(".grid-page"),
				$pageGroup = $("<div class='page-group'></div>").appendTo($page),
				pageOpt = self.page;

			var $firstP = $('<a href="javascript:;" class="first-page" title="'+ strUtil.firstP + '"></a>').appendTo($pageGroup);
			var $prevP = $('<a href="javascript:;" class="prev-page" title="'+ strUtil.prevP + '"></a>').appendTo($pageGroup);
			var $nextP = $('<a href="javascript:;" class="next-page" title="'+ strUtil.nextP + '"></a>').appendTo($pageGroup);
			var $lastP = $('<a href="javascript:;" class="last-page" title="'+ strUtil.lastP + '"></a>').appendTo($pageGroup);
			var $pageNumber = $("<input type='text' class='page-number' />").insertBefore($nextP);
			var $pageTotal = $("<span class='page-total'></span>").insertAfter($pageNumber);
			var $split = $("<span class='page-split'></span>").appendTo($pageGroup);
			var $pageList = $("<select class='page-list'></select>").appendTo($pageGroup);
			$split.clone().appendTo($pageGroup);
			var $dataTotal = $("<span class='page-data-total'></span>").appendTo($pageGroup);

			if(!pageOpt.enable) $pageGroup.hide();
			return {
				$page : $page,
				$firstP : $firstP,
				$prevP : $prevP,
				$nextP : $nextP,
				$lastP : $lastP,
				$pageNumber : $pageNumber,
				$pageTotal : $pageTotal,
				$pageList : $pageList,
				$dataTotal : $dataTotal
			}
		}
		var setPageVal = function () {
			var self = grid,
					page = self.page,
					ele = page.ele;
			ele.$pageNumber.val(page.pageNumber); // pageNumber
			ele.$pageTotal.text(page.pageTotal); // pageTotal
			ele.$dataTotal.text(page.dataTotal); // dataTotal
			ele.$pageList.empty(); // pageList
			for (var i = 0; i < page.pageList.length; i++) {
				var $o = $("<option></option>").appendTo(ele.$pageList);
				$o.text(page.pageList[i]).val(page.pageList[i]);
				if(page.pageSize == page.pageList[i]) $o.prop("selected","selected");
			};
		}
		var getLoadMode = function () {
			var self = grid,
				loadModeStr = self.opt.table.loadMode.toString();
			return {
				name : loadModeStr,
				hasPage : loadModeStr.indexOf('page') > -1,
				hasUrl : loadModeStr.indexOf('url') > -1,
				hasPost : loadModeStr.indexOf('post') > -1
			};
		}
		var goPage = function(index){
			var self = grid,
				$grid = self.$element,
				loadMode = getLoadMode(),
				pageOpt = self.page;
			if(pageOpt.pageNumber == index) return;
			pageOpt.pageNumber = index;
			//todo 判断是否需要loadData
			if (loadMode.hasPost) {
				loadData(true);
			}else {
				renderData(true);
			}
		};
		var gTrigger = function (eventName,args) {
			var self = grid,
					$element = self.$element;
			$element.trigger(eventName,[args])
		}
		var renderData = function (isRerender) {
			var self = grid,
					$grid = self.$element,
					// rows = self.renderRows,
					fixedTr = [],dataTr = [];
			if(isRerender){
				if(getLoadMode().hasPage){
					self.renderRows = sliceRowsByPage();
				}else {
					self.renderRows = self.rows;
				}
			}
			clearData();
			$.each(self.renderRows ,function(i, row) {
				var $rows = renderRow(row);
				fixedTr.push($rows.fixedTr)
				dataTr.push($rows.dataTr)
			});
			$grid.find(".grid-body-fixed table").append(fixedTr)
			$grid.find(".grid-body-data table").append(dataTr)
			_refreshPage();
			resizeGrid();
			if(!isRerender) _refreshGridOpera();
			_restoreGridScroll();
			if (opts.gridQuery) {
				resetGridQuery();//重置内过滤
			}
			//回调
			self.opt.table.onRenderDataFinish();
			self.loading = false;
		}
		var renderExtData = function () {
			var self = grid,
					$grid = self.$element,
					rows = self.extRows,
					fixedTr = [],dataTr = [];

			clearExtData();
			$.each(rows,function(i, row) {
				row.isExt = true;
				var $rows = renderRow(row);
				$rows.fixedTr.find(".sortable").removeClass("asc desc");
				$rows.dataTr.find(".sortable").removeClass("asc desc");
				fixedTr.push($rows.fixedTr)
				dataTr.push($rows.dataTr)
			});
			$grid.find(".grid-ext-fixed table").append(fixedTr);
			$grid.find(".grid-ext-data table").append(dataTr);
			resizeGrid();
			// _refreshGridOpera();
			_restoreGridScroll();
		}
		var renderDataByRows = function (rows) {
			var self = grid,
					$grid = self.$element,
					// rows = self.renderRows,
					fixedTr = [],dataTr = [];
			clearData();
			$.each(rows ,function(i, row) {
				var $rows = renderRow(row);
				fixedTr.push($rows.fixedTr)
				dataTr.push($rows.dataTr)
			});
			$grid.find(".grid-body-fixed table").append(fixedTr)
			$grid.find(".grid-body-data table").append(dataTr)
			_refreshPage();
			resizeGrid();
			// _refreshGridOpera();
			_restoreGridScroll();
			//回调
			self.opt.table.onRenderDataFinish();
			self.loading = false;
		}
		var clearData = function(){
			var self = grid,
				$grid = self.$element;
			$grid.find("[class^=grid-body-] table").empty();
			self.sourceDataMap = {};
		};
		var clearExtData = function(){
			var self = grid,
				$grid = self.$element;
			$grid.find("[class^=grid-ext-] table").empty();
			self.sourceDataMap = {};
		};
		var	reDraw = function () {
			//设置高宽
			resizeGrid();
			_setScroll();
		}
		var repage = function () {
			setPageVal();
		}
		var loadData = function (isPageTrigger) {
			var self = grid, loadMode = getLoadMode(),
					promise;//异步
			self.loading = true;
			onColPromptCancel();//隐藏列操作框
			self.opt.table.onLoadData.apply(grid,[]);//onLoadData回调
			switch (loadMode.name){
				case "url_page_post":// url page(post)
					promise = _urlLoadDataPage();
					$.when(promise).done(function () {
							_initPageOpt();
							var pageOpt = self.page,
									index = (pageOpt.pageNumber-1)*pageOpt.pageSize;
							self.rows = creatRow(self.data,index);
							self.renderRows = self.rows;
							renderData();
						})
				break;
				case "url_page_load":// url page(data)
					promise = _urlLoadData();
					$.when(promise).done(function () {
							_initPageOpt();
							if(!!!isPageTrigger) {//由page触发的，不重新构建row
								self.rows = creatRow(self.data);
							}
							self.renderRows = sliceRowsByPage();
							renderData();
						})
				break;
				case "url_load":// url page(none)
					promise = _urlLoadData();
					$.when(promise).done(function () {
							_initPageOpt();
							self.rows = creatRow(self.data);
							self.renderRows = self.rows;
							renderData();
						})
				break;
				case "local_page_load":// local page(data)
					_initPageOpt();
					if(!!!isPageTrigger) {//由page触发的，不重新构建row
						self.rows = creatRow(self.data);
					}
					self.renderRows = sliceRowsByPage();
					renderData();
				break;
				case "local_load":// local page(none)
					self.rows = creatRow(self.data);
					self.renderRows = self.rows;
					renderData();
				break;
				default:
				break;
			}
		}
		var sliceRowsByPage = function () {
			var self = grid,
				tempRows = self.rows,
				pageOpt = self.page,
				pageSize = pageOpt.pageSize,
				pageNumber = pageOpt.pageNumber,
				pageTotal = pageOpt.pageTotal,
				renderData;
			//如果数据总量正好能被整除，说明则将页码设置为最后一页 modified by hanhui
			//sizeFresh:当删除的个数存在时，再强行跳至最后一页
			//使用场景，当当前页只剩下最后一条数据并进行删除时，需要强制跳回上一页
			if(tempRows.length % pageOpt.pageSize == 0 && pageOpt.sizeFresh){
				pageNumber = tempRows.length/pageOpt.pageSize;
				pageOpt.pageNumber = pageNumber;
			}
			pageOpt.dataTotal = tempRows.length;//总数
			var n1 = Math.max(pageSize *(pageNumber-1),0),
				n2 = n1 + pageSize;
			return tempRows.slice(n1,n2);
		}
		var creatRow = function (data,begIndex) {
			var self = grid,rows = [];
			for (var i = 0; i < data.length; i++) {
				var idx = i;
				if(!!begIndex) idx += begIndex;
				rows.push(new Row(data[i],idx));
			}
			return rows;
		}
		var clearRow = function () {}
		var renderRow = function (row) {
			var self = grid,
				$grid = self.$element,
				$rows = build$Rows(row);

			setRowQueryText(row,$rows);//设置查询关键字

			//2.把行插入表格，同时绑定事件
			$rows.each(function(i,ele){
				ele._row = row;//dom中注入row
			});

			return {
				fixedTr : $rows.filter("[data-role='fixed']"),
				dataTr : $rows.filter(":not('[data-role=fixed]')")
			}
		}
		var setRowQueryText = function (row,$rows) {
			var innerHtml = "";
			$rows.each(function(index, el) {
				innerHtml += $(this).html()
			});
			var queryWords = innerHtml.match(/[^>]+(?=<\/\w{1,10}>)/g);
			row.queryWords = queryWords;
			row.queryText = queryWords.join(",");
		}
		var queryRows = function () {//todo 行过滤函数
				var self = grid,
						rows = grid.rows;
		}
		var build$Rows = function (row) {
				var self = grid,
						$grid = self.$element,
						$rows,queryText="",
						rowData = row.data;

				// var cols = self.header.colMap;
				$rows = creatCloneRow();//第一行的拷贝，分别是fixed row和data row
				// $.each([].concat(cols.fixedCols,cols.dataCols),function(i, col) {
				$.each(self.header.colList,function(i, col) {
						var idx = col.dom.index(),
								$pTr = !!col.fixed? $rows.filter('[data-role="fixed"]'):$rows.not('[data-role="fixed"]'),
								$td = $pTr.children("td").eq(idx);
						$td[0]._col = col;
						$td[0]._row = row;
						var cell = new Cell($td);
						if (col.isChk) {//选择列
							var $div = $rows.find("div.grid-chk-div"),
									// $checkbox = $div.find(':checkbox'),
									$checkbox = $("<input type='checkbox' class='g-chk' />").appendTo($div),
									name = opts.table.checkboxName;
							$checkbox[0].checked = row.chk;
							// $checkbox[0].checked = !!utilFn.getDeepVal(rowData,name)
							$td = $div.parents("td");
						}else if (col.isNum) {//序号列
							$td = $rows.find("td[data-number]");
							var $div = $td.children(".grid-td-div"),
									index = row.index + 1;
							if (row.isExt) index = "-";//汇总行不显示序号
							$div.html(index);
							// $div.html(index).attr("data-sourcedata",index);
						}else if (col.isOpera) {//todo 操作列独立并且固定于表格右侧
 						 var operakey = $td.data("operakey"),$div = $td.children(".grid-td-div"),
 						 		 insertHtml = opts.table["operaCol"][operakey]?opts.table["operaCol"][operakey]($rows,$td,rowData,row.index):"";
  						 $div.html(insertHtml);
 					 }else if (!!col.name) {//具有name标识的
							var $div = $td.children(".grid-td-div"),
								sourceData = utilFn.getDeepVal(rowData,col.sourcekey),//原始数据
								insertHtml = utilFn.getDeepVal(rowData,col.name);//单元格文本
							if(col.fmt){
								insertHtml = col.fmt.apply(grid, [insertHtml,$td,rowData]);
							}
							// if (sourceData) {//插入排序数据
							// 	$td.attr("data-sourcedata",sourceData);
							// }
							$div.html(insertHtml);//插入显示数据
					 }
				});

				row.dom = $rows;//dom归入row
				return $rows;
			}
		var onChk = function (e) {
			var $chk = $(this),
					$td = $chk.parents("td"),
					$row = $chk.parents("tr"),
					row = $row[0]._row;
			row.chk = this.checked;
			opts.table.onChecked.call(grid,row.dom,$td,row.data,this.checked);
			e.stopPropagation();
		}
		var onChkAll = function () {
			var $t = $(this),
					self = grid;
			self.$element.find("[data-checkbox] :checkbox").not(this).each(function(i,ele){
				ele.checked = $t[0].checked;
				var row = $(ele).closest("tr")[0]._row;
				row.chk = ele.checked;
				// $(ele).trigger('click');
			});
			opts.table.onCheckedAll.call(grid,$t[0].checked);
		}
		var onRowClick = function () {
			var $row = $(this),
					$grid = grid.$element,
					row = this._row,
					$rows = row.dom;
			$grid.find("tr.selected").not($rows).removeClass("selected");
			$rows.toggleClass("selected");
			opts.table.onRowClick($rows,row.data);
		}
		var onRowEnter = function () {
			var $row = $(this),
					row = this._row,
					$rows = row.dom;
			$rows.addClass('hover');
			opts.table.onRowEnter($rows,row.data);
		}
		var onRowLeave = function () {
			var $row = $(this),
					row = this._row,
					$rows = row.dom;
			$rows.removeClass('hover');
			opts.table.onRowLeave($rows,row.data);
		}
		var onColSort =function () {
			var self = grid,$head = grid.header.dom,
					$prevSort = $head.find('div.asc,div.desc'),
					$div = $(this),
					col = $div.parents('td')[0]._col,
					row = $div.parents('tr')[0]._row;
			if ($prevSort.length && $prevSort[0] != this) {//不是同个排序列时
				$prevSort.parents('td')[0]._col.sortFlag = 0;//重置col状态
				$prevSort.removeClass('asc desc');
			}
			if ($div.hasClass('asc')) {//到降序
				col.sortFlag = 2;
				$div.removeClass('asc').addClass('desc')
			}else if ($div.hasClass('desc')) {//到常序
				col.sortFlag = 0;
				$div.removeClass('desc')
			}else {//到升序
				col.sortFlag = 1;
				$div.addClass('asc')
			}

			colSort(col,row);
		}
		var colSort = function (col,row) {
			var self = grid,
					sortKey = col.sourcekey || col.name,
					rows = self.rows,flag,
					sortFlag = col.sortFlag;
			rows = rows.sort(function(currRow,nextRow) {
				var currVal = currRow.index, nextVal = nextRow.index;
				if (sortKey && sortFlag != 0) {
					currVal = utilFn.getDeepVal(currRow.data,sortKey)+'' || currRow.index;
					nextVal = utilFn.getDeepVal(nextRow.data,sortKey)+'' || nextRow.index;
				}
				if (!isNaN(currVal) && !isNaN(nextVal)) {
					currVal = Number(currVal),nextVal = Number(nextVal);
					var f = sortFlag == 2 ? currVal > nextVal : nextVal > currVal  ;
					if(nextVal == currVal){
						flag = 0;
					}else{
						flag = f ? -1 : 1;
					}
				}else {
					flag = sortFlag == 1 ? nextVal.toString().localeCompare(currVal.toString()) : currVal.toString().localeCompare(nextVal.toString())
				}
				return flag;
			})
			self.rows = rows;
			renderData(true);
		}
		var hideCol = function (col) {
			if (!!!col) return;//不存在则跳出
			var self = grid;
			if (!!col._col) {//判断传入的是td还是col对象，td则直接获取col
				col = col._col//获取col对象
			}
			var $headTd = col.dom;//获取表头td
			col.visible = false;//col状态置为false
			$headTd.addClass("grid-ele-hidden");//表头td添加隐藏样式
			renderData(true);
			renderExtData();
		}
		var showCol = function (col) {
			if (!!!col) return;//不存在则跳出
			var self = grid;
			if (!!col._col) {//判断传入的是td还是col对象，td则直接获取col
				col = col._col//获取col对象
			}
			var $headTd = col.dom;//获取表头td
			col.visible = true;//col状态置为false
			$headTd.removeClass("grid-ele-hidden");//表头td添加隐藏样式
			renderData(true);
			renderExtData();
		}
		var toggleColListVisible = function () {
			var list = grid.header.colList;
			$.each(list,function(idx, col) {
				if(!col.visible){
					col.dom.addClass("grid-ele-hidden");//表头td添加隐藏样式
				}else{
					col.dom.removeClass("grid-ele-hidden");
				}
			});
			renderData(true);
			renderExtData();
		}
		var setColFormatter = function () {//通过参数设置列格式化函数
			if (!!!opts.colFormatter) return;
			var fmtMap = opts.colFormatter;
			for (var colName in fmtMap) {
				if(!!grid.colMap[colName] && typeof(fmtMap[colName]) == 'function'){
					var col = grid.colMap[colName];
					col.fmt = fmtMap[colName];
				}
			}
		}
		var setTitle = function(title){
	    var self = grid,
	    	$grid = self.$element,
	    	$title = $grid.find(".grid-title");
			grid.title = $title
	    // $title.empty();
      // $title.toggle(!!title);
			var $titleContent = $("<div class='grid-title-content'></div>").appendTo($title);
			$titleContent.html(title);
			if (opts.colOpera) {//colOperaTrigger
				addTitleOperaBtn('grid-col-prompt-trigger',"列操作",opts.colOperaClass,$title)
			}
			if (opts.gridQuery) {//gridQueryTrigger
				addTitleOperaBtn('grid-query-trigger',"行过滤",opts.gridQueryClass,$title)
			}
		};
		var addTitleOperaBtn = function (className,tip,extClass,$title) {
			var $titleOpera = $("<div class='grid-title-opera'></div>").appendTo($title);
			var $trigger = $("<span>").addClass(className).appendTo($titleOpera).prop("title",tip);
			if(opts.colOperaClass && opts.colOperaClass.length){
				$trigger.addClass(extClass)
			}else {
				$trigger.addClass('def')
			}
		}
		var onColPromptShow = function () {
			var self = grid,
				$grid = self.$element,
				$prompt = $grid.find(".grid-col-prompt"),
				$promptContent = $prompt.find(".grid-col-prompt-content").empty(),
				$colList = get$ColList().appendTo($promptContent),
				colList = grid.header.colList,
				fixedCols = grid.header.colMap.fixedCols,
				dataCols = grid.header.colMap.dataCols;
			$prompt.toggleClass('active');
			opts.onColPromptShow.apply(gridlist, [colList,fixedCols,dataCols]);
		}
		var onColPromptCheck = function (event) {
			var self = grid,
				currChk = event.target,
				flag = false,
				$grid = self.$element,
				$prompt = $grid.find(".grid-col-prompt"),
				$promptContent = $prompt.find(".grid-col-prompt-content");
			$promptContent.find(".grid-col-prompt-chk").each(function(i, chk) {
				if(chk.checked){
					flag = true;
					return false;
				}
			});
			if (!flag) {//至少选一项
				currChk.checked = true;
			}
			event.stopPropagation();
		}
		var onColPromptCheckAll = function (event) {
			var self = grid,
				chkAll = event.target,
				$grid = self.$element,
				$prompt = $grid.find(".grid-col-prompt"),
				$promptContent = $prompt.find(".grid-col-prompt-content");
			$promptContent.find(".grid-col-prompt-chk").each(function(i, chk) {
				chk.checked = chkAll.checked;
			});
		}
		var onColPromptSubmit = function () {
			var map = onColPromptSave();
			opts.onColOperaSubmit.apply(gridlist, [map.colList,map.fixedCols,map.dataCols]);
		}
		var onColPromptSave = function () {
			var self = grid,
				$grid = self.$element,
				$prompt = $grid.find(".grid-col-prompt"),
				$promptContent = $prompt.find(".grid-col-prompt-content"),
				colList = [],//新的表头集合
				fixedCols = [],
				dataCols = []
			$promptContent.find(".grid-col-prompt-li").each(function (i,li) {
				var col = li._col,$li = $(li);
				col.visible = $li.find(".grid-col-prompt-chk")[0].checked;
				colList.push(col);
				if (col.fixed) {
					fixedCols.push(col);
				}else {
					dataCols.push(col);
				}
			})
			$prompt.removeClass('active');
			grid.header.colMap.fixedCols = $.extend(true, [],fixedCols);
			grid.header.colMap.dataCols = $.extend(true, [],dataCols);
			grid.header.colList = getColList();
			renderHead(grid.header);
			toggleColListVisible();
			return {
				colList : colList,
				fixedCols : fixedCols,
				dataCols : dataCols
			}
		}
		var onColPromptCancel = function () {
			var self = grid,
				$grid = self.$element,
				$prompt = $grid.find(".grid-col-prompt");
			$prompt.removeClass('active');
		}
		var onColPromptSelected = function (event) {
			var $li = $(event.target),
					$grid = grid.$element,
					$promptContent = $grid.find(".grid-col-prompt-content");
			if($li.closest('.grid-col-prompt-li').length){
				$li = $li.closest('.grid-col-prompt-li');
			}
			$li.siblings('.active').removeClass('active');
			$li.toggleClass('active');
		}
		var onColPromptMoveUp = function (event) {
			var $grid = grid.$element,
					$promptContent = $grid.find(".grid-col-prompt-content"),
					$li = $promptContent.find(".grid-col-prompt-li.active");
			if (!$li.length) return;
			var	$prev = $li.prev(),
					col = $li[0]._col;
			if ($prev.length && $prev.is(":visible") &&!($prev[0]._col.fixed && !col.fixed )) {
				$li.insertBefore($prev);
			}
		}
		var onColPromptMoveDown = function (event) {
			var $grid = grid.$element,
					$promptContent = $grid.find(".grid-col-prompt-content"),
					$li = $promptContent.find(".grid-col-prompt-li.active");
			if (!$li.length) return;
			var	$next = $li.next(),
					col = $li[0]._col;
			if ($next.length && $next.is(":visible") && !(!$next[0]._col.fixed && col.fixed )) {
				$li.insertAfter($next);
			}
		}
		var get$ColList = function () {
			var self = grid,
					list =  self.header.colList,
					$ul = $("<ul>");
			$.each(list,function(i, col) {
				if(col.isChk || col.isNum) return true;
				var $li = $("<li>").appendTo($ul).addClass('grid-col-prompt-li'),
						$chk = $("<input>").attr("type","checkbox").appendTo($li).addClass('grid-col-prompt-chk'),
						$label = $("<label>").text(col.headerLabel).appendTo($li).addClass('grid-col-prompt-label')
				$chk[0].checked = col.visible;
				$li[0]._col = col;
				if (col.fixed) {
					$li.addClass('fixed')
				}
				if (col.unmovable) {
					$li.addClass('unmovable')
				};
			});
			return $ul;
		}
		var getColList = function (header) {
			var header = header || grid.header,
					colMap = header.colMap,
					colList = [];
			if (opts.table.checkbox) {
				colList.push(colMap.chkCol)
			}
			if (opts.enableNum) {
				colList.push(colMap.numCol)
			}
			colList = colList.concat( header.colMap.fixedCols)
			colList = colList.concat( header.colMap.dataCols)
			$.each(colList,function(idx, col) {
				col.currIndex = idx;
			});
			return colList;
		}
		var buildTdByPCol = function (col) {
			var $td = $("<td>");
			for(var key in col){
            switch(key){
            case "headerLabel":
            case "text":
                $td.text(col[key]).attr("title",col[key]);
                break;
						case "formatter":
								if (typeof(col[key]) == "function") {
									$td[0].fmt = col[key];
									break;
								}
            default:
								var value = col[key];
								if(typeof(col[key]) == "boolean" ){
									value = col[key]? "true" : "false";
								}
                $td.attr("data-"+key,value);
                break;
            }
        }
			return $td;
		}
		var colResize = function() {
			var self = grid,
				$wraper = self.$element,
				$head = $wraper.find("[class^=grid-head-]"),
				$tdList = $head.find("td[data-dragable]"),//可拖拽的列
				isDraging = false,//是否在拖拽状态
					$currTd,
					dragX;//上次鼠标的位置
			if(!$tdList.length) return;//若无可拖拽列，则跳出
			$tdList.each(function (i,ele) {
				var $td = $(this);
				$("<div class='grid-resize-Handler'></div>").appendTo($td)
			})
			//清除之前绑定的事件
			$head.off(".drag");
			$wraper.off(".drag");
			//绑定事件
			$head.on("mousedown.drag",".grid-resize-Handler",function(e){
					startDrag(e);
					e.stopPropagation();
			})
			$wraper.on({
					"mousemove.drag":function(e){
							draging(e);
					},
					"mouseleave.drag":function(e){
							endDrag(e);
					},
					"mouseup.drag":function(e){
							endDrag(e);
					}
			})

			//开始拖拽
			var startDrag = function(e){
					if(isDraging) return;
					isDraging = true;
					$currTd = $(e.target).parents("td");//当前td
					dragX = e.clientX || e.pageX;
					document.body.onselectstart = function(){return false};//禁止浏览器默认选中行为
					e.stopPropagation();
			}
			//结束
			var endDrag = function(e){
					if(!isDraging) return;
					isDraging = false;
					document.body.onselectstart = function(){return true};//解除浏览器默认选中行为
					e.stopPropagation();
			};
			//拖拽中
			var $gridData = $wraper.find(".grid-body .grid-data");  //右半边表格，需要在draging中判断其宽度
			var draging = function(e){
					if(!isDraging) return;
					var X = e.clientX || e.pageX;
					var w = X-dragX;
				if($gridData.outerWidth() < 120 && w > 0)
					return ;
					resizeCol($currTd,w);
					dragX = X;
					_refreshScroll();
					_aynScrollLeft();//同步上下容器滚动偏移
					e.stopPropagation();
					e.preventDefault();
			};

			var resizeCol = function($td,w){
				var $div = $td.children("div.grid-td-div"),
						col = $td[0]._col,
						row = $td[0]._row;;
				$div.width($div.width()+w);
				w = $div.width();
				var $bodyTable = $td.parents(".grid-table-wraper").find("table tr");
				var $sameColDiv = $bodyTable.find("td:eq("+$td.index()+")").not($td).children("div.grid-td-div");
				$sameColDiv.width(w);
				col.width = w;
			};
		};
		var onGridQuery = utilFn.debounce(function (evt) {
			var self = grid,
					$inp = $(evt.target),
					val = $inp.val(),
					rows = queryRowsByKeyword(val)
			if (!!val) {
				renderDataByRows(rows);
			}else {
				renderData(true);
			}
		},800)
		var onGridQueryClear = function () {
			var self = grid,
					$grid = self.$element,
					$inp = $grid.find('.grid-query-inp');
			$inp.val("").trigger('keyup');
		}
		var queryRowsByKeyword = function(keyword){
				var self = grid,
						rows = self.renderRows,
						outRows = [];
				$.each(rows,function(i, row) {
					if (!!row.queryText && row.queryText.indexOf(keyword)>-1) {
						outRows.push(row);
					}
				});
				return outRows;
		}
		var resizeGrid = function () {
			var self = grid,
				$grid = self.$element,
				$looseEle = $grid.find("[class^=grid-body-]"),
				$gridBody = $grid.find(".grid-body"),
				looseHeight,
				gWraperHeight = ~~opts.height,
				maxHeight = ~~opts.maxHeight;
			if(Boolean(opts.table["fullMode"])){
				var isBodyFull = $("body").height() == $(window).height();//body是否填满window
				var style,$div;//临时style样式及计算高度div
				if(!isBodyFull){//body不填满window的话，临时加个style样式使body填满页面
					var rule = "margin:0;padding:0;width:100%;height:100%;overflow:hidden;position: relative;";
					var sheet = (function() {
							style = document.createElement("style");
							style.appendChild(document.createTextNode(""));
							document.head.appendChild(style);
							var insertedStylesheet = style.sheet || style.styleSheet;
							return insertedStylesheet;
					})();
					function addCSSRule(sheet, selector, rules, index) {
							try{
									if("insertRule" in sheet) {
									sheet.insertRule(selector + "{" + rules + "}", index);
									}
									else if("addRule" in sheet) {
											sheet.addRule(selector, rules, index);
									}
							}catch(e){
									console.log(e)
							}
					}
							addCSSRule(sheet, "html,body", rule,0);
					}
					//创建临时div块，使其top跟grid一致，然后使其bottom至底，即得其高度(bottom:12px,其中距底为10px，再加上纵向边框高度2px)
					$div = $("<div>").appendTo(document.body).css({"position":"absolute","top":$grid.offset().top,"bottom":2,"left":0,"right":0})
					var sumHeight = Math.floor($div.height()); //向下取整
					$grid.parents().each(function(i,ele){
							var $ele = $(ele);
							var diff = $ele.outerHeight()-$ele.height()
							sumHeight -= diff/2;
					})
					//把临时铺满高度赋给grid
					// $grid.height(Math.floor(sumHeight));
					gWraperHeight = Math.floor(sumHeight);
					//回收临时div块及style
					$div.remove();
					!isBodyFull && $(style).remove();
			}

			if (!!maxHeight && maxHeight > 0) {
				gWraperHeight = maxHeight;
			}

			looseHeight = ~~(gWraperHeight - getSiblingsHeight($looseEle.filter(".grid-body-data")) - getSiblingsHeight($gridBody));

			if (!!maxHeight && maxHeight > 0) {
				var $scrollEle = $looseEle.find('.grid-body-scrollEle');
				if (!$scrollEle.length) {
					$scrollEle = $looseEle;
				}
				var scrollHeight = $scrollEle[0].scrollHeight;
				if (looseHeight > scrollHeight) {
					looseHeight = scrollHeight
				}
			}

			if (!!looseHeight && looseHeight > 0) {
				$looseEle.height(looseHeight);
			}else {
				$looseEle.height('auto');
			}




			// $looseEle.height(!!looseHeight ? looseHeight : 'auto');
			$grid.width(opts.width);
			_refreshScroll();
		}
		var getSiblingsHeight = function ($ele) {
			var _height = 0;
			$ele.siblings().not(function () {
				if ($(this).css("position") == "absolute") {
					return $(this);
				}
			}).each(function(i,ele){_height +=$(this).outerHeight()})
			return _height;
		}
		var onGridQueryShow = function (evt) {
			var self = grid,
					$grid = grid.$element,
					$gridQuery = $grid.find('.grid-query'),
					$trigger = $(evt.target);
			$gridQuery.toggleClass('active');
		}
		var resetGridQuery = function () {
			var self = grid,
					$grid = self.$element,
					$inp = $grid.find('.grid-query-inp');
			$inp.val("")
		}
		// --------------------------------------------------------------------------------------
		var Cell = function ($td) {
			var self = this;
			self.id;
			self.col = $td[0]._col;
			self.row = $td[0]._row;
			self.dom = $td;
			self.sortData = utilFn.getDeepVal(self.row.data,self.col.sourcekey);
			self.data = utilFn.getDeepVal(self.row.data,self.col.name);
			$td[0]._cell = self;
		}
		var Col = function ($td,idx) {//通过td创建的col
			var self = this;
			self.dom = $td;
			self.index = idx;//初始列位置
			self.currIndex = self.index;//当前列位置
			self.enable = true;//列使能
			self.sortFlag = 0;//0 常序，1 升序，2 降序
			self.name = $td.data('name');//列标识
			self.id = $td.data('id') || self.name;//todo 参数需要追加data-id
			self.align = $td.data('align');
			self.width = $td.data('width') || $td[0].clientWidth;
			self.sourcekey = $td.data('sourcekey');
			self.fmt = (function () {
				var fn;
				if (self.dom && self.dom[0].fmt) {
					fn = self.dom[0].fmt;
				}else {
					try {
						fn = eval("window." + $td.data("fomatter"));
					} catch (e) {
						console.log("Invalid fomatter on col:"+ self.id);
					}
				}
				return fn;
			})();
			self.fixed = (function () {
				var id = self.id,
				fixedlist = grid.opt.fixedTable.fixedColName;
				return fixedlist.join(",").indexOf(id) > -1 || $td.is("[data-fixed]");
			})();
			self.unmovable = false,//为true时不可在prompt中编辑
			self.visible = !!!eval($td.data("hide"));
			// self.sortable = !!$td.data("sort") && !!eval($td.data("sort"));
			self.sortable = !!$td.is("[data-sort]") || !!$td.is("[data-sortable]");
			self.dragable = !!$td.data("dragable") && !!eval($td.data("dragable"));
			self.text = $td.data("text") || $td.text();
			self.headerLabel = self.text;
			if($td.is("[data-checkbox]")){
				self.fixed = true;
				self.isChk = true;
				self.dragable = true;
				self.unmovable = true;
			}else if ($td.is("[data-number]")){
				self.fixed = true;
				self.isNum = true;
				self.dragable = true;
				self.unmovable = true;
			}else if($td.is("[data-opera]")){
				self.isOpera = true;
				self.dragable = true;
				self.operakey = $td.data('operakey');
				self.name = self.operakey;
			}
			$td[0]._col = self;
			grid.colMap[self.id] = self;
		}
		var PCol = function (param,idx) {
			// var def = {
			// 	index : idx,
			// 	enable : true,//列使能
			// 	sortFlag : 0,//0 常序，1 升序，2 降序
			// 	name : "col"+ creatGId(),//列标识
			// 	id : name,//todo 参数需要追加data-id
			// 	align :  "center",//left center right
			// 	width :  50,
			// 	sourcekey : '',
			// 	headerLabel : '',
			// 	fmt : new Function(),
			// 	fixed : false,
			// 	visible : true,
			// 	sortable : false,
			// 	dragable : false
			// }
			// var $td = buildTdByPCol($.extend({}, def, param || {}));
			var $td = buildTdByPCol(param);

			return new Col($td,idx);
		}
		var Row = function (rowdata,i) {
			var self = this;
			self.id;
			self.data = rowdata;
			self.dom;
			self.index = i;
			self.cells = [];
			self.chk = !!utilFn.getDeepVal(rowdata,opts.table.checkboxName);
			self.queryText;
			self.isExt = false;
		}
		var Grid = function () {
			var self = this;
			self.data = opts.table.data;//缓存的数据集合
			self.extData = opts.extTable.data;//缓存的数据集合
			self.rows = [];//行集合
			self.extRows = [];//当前渲染的行集合
			self.opt = {
				table : opts.table,
				extTable : opts.extTable,
				fixedTable : opts.fixedTable
			}
			self.promise;//缓存异步对象
			self.renderRows;//当前渲染的行集合
			// self.renderData;//渲染的缓存数据集合
			self.loading;
			self.$element;//dom
			self.gid = creatGId();//表格标识
			self.header;//表头对象
			self.$rowClone;//复制行
			self.page;
			self.colMap = {};//列MAP
		}

		// --------------------------------------------------------------------------------------
		var grid = new Grid();

		init(opts);
		// console.log(grid)

		// --------------------------------------------------------------------------------------
		function GridList(){
			// this.data = opts.table.data;

		}

		GridList.prototype.setTitle = function(title){
		  var $title = grid.title;
			$title.html(title);
		};
		GridList.prototype.clearAllData = function(){//清除所有数据,包括汇总行
      var self = grid;
      clearData();
      clearExtData();
    };
		GridList.prototype.setTable = function(option){
			var self = grid,
				tableOpt = self.opt.table
			self.opt.table = $.extend({},tableOpt,option)
		}
		GridList.prototype.setPage = function(option){
			var self = grid,
				pageOpt = self.page
			self.opt.page = $.extend({},pageOpt,option)
		}
		GridList.prototype.getCheckedRow = function(){
			var self = grid,$grid = self.$element,
				checkedObj = {rows:[],rowDatas:[]},$checkedTds = $grid.find("[class^=grid-body-] td:has(:checkbox:checked)");
			$checkedTds.each(function(i,ele){
				var row = $(this).parents("tr")[0]._row;
				checkedObj["rows"].push(row.dom);
				checkedObj["rowDatas"].push(row.data);
			})
			return checkedObj;
		}
		GridList.prototype.loadData = function(reSize){//更新grid的table参数,重新加载数据
			var self = grid;
			self.page.sizeFresh=reSize||0;
			loadData();
		};
		GridList.prototype.refreshExtData = function(){
			var self = grid;
			renderExtData();
			resizeGrid();
		};
		GridList.prototype.updateData = function(data){
			if(!data){
				console.log("no data");
				return false;
			}
			var self = grid;
			// self.opt.table.data = data;
			self.data = data;
			loadData();
		};
		GridList.prototype.updateExtData = function(data){
			if(!data){
				console.log("no data");
				return false;
			}
			var self = grid;
			self.extData = data;
			self.extRows = creatRow(self.extData);
			renderExtData();
		};
		GridList.prototype.showCol = function(){
			showCol.apply(grid,arguments);
		}
		GridList.prototype.hideCol = function(){
			hideCol.apply(grid,arguments);
		}
		GridList.prototype.hideOperaCol = function(){
			var self = grid,
					cols = self.header.colMap;
			$.each([].concat(cols.fixedCols,cols.dataCols),function(i, col) {//遍历所有列
				if (col.isOpera) {//对操作列进行隐藏
					hideCol(col)
				}
			})
		}
		GridList.prototype.hideRow = function($td){
			var self = grid,
				$grid = self.$element,
				row = $td.parents("tr")[0]._row;
			row.dom.addClass("grid-ele-hidden");
			resizeGrid();
		}
		GridList.prototype.showRow = function($td){
			var self = grid,
				$grid = self.$element,
				row = $td.parents("tr")[0]._row;
			row.dom.removeClass("grid-ele-hidden");
			resizeGrid();
		}
		GridList.prototype.isVisible =function(){
		    return _isVisible.apply(grid,arguments);
		}
		GridList.prototype.clearExtData = function(){}
		GridList.prototype.getCols = function(){
			var self = grid;
			return self.header.colList;
		}
		GridList.prototype.setCols = function (newCols) {
			var self = grid;
					header = self.header,
					colList = header.colList,
					newColList = [],newFixedList = [], newDataList = [],
					tempColMap = {};
			$.each(colList,function(i, col) {//建立临时map，方便查找
				var id = col.id || col.name;//列标识
				if (id) {
					tempColMap[id] = col;
				}
			});
			$.each(newCols,function(i, nCol) {//遍历列配置集合
				var id = nCol.id || nCol.name;//列标识
				if (!id)  return true;
				var col = tempColMap[id];
				if (!col)  return true;//continue
				col.visible = nCol.visible;//显示状态
				col.currIndex = nCol.currIndex;
				if(col.fixed){
					newFixedList.push(col);
				}else {
					newDataList.push(col)
				}
				newColList.push(col)
			});
			header.colMap.fixedCols = newFixedList;
			header.colMap.dataCols = newDataList;
			header.colList = getColList();
			renderHead(header);
			toggleColListVisible();
		}
		GridList.prototype.setHeader = function (newCols) {
			var self = grid;
					header = self.header,
					colList = header.colList,
					newColList = [],newFixedList = [], newDataList = [],
					tempColMap = {};
			$.each(colList,function(i, col) {//建立临时map，方便查找
				var id = col.id || col.name;//列标识
				if (id) {
					tempColMap[id] = col;
				}
			});
			$.each(newCols,function(i, nCol) {//遍历列配置集合
				var id = nCol.id || nCol.name;//列标识
				if (!id)  return true;
				var col = new PCol(nCol)
				if(col.fixed){
					newFixedList.push(col);
				}else {
					newDataList.push(col)
				}
				newColList.push(col)
			});
			header.colMap.fixedCols = newFixedList;
			header.colMap.dataCols = newDataList;
			header.colList = getColList();
			setColFormatter();
			renderHead(header);
			colResize();
			toggleColListVisible();
		}
		GridList.prototype.getDom = function () {
			return grid.$element;
		}
		GridList.prototype.getSorceTable = function () {
			return $table;
		}
		GridList.prototype.getOptions = function () {
			return opts;
		}

		var gridlist = new GridList();
		$table.data()["grid"] = gridlist;
		opts.onComplete.apply(gridlist,[self.$element]);
		return gridlist;
	}
	$.fn.gridList.setDefault = function(option){
		setting = $.extend(true,{},setting,option);
	}
})(jQuery)

module.exports = jQuery;
