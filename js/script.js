TESTING = false;

function typeWord(word, div, I1, I2, done, continueDelay) {
	letters = word.split('');
	letterTyper = function(i) {
		let letter = letters[i];
		if (letter) {
			div.append(letter);
			if (letter != ' ') {
				interval = I1;
			}
			else {
				interval = I2;
			}
			setTimeout(function(){letterTyper(i+1);}, interval);
		}
		else {
			div.text(word);
			if (done != undefined) {
				setTimeout(done, continueDelay);
			}
			else {
				setTimeout(function(){}, continueDelay);
			}
		}
	};
	letterTyper(0);
}

function calcHeight(div) {
	topP = Number(div.css('padding-top').replace('px', ''));
	bottomP = Number(div.css('padding-bottom').replace('px', ''));
	topM = Number(div.css('margin-top').replace('px', ''));
	bottomM = Number(div.css('margin-bottom').replace('px', ''));
	height = topP + topM + bottomM + bottomP + div.height();
	return height;
}

function initPage() {
	navDiv = $('#nav-div');
	nameDiv = $('#name-div');
	nameDiv.addClass('new-name-card');
	nameDiv.addClass('name-transition');
	navItems = ['About', 'Resum\xE9', 'Projects', 'Contact'];
	addNavItem = function(i) {
		navItem = navItems[i];
		center = $('<div>');
		center.addClass('nav-button unselectable'); //HERE
		if (navItem != 'Resum\xE9') {
			center.addClass(navItem);
		}
		else {
			center.addClass('Resume');
		}
		navDiv.append(center);
		if (navItem) {
			time = calcTime(navItem, 60, 30);
			if (TESTING) {
				typeWord(navItem, center, 3, 3, undefined, 3);
				setTimeout(function(){addNavItem(i+1);}, 5);
			}
			else {
				typeWord(navItem, center, 40, 20, undefined, 60);
				setTimeout(function(){addNavItem(i+1);}, (time + 50));
			}
		}
		else {
			center.remove();
			navTyped();
		}
	};
	setTimeout(function(){addNavItem(0);}, 1000);
}

function toNumb(thing) {
	return Number(thing.replace('px', ''));
}

function navTyped() {
	navDiv = $('#nav-div');
	$('div.nav-button.About').text('About');
	$('div.nav-button.Resume').text('Resum\xe9');
	$('div.nav-button.Projects').text('Projects');
	$('div.nav-button.Contact').text('Contact');
	navDiv.addClass('nav-transition');
	navDiv.width('');
	buttons = navDiv.children('div.nav-button');
	buttons.addClass('nav-buttons-transition');
	buttons.addClass('nav-button-positioned');
	navDiv.addClass('nav-div-final');
	setTimeout(nameAndNavDone, 600);
}

function calcTime(word, I1, I2) {
	letters = word.split('');
	spaces = word.split(' ').length - 1;
	nonSpaces = letters.length - spaces;
	time = nonSpaces * I1 + spaces * I2;
	return time;
}

function calculateHeights() {
	about = $('#about-div');
	resume = $('#resume-div');
	projects = $('#projects-div');
	contact = $('#contact-div');
	topHeight = about.height() + toNumb(about.css('padding-bottom')) + toNumb(about.css('margin-bottom'));
	aboutTrans = 0;
	resumeTrans = topHeight + 2 * toNumb(resume.css('margin-top'));
	projectsTrans = resumeTrans + resume.height() + 2 * toNumb(projects.css('margin-top')) +
		toNumb(resume.css('margin-bottom')) + toNumb(resume.css('padding-bottom'));
	contactTrans = projectsTrans + projects.height() + 2 * toNumb(contact.css('margin-top')) + 
		toNumb(projects.css('margin-bottom')) + toNumb(resume.css('padding-bottom'));
}

