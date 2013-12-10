formatString = chrome.extension.getBackgroundPage().formatString
var url = (localStorage["url"]||'.json?').split('.json?')[0]

// values for format string from issue object
function valuesFromIssue(issue){
	var values = {'project':issue.project['name'],
	   			'tracker':  issue.tracker.name,
				'id':       issue.id.toString(),
				'subject':  issue.subject,
				'status':   issue.status.name,
				'author':   issue.author.name,
				'description':issue.description,
				'updated_on': new Date(issue.updated_on).toLocaleString(),
				'created_on': new Date(issue.created_on).toLocaleString(),
				'assigned_to':'',
				'url':      url,
				};
	if (issue.assigned_to){
	    			values['assigned_to'] = issue.assigned_to.name
	};
	return values
}

// Toggle display style in div's 'second_page' 'first_page'
function pageToggle(issue){
	var first_page = issue.getElementsByClassName('first_page')[0]
	var second_page = issue.getElementsByClassName('second_page')[0]
	if (second_page.style.display == 'none'){
		first_page.style.display = 'none';
		second_page.style.display = 'inline'
	}else{
		first_page.style.display = 'inline';
		second_page.style.display = 'none'
	}
}
function when_load(){
		var pattern1 = document.getElementById('pattern').innerHTML.trim();
		var temp_issues =  chrome.extension.getBackgroundPage().temp_issues;
		var j = document.getElementById('one');
    	for (var i = 0;i < 25;i++){	
	    		if(temp_issues[i]){	
	    			var elmnt = document.createElement('div');
		    		elmnt.className = 'issue';
		    		elmnt.innerHTML = formatString(pattern1, valuesFromIssue(temp_issues[i]));
		    		elmnt.onclick = function(){ pageToggle(this) }
		    		u = j.appendChild(elmnt);
		    	}
		}
		//document.getElementById('pattern').remove();
}

document.addEventListener('DOMContentLoaded', function (){when_load()})