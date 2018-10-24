[{
    "account": "17602002858",
    "identity": "%08%01%01F%C2%ACy%C3%ADR%00R%05bsvrq%0083w%00OcwoomU.wbUaoiqtoivabnb.Oy8doaycDcyoFuynvt8.FayuRtDho.ReOnbtwiRtoyv.DAUu8tDobLyoqgviOnoI8dyevnRt8iDfOyo%00v%00U%00w%00q%00y%00q%00q%01U%03w%00U%04wIU%00o%06ygwaqmweUIRdRJR%00O%04qtFiUmveyLy%00U%07FaOcycqo8uRnytvt8%008%12DLDjoaFv8ao%2F8lUaon8gD%2FvS8t8rqi8nogb%3BbLF%00F%03qpFwydRqv%008%7EU%00y%01RxFp8%00w%01q%C2%86o%C2%AEy%00F%00O%01yfR%C2%9F8%C2%BFv%C2%A2o%07Ftb%00O%0By4y%3A89O3U5o3O3R5q%3BO8q%3Bqtb%00v+oi86R3q7vfb7F8bgq68%3Aq%3Ab%3BUeofO6wfF%3AD48e8i86v683vhD%3By%3Bo4bfDgo6OiOeUx%00%00"
}, {
    "account": "openId_qqLogin",
    "openId": "openId_qqLogin",
    "type": 2,
    "identity": "%05%02%02us%C2%AC%C3%ADjP%00%05aus%0255r%00aA3cAcomPZ.bPuaipPtiP5an5j.yZZda5Acc0uou00nt0u.accutaPh.u0entptiaAtyuj.AjuutPsoLA0ogpPinZaIdPpena0tiAtfyts%00%00ap%00%00Zj%00%000a%00%01Pt%03%00Aj%04IPs%00%06u0ga0tme5jIdppJ%00Pa%04tcaima5eLtP%00%07ssacpPcoPcunu5tt5A%00%12cjLjj0avpsa%2F0Zlajjngau%2FSAstrPcinjag%3BZ5L%000j%03pPcwdZsq%005c%7E%00At%01xtcp%00tA%01%C2%86cZ%C2%AE%005j%00%01p0f%C2%9FtP%C2%BC%C2%B4sP%1CtPa%00%0EpprstjhqptLg00bttPtOsprjptlqPpt%00s0+5pahhaphhtci5aaeg50%3Bept%3Besseh0Pi8Pp5gZPe6u5h%3CZt3%3BZA%3B7Aa%3Bhuje4audx%00%00",
    "token": "8e804499-4161-4a0c-b987-e26f71201e5e1540278236188",
    "baitianId": 8302,
    "isThirdParty": true
}, {
    "account": "openId_weiboLogin",
    "openId": "openId_weiboLogin",
    "type": 3,
    "token": "b68db187-c4ca-42da-ba15-60617465dfa11540278233015",
    "baitianId": 9501,
    "isThirdParty": true
}]

