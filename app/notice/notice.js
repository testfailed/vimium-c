var _noticeCloseFun = "";
(function ($) {
	$.notice = function () {
		return new notice()
	};
	var notice = (function () {
		var notice = function () {};
		notice.prototype = {
			content : '',
			init : function (nContent, sec, fn1, fn2) {
				var self = this;
				if (nContent != 'none') {
					sec = typeof sec == "undefined" ? 6000 : sec;
					if (typeof fn1 != "undefined" || typeof fn2 != "undefined") {
						var noticeObj = $('<div class="notice"><div class="icon"></div><div class="content">' + nContent + '</div>' + (typeof fn2 != "undefined" ? '<div class="cancel">' + getI18nMsg('cancel') + '</div>' : '') + '' + (typeof fn1 != "undefined" ? '<div class="determine">' + getI18nMsg('determine') + '</div>' : '') + '</div>');
						if (typeof fn1 != "undefined") {
							noticeObj.find('.determine').bind('click', function () {
								fn1();
								self.close()
							})
						}
						if (typeof fn2 != "undefined") {
							noticeObj.find('.cancel').bind('click', function () {
								fn2();
								self.close()
							})
						}
					} else {
						var noticeObj = $('<div class="notice"><div class="icon"></div><div class="content">' + nContent + '</div><div class="close"></div></div>');
						noticeObj.find('.close').bind('click', function () {
							self.close()
						})
					}
					noticeObj.find('.content .reload').bind('click', function () {
						window.location.reload(true)
					});
					$('.notice').remove();
					$('body').append(noticeObj);
					setTimeout(function () {
						var noticeWidth = $(".notice").get(0).offsetWidth;
						$(".notice").css({
							"left" : "50%",
							"marginLeft" : "-" + parseInt(noticeWidth * 0.5) + "px"
						});
						setTimeout(function () {
							$('.notice').css("height", "60px")
						}, 20)
					}, 220);
					_noticeCloseFun = setTimeout(function () {
							self.close(fn1)
						}, sec)
				}
			},
			close : function (fn) {
				if (_noticeCloseFun) {
					clearTimeout(_noticeCloseFun)
				}
				$('.notice').css("height", "0px");
				if (typeof fn != "undefined") {
					fn()
				}
				setTimeout(function () {
					$('.notice').remove()
				}, 220)
			}
		};
		return notice
	})()
})(jq);
var notice = $.notice();
