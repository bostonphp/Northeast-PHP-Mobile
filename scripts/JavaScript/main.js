// Generated by CoffeeScript 1.3.3
var API, Application;

Application = {};

API = {};

Application.capitalizeFirstLetter = function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

API.address = 'http://www.northeastphp.org';

API.setupTalks = function(sort_by) {
  var api_call, api_calls;
  if (sort_by == null) {
    sort_by = 'a';
  }
  if (sort_by !== 'a' && sort_by !== 's') {
    sort_by = 'a';
  }
  api_calls = {
    'a': API.address + '/api/talks.json',
    's': API.address + '/api/talks.json?sort=speaker'
  };
  api_call = api_calls[sort_by];
  $.ajax({
    'url': api_call,
    'dataType': 'jsonp',
    'success': function(data) {
      var talk, talk_Speaker_first_name, talk_Speaker_full_name, talk_Speaker_last_name, talk_Talk_talk_like_count, talks, _i, _len;
      talks = data['talks'];
      $('ul#talks-list').empty();
      for (_i = 0, _len = talks.length; _i < _len; _i++) {
        talk = talks[_i];
        talk_Talk_talk_like_count = talk['Talk']['talk_like_count'];
        talk_Speaker_first_name = talk['Speaker']['first_name'];
        talk_Speaker_last_name = talk['Speaker']['last_name'];
        if (sort_by === 'a') {
          talk_Speaker_full_name = talk_Speaker_first_name + ' ' + talk_Speaker_last_name;
        } else if (sort_by === 's') {
          talk_Speaker_full_name = talk_Speaker_last_name + ', ' + talk_Speaker_first_name;
        }
        $('ul#talks-list').append('<li>' + '<a href="/talk-details.html?id=' + talk['Talk']['id'] + '" data-ajax="false">' + '<p class="html-strong" style="text-decoration: underline; margin-top: 0; margin-bottom: 15px;">' + talk['Talk']['topic'] + '</p>' + '<p style="margin-bottom: 10px;"><span class="html-strong">Speaker:</span> ' + talk_Speaker_full_name + '</p>' + '<p><span class="html-strong">Track:</span> ' + talk['Track']['name'] + '</p>' + '<p class="html-italic" style="margin-top: 10px; margin-bottom: 0;">' + talk_Talk_talk_like_count + ' ' + (parseInt(talk_Talk_talk_like_count) === 1 ? 'like' : 'likes') + '</p>' + '</a>' + '</li>').listview('refresh');
      }
    }
  });
};