Site.addView("ValidBtn", View.extend({
	initState: function(){
		return {
			status: "init"
		}
	},
	initialize: function(conf){
		$.extend(this.props, conf.props);
		this.props.MaxCount = 60;
		this.props.defaultTxt = this.$el.text();
		this.$input = conf.input;
		this.$el.click($.proxy(this.btnClick, this));
		this.doAjaxing = false;
		this.conf = conf;
	},
	btnClick: function(){
		var self = this;
		var phone = this.$input.val();

		if(this.state.status == "init"){
			if(Site.isPhoneNum(phone)){
				if(this.doAjaxing == false){
					this.doAjaxing = true;
					try{
						bt.track("common_activity",{//事件统计 flash加载时间
							eventId: "101053",
							colA: window.Site.version
						});
					}catch(e){}


					var params = {
						mobile: phone
					}
					var extParams = {};
					if($.isFunction(this.props.params)){
						extParams = this.props.params();
					}else{
						extParams = this.props.params;
					}
					$.extend(params, extParams);


					Site.ajax.post({
						url: this.props.url,
						params: params,
						success: function(data){
							self.doAjaxing = false;
							self.conf.extendSuccess&&self.conf.extendSuccess(data);
							self.setState({status: "running"});
						},
						error:function(){
							self.doAjaxing = false;
						},
						complete:function(){
							self.doAjaxing = false;
						},
						fail: function(data){
							try{
								bt.track("common_activity",{
									eventId: "101054",
									colA: window.Site.version,
									colB:data.resultCode.msg
								});
							}catch(e){}
							self.doAjaxing = false;
						}
					});
				}
			}else{
				Site.tip("请输入正确的手机号码");
			}
		}
	},
	updateView: function(){
		var html = "",
			MaxCount = this.props.MaxCount,
			status = this.state.status;
		if(status == "init"){
			html = this.props.defaultTxt;
			this.$el.removeClass("disabled").html(html);
		}else if(status == "running"){
			this.updateCount();
			this.$el.addClass("disabled");
		}
	},
	updateCount: function(){
		var count = this.props.MaxCount,
			self = this;
		this.timer = setInterval(_update, 1000)
		function _update(){
			html = "重发（"+count+"）";
			self.$el.html(html);
			if(count <= 0){
				self.reset();
			}
			count--;
		}
		_update();
	},
	reset: function(){
		clearInterval(this.timer);
		this.timer = null;
		this.setState({status: "init"});
	}
}));
Site.addView("DownSelect", View.extend({
	initialize: function(conf){
		var self = this;
		this.labelName = conf.labelName;
		this.selectedIndex = conf.selectedIndex || 0;

		$("body").on('click', function(e) {
			var target = $(e.target);
			self.closeList(target);
		});

	},
	closeList: function(target){
		var $select = this.$(".select-wpr");
		var $source = this.$(".source-list");
		var condition1 = $.contains($select[0], target[0]);
		var condition2 = $.contains($source[0], target[0]);
		var condition3 = $select.css('display') != 'none';
		var condition4 = target.hasClass("select-cross");
		if (!condition1 && !condition2 && condition3 && !condition4) {
			//alert(!condition1 + " " + condition2 + " " + condition3 + " "+condition4);
			$source.hide();
		}
	},
	afterInit: function(){
		this.setValue(this.selectedIndex);
	},
	events: {
		"click@.select-wpr": "toggleUl",
		"click@li": "selectValue",
		"click@.select-cross": "removeValue"
	},
	render: function(){
		var html = '<div class="select-wpr"><div class="select-icon down"><svg class="icon"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M941.3 274.8c-24.5-25.5-65.5-25-90.5 0L512 613.6 173.3 274.8c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5l384 384.1c12.1 13.7 53.9 34.2 90.5 0l384-384.1c19.1-18.1 30.1-59.1 0-90.5z" fill="#dddddd" /></div></div>'
			+ '<ul class="source-list" style="display:none;"></ul>';

		this.$el.append(html);
		this.showUserLi();

	},
	addItem: function(source, index){
		if(source == -1)
			return '';
		return '<li data-index="'+index+'">'+source[this.labelName]+'<div class="select-cross">X</div></li>';
	},
	toggleUl: function(e){
		e.stopPropagation();
		if($('.source-list').css("display") != "none"){
			this.showUserLi().hide();
		}else{
			try{
				bt.track("common_activity",{
					eventId: "101014",
					colA: window.Site.version
				});
			}catch(e){}
			this.showUserLi().show();
		}
	},
	showUserLi: function(){
		var listHtml = "",
			$sources = $(".source-list");

		if(!!Site.clientUserInfo.ext.recentUsers){
			for(var i = 0, leni = Site.clientUserInfo.ext.recentUsers.length; i < leni; i++){
				listHtml += this.addItem(Site.clientUserInfo.ext.recentUsers[i], i);
			}
		}
		if(listHtml == ""){
			listHtml = '<li data-index="-1">暂无用户</li>';
		}
		$sources.html(listHtml);

		return $sources;
	},
	selectValue: function(e){
		var $node = $(e.target),
			$li = $node.closest("li"),
			index = $li.data("index");
		this.setValue(index)
		this.$(".source-list").hide();
	},
	setValue: function(index){
		if(!!Site.clientUserInfo.ext.recentUsers&&index > -1 && Site.clientUserInfo.ext.recentUsers[index] && Site.clientUserInfo.ext.recentUsers[index] != -1){
			this.selectedIndex = index;
			this.selectedValue = Site.clientUserInfo.ext.recentUsers[index];
			var self = this;
				self.$el.find("input").val(self.selectedValue[self.labelName]);
				self.$el.parent().find(".loginPassword").val("66666666")
			this.isAutoLogin = true;
			this.$el.parent().find(".captcha-row").hide()
			this.trigger("select:value", this.selectedValue);

		}else{
			this.selectedIndex = -1;
			this.selectedValue = null;
			this.$el.find("input").val("");
			this.$el.parent().find(".loginPassword").val('')
			this.isAutoLogin = false;
		}
		return this;
	},
	removeValue: function(e){
		e.stopPropagation();
		var $node = $(e.target),
			$li = $node.closest("li"),
			index = $li.data("index");
		if(Site.clientUserInfo.ext.recentUsers[index] && Site.clientUserInfo.ext.recentUsers[index] != -1){
			var value = Site.clientUserInfo.ext.recentUsers[index];
			$li.remove();

			var visitorInfo = Site.ls.get("visitorInfo");//删除游客
			if(visitorInfo.visitor&&value.account==Site.ls.get("visitorInfo").visitor.account){
				Site.ls.add("visitorInfo", {/*游客登录保存账号信息*/
					visitor: "null",
					time: "null"
				});
			}

			this.trigger("remove:value", value);
		}
		if(index == this.selectedIndex){
			this.setValue(-1);
		}
		this.showUserLi().show();
		return this;
	}
}));

