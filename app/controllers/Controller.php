<?php
class Controller {

    // function __construct() {}
	// function beforeroute() {}
	// function afterroute() {}
    
    function render($layout_path = false, $data = false) {
        if(!$layout_path) { die('layout n/a'); }

        if($data) { \Base::instance()->mset($data); }

        echo trim( \Template::instance()->render( $layout_path ) );
    }

}