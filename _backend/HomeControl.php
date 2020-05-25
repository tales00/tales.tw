<?php
class HomeControl extends \Controller {

   	// 首頁
	function home($fw, $params) {
		$this->render( 'index.html', [] );
	}
}