API.setupTalkDetails = function() {
  var talk_id;
  talk_id = $.mobile.path.parseUrl($(location).attr('href')).search.replace('?id=', '');
  $.ajax({
    'url': API.address + '/api/talks/' + talk_id + '.json',
    'dataType': 'jsonp',
    'success': function(data) {
      var talk, talk_Talk_abstract, talk_Talk_start_time, talk_Talk_talk_like_count;
      talk = data['talks'][0];
      talk_Talk_start_time = talk['Talk']['start_time'];
      talk_Talk_talk_like_count = talk['Talk']['talk_like_count'];
      talk_Talk_abstract = talk['Talk']['abstract'];
      $('div[data-role="content"]').append('<h2 class="talk-details-jqm-page-h2">' + talk['Talk']['topic'] + '</h2>' + '<p><span class="html-italic">' + Application.capitalizeFirstLetter(moment(talk_Talk_start_time, 'YYYY-MM-DD HH:mm:ss').fromNow()) + '</span></p>' + '<hr />' + '<p><span class="html-strong">Speaker:</span> <a href="/speaker-details.html?id=' + talk['Speaker']['id'] + '" data-ajax="false">' + talk['Speaker']['first_name'] + ' ' + talk['Speaker']['last_name'] + '</a></p>' + '<p><span class="html-strong">Room:</span> ' + talk['Talk']['room'] + '</p>' + '<p><span class="html-strong">Date:</span> ' + moment(talk_Talk_start_time, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do, YYYY') + '</p>' + '<p><span class="html-strong">Time:</span> ' + moment(talk_Talk_start_time, 'YYYY-MM-DD HH:mm:ss').format('hh:mm A') + '</p>' + '<p><span class="html-strong">Duration:</span> ' + (talk['Talk']['duration'] - 15) + ' minutes</p>' + '<p><span class="html-strong">Track:</span> ' + talk['Track']['name'] + '</p>' + '<hr />', '<p>' + (talk_Talk_abstract !== null ? talk_Talk_abstract : 'No description provided.') + '</p>' + '<hr />' + '<p>' + '<span class="html-italic"><span class="html-strong">' + talk_Talk_talk_like_count + '</span> ' + (parseInt(talk_Talk_talk_like_count) === 1 ? 'person' : 'people') + ' ' + (parseInt(talk_Talk_talk_like_count) === 1 ? 'likes' : 'like') + ' this.' + '</span>' + '</p>');
    }
  });
};

API.setupSpeakers = function() {
  $.ajax({
    'url': API.address + '/api/speakers.json',
    'dataType': 'jsonp',
    'success': function(data) {
      var speaker, speaker_Talk, speaker_Talks, speakers, talks_by_speaker, _i, _j, _len, _len1;
      speakers = data['speakers'];
      $('ul#speakers-list').empty();
      for (_i = 0, _len = speakers.length; _i < _len; _i++) {
        speaker = speakers[_i];
        speaker_Talks = speaker['Talk'];
        talks_by_speaker = '';
        for (_j = 0, _len1 = speaker_Talks.length; _j < _len1; _j++) {
          speaker_Talk = speaker_Talks[_j];
          talks_by_speaker += '"' + speaker_Talk['topic'] + '", ';
        }
        talks_by_speaker = talks_by_speaker.slice(0, talks_by_speaker.length - 2);
        $('ul#speakers-list').append('<li>' + '<a href="/speaker-details.html?id=' + speaker['Speaker']['id'] + '" data-ajax="false">' + '<p class="html-strong" style="text-decoration: underline; margin-top: 0; margin-bottom: 15px;">' + speaker['Speaker']['last_name'] + ', ' + speaker['Speaker']['first_name'] + '</p>' + '<p><span class="html-strong">Talks:</span> ' + talks_by_speaker + '</p>' + '</a>', '</li>').listview('refresh');
      }
    }
  });
};

API.setupSpeakerDetails = function() {
  var speaker_id;
  speaker_id = $.mobile.path.parseUrl($(location).attr('href')).search.replace('?id=', '');
  $.ajax({
    'url': API.address + '/api/speakers/' + speaker_id + '.json',
    'dataType': 'jsonp',
    'success': function(data) {
      var speaker, speaker_Talk, speaker_Talk_talk_like_count, speaker_talks, speaker_talks_listview, _i, _len;
      speaker = data['speakers'][0];
      speaker_talks = speaker['Talk'];
      speaker_talks_listview = '<ul data-mini="true" data-inset="true" data-role="listview" id="speaker-talks-list">';
      for (_i = 0, _len = speaker_talks.length; _i < _len; _i++) {
        speaker_Talk = speaker_talks[_i];
        speaker_Talk_talk_like_count = speaker_Talk['talk_like_count'];
        speaker_talks_listview += '<li>' + '<a href="/talk-details.html?id=' + speaker_Talk['id'] + '" data-ajax="false">' + '<p class="html-strong">' + speaker_Talk['topic'] + '</p>' + '<p class="html-italic" style="margin-bottom: 0;">' + speaker_Talk_talk_like_count + ' ' + (parseInt(speaker_Talk_talk_like_count) === 1 ? 'like' : 'likes') + '</p>' + '</a>' + '</li>';
      }
      speaker_talks_listview += '</ul>';
      $('div[data-role="content"]').append('<h2 class="speaker-details-jqm-page-h2">' + speaker['Speaker']['last_name'] + ', ' + speaker['Speaker']['first_name'] + '</h2>' + '<hr />' + '<p>' + speaker['Speaker']['about'] + '</p>' + '<hr />' + '<p><span class="html-strong">Website:</span> ' + speaker['Speaker']['website'] + '</p>' + '<p><span class="html-strong">Twitter:</span> ' + speaker['Speaker']['twitter'] + '</p>' + '<p class="html-strong">Talks:</p>');
      $('div[data-role="content"]').append(speaker_talks_listview).trigger('create');
    }
  });
};