function nameAndNavDone() {
	$('#name-div').css('margin-right', '');
	$('div.nav-buttons-transition').removeClass('nav-buttons-transition').addClass('nav-buttons-final sliding-u-l-r');
	$('.nav-buttons-final').each(function(){
		button = $(this);
		button.attr('onclick', 'openDiv(this)');
	});
	navWidth = $('#nav-container').width();
	$('#content-div').removeAttr('style');
	docWidth = $(document).width();
	newWidth = navWidth / docWidth * 100;
	$('#nav-container').css('width', (newWidth) + '%');
	$('#content-div').css('width', (((docWidth - navWidth) / docWidth * 100) - 20) + '%');
	$('#content-div').addClass('content-div-after active-tab');
	$('#content-div').attr('style', $('#content-div').attr('style') + ' transform: translateX(0%) !important');
	calculateHeights();
	setTimeout(function(){$('.About').addClass('active-tab-link')}, 200);
}

function openDiv(x) {
	button = $(x);
	calculateHeights();
	if (!button.hasClass('active-tab-link')) {
		button.siblings('.active-tab-link').removeClass('active-tab-link');
		button.addClass('active-tab-link');
		buttonText = button.text().replace('\xE9', 'e').toLowerCase();
		newDiv = $('#' + buttonText + '-div');
		oldDiv = $('.content-card.active');
		if (newDiv.hasClass('active')) {
			return;
		}
		else {
			oldDiv.removeClass('active');
			newDiv.addClass('active');
			children = newDiv.parent().children().toArray();
			oldIndex = children.indexOf(oldDiv[0]);
			newIndex = children.indexOf(newDiv[0]);
			if (button.text() == 'About') {
				translateHeight = 0;
			}
			else if (button.text() == 'Resum\xE9') {
				translateHeight = resumeTrans;
			}
			else if (button.text() == 'Projects') {
				translateHeight = projectsTrans;
			}
			else {
				translateHeight = contactTrans;
			}
			translate = ' transform: translate(0%, ' + (-translateHeight) + 'px) !important'
			$('#content-div').css('transform', '');
			contentDiv = $('#content-div');
			contentDiv.attr('style', contentDiv.attr('style') + translate);
		}
	}
	else {
		return;
	}
}

function projectTransition(to_id) {
	if (to_id[0] != '#') {
		to_id = '#' + to_id;
	}

	to = $(to_id);
	from = $('.project.toggled');

	// to.addClass('active');
	// from.removeClass('active');
	from.removeClass('toggled');
	to.addClass('toggled');
	from.fadeOut(500, function() {
		to.fadeIn(500, function() {
		});
	});
}

function start(name) {
	//Get doc dimensions and name/nav divs and templates
	doc = $(document);
	docWidth = doc.width();
	docHeight = doc.height();
	if (docWidth < 500 || docHeight < 440) {
		document.location = 'mobile.html';
	}

	nameDiv = $('#name-div');
	nameTemplate = $('#name-template');

	navDiv = $('#nav-div');
	navTemplate = $('#nav-template');
	
	//Set NAME div size	
	nameWidth = nameTemplate.width();
	nameHeight = nameTemplate.height();
	nameTop = (1/2) * (docHeight - nameHeight) + 'px';
	nameSides = ((1/2) * (docWidth - nameWidth) - 1) + 'px';

	nameDiv.css('margin-top', nameTop);
	nameDiv.css('margin-left', nameSides);
	nameDiv.css('margin-right', nameSides);
	nameDiv.addClass('name-div');
	//Determine NAV div size
	navWidth = navTemplate.width();
	navHeight = navTemplate.height();
	navTop = (1/2) * (docHeight - navHeight - 2 * nameHeight) + 'px';
	navLeft = (1/2) * (docWidth - navWidth) + 'px';

	navDiv.css('margin-top', navTop);
	navDiv.css('margin-left', navLeft);
	navDiv.css('margin-right', navLeft);
	navDiv.width(navWidth);

	//Remove template divs and initiate page functions
	nameTemplate.remove();
	navTemplate.remove();
	if (TESTING) {
	    typeWord(name, nameDiv, 2, 2, initPage, 2);
	}
	else {
	    setTimeout(function(){
	        typeWord(name, nameDiv, 120, 40, initPage, 150);
	    }, 100);
	}
	
}
