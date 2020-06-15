<?php
// init
$fw = require('../F3core/fatfree-3.7.1/lib/base.php');
$fw->config('envi.ini');
$fw->config('_backend/config.ini');

// 複寫環境相依設定
// if('DEV' === $fw->STAGE) {
//   $fw->DB_PATH = '_site/db/';
// }

// 載入自訂延伸功能
// \myExtendFunction::init();

$fw->set('BASE_URL', "${fw['SCHEME']}://${fw['HOST']}${fw['BASE']}");

// routes
$fw->route([
  'GET /',
  'GET /blog',
  'GET /illust',
  'GET /illust/pixiv/*',
], 'HomeControl->home', 3600);

$fw->run();