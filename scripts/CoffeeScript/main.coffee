Application = {}
API = {}

Application.capitalizeFirstLetter = (text) ->
	text.charAt(0).toUpperCase() + text.slice 1

API.address = 'http://www.northeastphp.org'

API.setupTalks = (sort_by = 'a') ->
	if sort_by isnt 'a' and sort_by isnt 's'
		sort_by = 'a'

	api_calls =
		'a': API.address + '/api/talks.json'
		's': API.address + '/api/talks.json?sort=speaker'

	api_call = api_calls[sort_by]

	$.ajax
		'url': api_call
		'dataType': 'jsonp'
		'success': (data) ->
			talks = data['talks']

			$('ul#talks-list').empty()
			for talk in talks
				talk_Talk_talk_like_count = talk['Talk']['talk_like_count']
				talk_Speaker_first_name = talk['Speaker']['first_name']
				talk_Speaker_last_name = talk['Speaker']['last_name']

				if sort_by is 'a'
					talk_Speaker_full_name = talk_Speaker_first_name + ' ' + talk_Speaker_last_name
				else if sort_by is 's'
					talk_Speaker_full_name = talk_Speaker_last_name + ', ' + talk_Speaker_first_name

				$('ul#talks-list').append(
					'<li>' +
						'<a href="/talk-details.html?id=' + talk['Talk']['id'] + '" data-ajax="false">' +
							'<p class="html-strong" style="text-decoration: underline; margin-top: 0; margin-bottom: 15px;">' + talk['Talk']['topic'] + '</p>' +
							'<p style="margin-bottom: 10px;"><span class="html-strong">Speaker:</span> ' + talk_Speaker_full_name + '</p>' +
							'<p><span class="html-strong">Track:</span> ' + talk['Track']['name'] + '</p>' +
							'<p class="html-italic" style="margin-top: 10px; margin-bottom: 0;">' + talk_Talk_talk_like_count + ' ' + (if parseInt(talk_Talk_talk_like_count) is 1 then 'like' else 'likes') + '</p>' +
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
			talk_Talk_abstract = talk['Talk']['abstract']

			$('div[data-role="content"]').append(
				'<h2 class="talk-details-jqm-page-h2">' + talk['Talk']['topic'] + '</h2>' +
				'<p><span class="html-italic">' + Application.capitalizeFirstLetter(moment(talk_Talk_start_time, 'YYYY-MM-DD HH:mm:ss').fromNow()) + '</span></p>' +
				'<hr />' +
				'<p><span class="html-strong">Speaker:</span> <a href="/speaker-details.html?id=' + talk['Speaker']['id'] + '" data-ajax="false">' + talk['Speaker']['first_name'] + ' ' + talk['Speaker']['last_name'] + '</a></p>' +
				'<p><span class="html-strong">Room:</span> ' + talk['Talk']['room'] + '</p>' +
				'<p><span class="html-strong">Date:</span> ' + moment(talk_Talk_start_time, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do, YYYY') + '</p>' +
				'<p><span class="html-strong">Time:</span> ' + moment(talk_Talk_start_time, 'YYYY-MM-DD HH:mm:ss').format('hh:mm A') + '</p>' +
				'<p><span class="html-strong">Duration:</span> ' + (talk['Talk']['duration'] - 15) + ' minutes</p>' +
				'<p><span class="html-strong">Track:</span> ' + talk['Track']['name'] + '</p>' +
				'<hr />'
				'<p>' + (if talk_Talk_abstract isnt null then talk_Talk_abstract else 'No description provided.') + '</p>' +
				'<hr />' +
				'<p>' +
					'<span class="html-italic"><span class="html-strong">' + talk_Talk_talk_like_count + '</span> ' + (if parseInt(talk_Talk_talk_like_count) is 1 then 'person' else 'people') + ' ' + (if parseInt(talk_Talk_talk_like_count) is 1 then 'likes' else 'like') + ' this.' + '</span>' +
				'</p>'
			)

			return

	return

API.setupSpeakers = ->
	$.ajax
		'url': API.address + '/api/speakers.json'
		'dataType': 'jsonp'
		'success': (data) ->
			speakers = data['speakers']

			$('ul#speakers-list').empty()
			for speaker in speakers
				speaker_Talks = speaker['Talk']

				talks_by_speaker = ''
				for speaker_Talk in speaker_Talks
					talks_by_speaker += '"' + speaker_Talk['topic'] + '", '
				talks_by_speaker = talks_by_speaker.slice(0, (talks_by_speaker.length - 2))

				$('ul#speakers-list').append(
					'<li>' +
						'<a href="/speaker-details.html?id=' + speaker['Speaker']['id'] + '" data-ajax="false">' +
							'<p class="html-strong" style="text-decoration: underline; margin-top: 0; margin-bottom: 15px;">' + speaker['Speaker']['last_name'] + ', ' + speaker['Speaker']['first_name'] + '</p>' +
							'<p><span class="html-strong">Talks:</span> ' + talks_by_speaker + '</p>' +
						'</a>'
					'</li>'
				).listview 'refresh'

			return

	return

API.setupSpeakerDetails = ->
	speaker_id = $.mobile.path.parseUrl($(location).attr('href')).search.replace '?id=', ''

	$.ajax
		'url': API.address + '/api/speakers/' + speaker_id + '.json'
		'dataType': 'jsonp'
		'success': (data) ->
			speaker = data['speakers'][0]

			speaker_talks = speaker['Talk']
			speaker_talks_listview = '<ul data-inset="true" data-role="listview" id="speaker-talks-list">'
			for speaker_Talk in speaker_talks
				speaker_Talk_talk_like_count = speaker_Talk['talk_like_count']

				speaker_talks_listview +=
					'<li>' +
						'<a href="/talk-details.html?id=' + speaker_Talk['id'] + '" data-ajax="false">' +
							'<p class="html-strong">' + speaker_Talk['topic'] + '</p>' +
							'<p class="html-italic" style="margin-bottom: 0;">' + speaker_Talk_talk_like_count + ' ' + (if parseInt(speaker_Talk_talk_like_count) is 1 then 'like' else 'likes') + '</p>' +
						'</a>' +
					'</li>'
			speaker_talks_listview += '</ul>'

			$('div[data-role="content"]').append(
				'<h2 class="speaker-details-jqm-page-h2">' + speaker['Speaker']['last_name'] + ', ' + speaker['Speaker']['first_name'] + '</h2>' +
				'<hr />' +
				'<p>' + speaker['Speaker']['about'] + '</p>' +
				'<hr />' +
				'<p><span class="html-strong">Website:</span> ' + speaker['Speaker']['website'] + '</p>' +
				'<p><span class="html-strong">Twitter:</span> ' + speaker['Speaker']['twitter'] + '</p>' +
				'<p class="html-strong">Talks:</p>'
			)
			$('div[data-role="content"]').append(speaker_talks_listview).trigger 'create'

			return

	return