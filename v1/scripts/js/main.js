if ( API == null || typeof( API ) != 'object' ) {
	var API = {};
}

API.address = 'http://www.test.northeastphp.org';

API.setupTalks = function () {
	$.ajax( {
		'url': API.address + '/api/talks.json',
		'dataType': 'jsonp',
		'success': function ( data ) {
			var talks = data[ 'talks' ];

			console.log( talks );

			$( 'ul#talks-list' ).empty();
			for ( i = 0; i < talks.length; i++ ) {

				$( 'ul#talks-list' ).append(
					'<li>' +
						'<a href="/v1/talk-details.html?id=' + talks[ i ][ 'Talk' ][ 'id' ] + '" data-ajax="false">' +
							'<img class="talks-list-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Orange_question_mark.svg/450px-Orange_question_mark.svg.png" />' +
							'<p style="font-weight: bolder;">' + talks[ i ][ 'Talk' ][ 'topic' ] + '</p>' +
							'<p style="font-style: italic; margin-bottom: 15px;">' + talks[ i ][ 'Speaker' ][ 'first_name' ] + ' ' + talks[ i ][ 'Speaker' ][ 'last_name' ] + '</p>' +
							'<p>' + talks[ i ][ 'Talk' ][ 'abstract' ].replace( /(<([^>]+)>)/ig, "" ) + '</p>' +
							'<span class="ui-li-count">' + talks[ i ][ 'Talk' ][ 'talk_like_count' ] + ' ♥</span>' +
						'</a>' +
					'</li>'
				).listview( 'refresh' );
			}
		}
	} );
};

API.setupTalkDetails = function () {
	var talk_id = $.mobile.path.parseUrl( $( location ).attr( 'href' ) ).search.replace('?id=', '');

	console.log( API.address + '/api/talks/' + talk_id + '.json' );
	$.ajax( {
		'url': API.address + '/api/talks/' + talk_id + '.json',
		'dataType': 'jsonp',
		'success': function ( data ) {
			var talks = data[ 'talks' ][ 0 ];

			console.log( talks );

			$( 'div[data-role="content"]' ).append(
				'<h3>' + talks[ 'Talk' ][ 'topic' ] + '</h3>' +
				'<img width="50px" class="talk-details-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Orange_question_mark.svg/450px-Orange_question_mark.svg.png" />' +
				'<p><strong>By:</strong> ' + talks[ 'Speaker' ][ 'first_name' ] + ' ' + talks[ 'Speaker' ][ 'last_name' ] + '</p>' +
				'<p>' + talks[ 'Talk' ][ 'abstract' ] + '</p>'
			);
		}
	} );
};