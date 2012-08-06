<?php
	require('functions.php');

	$data = getData('/talks.json');
?>

<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<title>NorthEast PHP Mobile: Talks</title>
	</head>
	<body>
		<?php
			$data = $data['talks'];
			// Kint::dump($data);

			foreach ($data as $data_key => $data_value) {
				$data_Talk_topic = $data_value['Talk']['topic'];
				$data_Talk_id = $data_value['Talk']['id'];
				$data_Talk_talk_like_count = $data_value['Talk']['talk_like_count'];
				$data_Speaker_first_name = $data_value['Speaker']['first_name'];
				$data_Speaker_last_name = $data_value['Speaker']['last_name'];

				print '
					<h4><a href="talk-details.php?id=' . $data_Talk_id . '">' . $data_Talk_topic . '</a></h4>
					<p><strong>Speaker:</strong> ' . $data_Speaker_first_name . ' ' . $data_Speaker_last_name . '
					<p><strong>Likes:</strong> ' . $data_Talk_talk_like_count . '</p>
					<br />
				';
			}
		?>
	</body>
</html>