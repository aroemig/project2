/*
  Please add all Javascript code to this file.  See weather/ajax.js for function ref. 
  */


  function processHandlebarsTemplate(templateId, data) {
  	var templateSource = $('#' + templateId).html();
  	var compiledTemplate = Handlebars.compile(templateSource);

  	return compiledTemplate(data);
  }


	$('#digg_link').on('click', function() {
		$.ajax({
			type: 'GET',
			url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
			success: function(response) {
				response.data.feed.forEach(function(article){
					var articleHtml = processHandlebarsTemplate('diggTemplate', article)
					var $articleContainer = $(articleHtml).appendTo('#main')

					$articleContainer.on('click', 'a.contentTitle', function(event) {
						console.log('You clicked on the following article:')
						console.log(article)

						$('#popUp').removeClass('loader').removeClass('hidden')
						$('#popUp h1').html(article.content.title)
						$('#popUp p').html(article.content.description)
						$('#popUp a.popUpAction').attr('href', article.content.original_url)


					})
				})
			},
			error: function() {
				console.log('The request failed!')
			}
		})
	})


	$('#reddit_link').on('click', function() {
		$.ajax({
			type: 'GET',
			url: 'https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/r/news.json',
			success: function(response) {
				response.data.children.forEach(function(article){
					var articleHtml = processHandlebarsTemplate('redditTemplate', article)
					var $articleContainer = $(articleHtml).appendTo('#main')

					$articleContainer.on('click', 'a.contentTitle', function(event) {
						console.log('You clicked on the following article:')
						console.log(article)
						
						$('#popUp').removeClass('loader').removeClass('hidden')
						$('#popUp h1').html(article.data.title)
						$('#popUp p').html('')
						$('#popUp a.popUpAction').attr('href', article.data.url)

					})
				})
			},
			error: function() {
				console.log('The request failed!')
			}
		})
	})


	$('#google_link').on('click', function() {
		$.ajax({
			type: 'GET',
			url:'https://accesscontrolalloworiginall.herokuapp.com/http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss',
			success: function(response) {
				response.responseData.feed.entries.forEach(function(entry){
					// debugger;
					var html = processHandlebarsTemplate('googleTemplate', entry)
					$('#main').append(html)

				})

				console.log(response)
			},
			error: function() {
				console.log('The request failed!')
			}
		})
	})


$(document)
    .ajaxStart(function() {
    	$('#popUp').removeClass('hidden')
    })
    .ajaxStop(function() {
    	$('#popUp').addClass('hidden')
    })
;
