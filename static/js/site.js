/* GNB */
(function () {
	var AccessibleNav = function () {
		this.status = false;
		this.anchor = [];
	};

	AccessibleNav.prototype = {
		initialize: function () {
			var that = this;
			that.hook = jQuery(that.options.hook);
			that.listParent = that.options.listParent;
			that._map();

			that.anchor
				.on("focus", function () {
					that._focus.apply(that, [this, "focus"]);

				})
				.on("focusout", function () {
					that.status = false;
					setTimeout(function () {
						if (that.status === false) {
							that._blur();
						}
					}, 12);
				})
				.on("focusin", function () {
					that.status = true;

				})
				.on("mouseenter", function () {
					that._focus.apply(that, [this, "mouseover"]);

				});

			that.hook.on("mouseleave", function () {
				jQuery(this)
					.find(that.listParent)
					.removeClass(that.options.mouseoverClass);
				that.hook.removeClass(that.options.selectClass);
				that.hook.parent().parent().removeClass('over')
			});
		},
		_map: function () {
			var that = this;

			that.hook.find("a").each(function () {
				that.anchor = jQuery.merge(jQuery(this), that.anchor);
			});
		},
		_focus: function (el, type) {

			var that = this,
				_class =
				type === "focus" ?
				that.options.focusClass :
				that.options.mouseoverClass;

			jQuery(el).closest(that.hook).addClass(that.options.selectClass);
			jQuery(el).closest(that.hook).parent().parent().addClass(_class)

			jQuery(el)
				.closest(that.listParent)
				.addClass(_class)
				.siblings()
				.removeClass(_class);

		},
		_blur: function () {
			var that = this;

			that.hook
				.removeClass(that.options.selectClass)
				.find(that.listParent)
				.removeClass(that.options.focusClass);
		},
	};

	var gnb = new AccessibleNav();

	return {
		load: function () {
			var that = this;
			jQuery(window).on("load", function () {
				gnb.options = {
					hook: ".nav-menu",
					listParent: ".nav-item",
					selectClass: "selected",
					focusClass: "focus",
					mouseoverClass: "over",
				};

				gnb.initialize();
			});
		},
	};
})().load();

$(function () {
	m_gnb();
	skipContents();

	var mainVisual = new Swiper(".main-visual", {
		effect: "fade",
		speed: 1000,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".main-visual-pagination",
			clickable: true,
		},
	});


	$('.btn-vis-stop').on('click', function () {
		mainVisual.autoplay.stop();
		$(this).hide();
		$('.btn-vis-play').show();
	})

	$('.btn-vis-play').on('click', function () {
		mainVisual.autoplay.start();
		$(this).hide();
		$('.btn-vis-stop').show();
	});


	$.exists = function (selector) {
		return $(selector).length > 0;
	};

	//TAB
	if ($.exists(".tab-top")) {
		tabs();
	}
	if ($.exists('.bg--f7')) {
		$('body').css({
			background: "#f7f7f7"
		})
	}

	$('.rel-sites .tit').on('click', function (e) {

		$('.site-list').show()
	});
	$('.rel-sites').on('mouseleave', function () {
		$('.site-list').hide();
	});


	$('.btn-menu').on('click', function () {
		$('.m-nav').stop().animate({
			right: 0
		})
	});

	$('.sub-depth > .current').on('click', function () {
		$(this).next('ul').toggleClass('open')
	})
});


function m_gnb() {
	$(".btn-m-gnb-open").click(function (e) {
		e.preventDefault();

		if ($(this).hasClass("open")) {
			$(this).parent().removeClass("open");
			$(this).removeClass("open");
			$(".m-gnb").animate({
					right: -320,
				},
				200
			);
			$(".m-sub-nav").slideUp(300);
		} else {
			$(this).parent().addClass("open");
			$(this).addClass("open");
			$(".m-gnb").animate({
					right: 0,
				},
				200
			);
		}
	});

	// $(".m-nav-menu > li > a  ").click(function (e) {
	// 	e.preventDefault();
	// 	$(".m-nav-menu > li ").removeClass("selected");
	// 	$(".m-sub-nav").hide();
	// 	$(this).next(".m-sub-nav").show();
	// 	$(this).parent().addClass("selected");
	// });

	// $('.m-nav-menu > li:first-child').addClass('selected')

	$('.m-nav .btn-close').on('click', function () {

		$('.m-nav').stop().animate({
			right: '-100%'
		}, 500);
	});

	// let sub_depth_len = $('.sub-depth').length;

	// if (sub_depth_len == 2) {
	// 	$('.sub-lnb').addClass('type2')
	// } else if (sub_depth_len == 3) {
	// 	$('.sub-lnb').addClass('type3')
	// }
	// $(".sub-depth .current").on("mouseenter focusin", function (e) {
	// 	e.preventDefault();
	// 	$(this).parent().find("ul").stop().slideDown(200);
	// 	$(this).parent().addClass("on");
	// });
	// $(".sub-depth").on("mouseleave", function () {
	// 	if ($(this).hasClass("on")) {
	// 		$(this).find("ul").stop().slideUp(200);
	// 		$(this).removeClass("on");
	// 	}
	// });
}

function skipContents() {
	$(".skiptoContent").focusin(function () {
		$(this).animate({
				top: 0,
				height: 50,
				opacity: 1,
			},
			0
		);
	});
	$(".skiptoContent").focusout(function () {
		$(this).animate({
				top: -50,
				height: 0,
				opacity: 0,
			},
			150
		);
	});
}

function tabs() {
	$(".tab-top li").click(function (e) {
		e.preventDefault();
		var thisIndex = $(this).parent().find("li").index(this);
		$(this)
			.parent()
			.parent()
			.parent()
			.find("div.tab-cnt")
			.removeClass("on");

		$(this).parent().find("li").removeClass("on");
		$(this)
			.parent()
			.parent()
			.parent()
			.find("div.tab-cnt")
			.eq(thisIndex)
			.addClass("on");
		$(this).addClass("on");
		return false;
	});
}