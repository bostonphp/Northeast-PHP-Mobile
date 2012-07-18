<?php

	if ( ! function_exists( "curl_init" ) ) {
		die("PHP cURL extension is not installed.");
	}

	$api_urls = array(
		'talks' => 'http://www.test.northeastphp.org/api/talks.json',
	);

	$api_call = $_GET[ 'call' ];

	if ( array_key_exists( $api_call, $api_urls ) ) {
		$curl_handle = curl_init( $api_urls[ $api_call ] );
		curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, TRUE );
		$curl_result = curl_exec( $curl_handle );
		curl_close( $curl_handle );

		print $curl_result;
	} else {
		print '{}';
	}

?>