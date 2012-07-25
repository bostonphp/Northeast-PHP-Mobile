if ( API == null || typeof( API ) != 'object' ) {
	var API = {};
}

API.setupTalks = function ( sort_talks_list_by ) {
	$.ajax( {
		'url': 'http://www.test.northeastphp.org/api/talks.json',
		'dataType': 'jsonp',
		/*'data': {
			'call': 'talks'
		},*/
		'success': function ( data ) {
			var talks = data[ 'talks' ];

			console.log( talks );

			/*if ( sort_talks_list_by != undefined ) {
				if ( sort_talks_list_by == 'a' ) {
					talks.sort( function ( a, b ) {
						var topic_a = a[ 'Talk' ][ 'topic' ].toLowerCase();
						var topic_b = b[ 'Talk' ][ 'topic' ].toLowerCase();

						if ( topic_a < topic_b ) {
							return -1;
						} else {
							if ( topic_a > topic_b ) {
								return 1;
							} else {
								return 0;
							}
						}
					} );
				} else if ( sort_talks_list_by == 'l' ) {
					talks.sort( function ( a, b ) {
						return b[ 'Talk' ][ 'talk_like_count' ] - a[ 'Talk' ][ 'talk_like_count' ];
					} );
				} else if ( sort_talks_list_by == 's' ) {
					talks.sort( function ( a, b ) {
						var display_name_a = a[ 'Speaker' ][ 'display_name' ].toLowerCase();
						var display_name_b = b[ 'Speaker' ][ 'display_name' ].toLowerCase();

						if ( display_name_a < display_name_b ) {
							return -1;
						} else {
							if ( display_name_a > display_name_b ) {
								return 1;
							} else {
								return 0;
							}
						}
					} );
				}
			} else if ( sort_talks_list_by == undefined ) {
				talks.sort( function ( a, b ) {
					var topic_a = a[ 'Talk' ][ 'topic' ].toLowerCase();
					var topic_b = b[ 'Talk' ][ 'topic' ].toLowerCase();

					if ( topic_a < topic_b ) {
						return -1;
					} else {
						if ( topic_a > topic_b ) {
							return 1;
						} else {
							return 0;
						}
					}
				} );
			}*/

			$( 'ul#talks-list' ).empty();
			for ( i = 0; i < talks.length; i++ ) {

				$( 'ul#talks-list' ).append(
					'<li>' +
						'<a href="#">' +
							'<img class="talks-list-image" src="http://www.gravatar.com/avatar/' + hex_md5( talks[ i ][ 'Speaker' ][ 'email' ] ) + '" />' +
							'<p style="font-weight: bolder;">' + talks[ i ][ 'Talk' ][ 'topic' ] + '</p>' +
							'<p style="font-style: italic; margin-bottom: 15px;">' + talks[ i ][ 'Speaker' ][ 'display_name' ] + '</p>' +
							'<p>' + talks[ i ][ 'Talk' ][ 'abstract' ].replace( /(<([^>]+)>)/ig, "" ) + '</p>' +
							'<span class="ui-li-count">' + talks[ i ][ 'Talk' ][ 'talk_like_count' ] + ' ♥</span>' +
						'</a>' +
					'</li>'
				).listview( 'refresh' );
			}
		}
	} );
};