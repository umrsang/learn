1.  统计邀请函参数接口
	
	URL
		http://service.100bt.com/activity/lxywq_h5game/submit_score.jsonp
		
	输入参数
		score  -- 得分 整型
	输出
		{
			"resultCode": {
				"code": 0,
				"error": false,
				"detail": "success",
				"success": true
			},
			"value": null,
			"error": false,
			"success": true
		}
		
		
	
2.  修改状态参数
	
	URL
		http://service.100bt.com/activity/lxywq_h5game/change_status.jsonp
		
	输入参数
		type -- 类型 整型 1.点击重玩按钮  2.点击下载按钮   3.为点击分享按钮
	输出
		{
			"resultCode": {
				"code": 0,
				"error": false,
				"detail": "success",
				"success": true
			},
			"value": null,
			"error": false,
			"success": true
		}

        10.18.6.40  service.100bt.com 