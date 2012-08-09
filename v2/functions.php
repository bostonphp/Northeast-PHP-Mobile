<?php
	require('resources/kint/Kint.class.php');

	$api_url = 'http://www.test.northeastphp.org/api';

	function getData ($api_call) {
		global $api_url;
		$curl_handle = curl_init($api_url . $api_call);
		$curl_options = array(
			CURLOPT_RETURNTRANSFER => TRUE,
		);
		curl_setopt_array($curl_handle, $curl_options);
		$api_result = curl_exec($curl_handle);
		$data = json_decode($api_result, TRUE);

		return $data;
	}
?>