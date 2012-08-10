Application = {}
API = {}

Application.capitalizeFirstLetter = (text) ->
	text.charAt(0).toUpperCase() + text.slice 1

API.address = 'http://www.northeastphp.org'

API.setupTalks = ->
	$.ajax
		'url': API.address + '/api/talks.json'
		'dataType': 'jsonp'
		'success': (data) ->
			talks = data['talks']

			$('ul#talks-list').empty()
			for talk in talks
				talk_Talk_talk_like_count = talk['Talk']['talk_like_count']

				$('ul#talks-list').append(
					'<li>' +
						'<a href="/v1/talk-details.html?id=' + talk['Talk']['id'] + '" data-ajax="false">' +
							'<p style="font-weight: bolder; text-decoration: underline; margin-top: 0; margin-bottom: 15px;">' + talk['Talk']['topic'] + '</p>' +
							'<p style="margin-bottom: 10px;"><span style="font-weight: bold;">Speaker:</span> ' + talk['Speaker']['first_name'] + ' ' + talk['Speaker']['last_name'] + '</p>' +
							'<p><span style="font-weight: bold;">Track:</span> ' + talk['Track']['name'] + '</p>' +
							'<p style="margin-top: 10px; margin-bottom: 0; font-style: italic;">' + talk_Talk_talk_like_count + ' ' + (if parseInt(talk_Talk_talk_like_count) is 1 then 'like' else 'likes') + '</p>' +
						'</a>' +
					'</li>'
				).listview 'refresh'

			return

	return

API.setupTalkDetails = ->
	talk_id = $.mobile.path.parseUrl($(location).attr('href')).search.replace '?id=', ''

	$.ajax
		'url': API.address + '/api/talks/' + talk_id + '.json'
		'dataType': 'jsonp'
		'success': (data) ->
			talk = data['talks'][0]
			talk_Talk_start_time = talk['Talk']['start_time']
			talk_Talk_talk_like_count = talk['Talk']['talk_like_count']

			$('div[data-role="content"]').append(
				'<h2 class="talk-details-jqm-page-h2">' + talk['Talk']['topic'] + '</h2>' +
				'<p><i>' + Application.capitalizeFirstLetter(moment(talk_Talk_start_time, 'YYYY-MM-DD HH:mm:ss').fromNow()) + '</i></p>' +
				'<hr />' +
				'<p><strong>Speaker:</strong> ' + talk['Speaker']['first_name'] + ' ' + talk['Speaker']['last_name'] + '</p>' +
				'<p><strong>Room:</strong> ' + talk['Talk']['room'] + '</p>' +
				'<p><strong>Date:</strong> ' + moment(talk_Talk_start_time, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do, YYYY') + '</p>' +
				'<p><strong>Start Time:</strong> ' + moment(talk_Talk_start_time, 'YYYY-MM-DD HH:mm:ss').format('hh:mm A') + '</p>' +
				'<p><strong>Duration:</strong> ' + (talk['Talk']['duration'] - 15) + ' minutes</p>' +
				'<p><strong>Track:</strong> ' + talk['Track']['name'] + '</p>' +
				'<hr />'
				'<p>' + talk['Talk']['abstract'] + '</p>' +
				'<hr />' +
				'<p><i><strong>' + talk_Talk_talk_like_count + '</strong> ' + (if parseInt(talk_Talk_talk_like_count) is 1 then 'person' else 'people') + ' ' + (if parseInt(talk_Talk_talk_like_count) is 1 then 'likes' else 'like') + ' this talk.' + '</i></p>'
			)

			return

	return