Site.addView("Confirm", View.extend({
	events: {
		"click@.no-btn": "toNo",
		"click@.yes-btn": "toYes"
	},
	initialize: function(conf){
		this.msgHtml = conf.msgHtml || "";
		this.yes = conf.yes || null;
		this.no = conf.no || null;
	},
	toYes: function(e){
		if(this.yes){
			this.yes(e)
		}else{
			this.hide()
		}
	},
	toNo: function(e){
		if(this.no){
			this.no(e)
		}else{
			this.hide()
		}
	},
	hide: function(){
		if($(document).find("body").hasClass("bodyShadow")){
			this.$el.find(".localtion-layer").hide()
			$(document).find(".shadow-layer").hide()
			$(document).find("body").removeClass("bodyShadow")
		}
	},
	show: function(){
		var self = this;

		if(this.yes==null){
			setTimeout(function(){//兼容安卓闪屏问题
				self.showAction();
			},1000)
		}else{
			this.showAction();
		}
	},
	showAction: function(){
		if(!$(document).find("body").hasClass("bodyShadow")){
			this.$el.find(".localtion-layer").show()
			$(document).find(".shadow-layer").show();
			$(document).find("body").addClass("bodyShadow")
		}
	},
	changeMsg: function(txt){
		this.$el.find(".content-text").text(txt);
	},
	render: function(){
		if(!!$(document).find(".shadow-layer")){
			this.$el.append('<div class="shadow-layer" style="display: none;z-index:100;"></div>');
		}

		var htmlBtn = ''
		if(this.yes==null){
			htmlBtn = '<a href="javascript:;" class="no-btn">确定</a>';
		}else{
			htmlBtn = '<a href="javascript:;" class="no-btn">否</a><a href="javascript:;" class="yes-btn">是</a>';
		}

		var html = '<div class="localtion-layer" style="display: none; z-index:9998;"><div class="confirm-layer">'
			+ '<div class="content-text">'
			+ this.msgHtml
			+ '</div>'
			+ '<div class="btn-layer">'
			+ htmlBtn
			+ '</div>'
			+ '</div></div>';

		this.$el.append(html);
	}
}))