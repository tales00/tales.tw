<?php
// init
$fw = require('../fwcore/fatfree-3.6.4/lib/base.php');
$fw->config('envi.ini');
$fw->config('app/config/config.ini');
$fw->set('UPDATE_DATE', '20181205.0');
$fw->set('SITE_VERSION', 'beta_1');
\myExtendFunction::init();

// 環境變數處理
if( $fw->get('STAGE') !== 'DEV' ) {
    $fw->set('MIN_DOT', 'min.');
}

// 處理語言
$fw->set('LANG','en');
foreach (explode(',',$fw->get('LANGUAGE')) as $lang) {
	$lang = substr($lang,0,2);
	if(in_array($lang, ['zh','ja','en'])) {
		$fw->set('LANG', [
            'zh'=>'zh-TW',
            'ja'=>'ja',
            'en'=>'en'][$lang]
        );
		break;
	}
}

$fw->set('BASE_URL', "${fw['SCHEME']}://${fw['HOST']}${fw['BASE']}");

// routes
$fw->route('GET /', 'HomeControl->home');
$fw->route('GET /resume', 'HomeControl->resume');

// 載入自訂延伸功能

$fw->run();