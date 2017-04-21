/**
 * 图片全屏预览
 * @author zhangsl
 * @date 2015-10-08
 */
define(function(require, exports, module){

	var $body = $(document.body);

	// 图片大图预览层的html模板
	function picViewerTpl(picSrc) {
		var html = [
			'<div class="pic-viewer J-pic-viewer">',
				'<div class="pic-viewer-wrap">',
					'<div class="pic-viewer-inner loading J-viewer-inner">',
						'<img src="', picSrc, '" />',
					'</div>',
				'</div>',
				'<span class="icon-close J-close-btn"></span>',
			'</div>'
		];
		return html.join('');
	}



	function getDom($viewer){
		return {
			viewerInner: $viewer.find('.J-viewer-inner')
		};
	}

	// 获取大图预览层
	function getPicViewer(){
		return $('.J-pic-viewer');
	}

	// 移除大图预览层
	function removePicViewer($viewer){
		var $picViewer = $viewer || getPicViewer();
		$picViewer.remove();
	}


	// 生成大图预览层
	function createPicViewer(picSrc, callback){
		$body.append(picViewerTpl(picSrc));

		var $picViewer = getPicViewer();
		callback && callback($picViewer);
	}

	// 销毁图片预览视图
	function destoryViewer(){
		// 移除大图预览层
		removePicViewer($(this));

		// 移除事件监听
		$(this).off('click');
	}

	function createCallback($viewer){
		var dom = getDom($viewer);
		dom.viewerInner.find('img').on('load error', function () {
			dom.viewerInner.removeClass('loading');
		});

		// 关闭视图层
		$viewer.on('click', function(){
			destoryViewer.call(this);
		});
	}

	// 初始化图片预览
	function initViewer(picSrc){
		createPicViewer(picSrc, function($viewer){
			createCallback($viewer);
		});
	}

	exports.create = initViewer;
});