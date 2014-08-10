
		

        function ban(){
        	var rshell = /(maxthon|360se|360ee|theworld|se|theworld|greenbrowser|qqbrowser|tencenttraveler)[\/]?[\w.]*/, 
        	rchrome = /(chrome)[ \/]([\w.]+)/, 
        	rmsie = /(msie) ([\w.]+)/, 
        	rmsafari = /(safari) ([\w.]+)/, 
        	noneDouble = ["", ""], noneTriple = ["", "", ""];

        	var $banHTML = '<div class="ban-others">\
                                <div class="face">\
                                    <div class="eyeL"></div>\
                                    <div class="eyeR"></div>\
                                    <div class="tearL"></div>\
                                    <div class="tearR"></div>\
                                    <p class="ban-text" id="banText"></p>\
                                    <div class="avatar-bg"></div>\
                                </div>\
                            </div>';

        	var browserDetect = function(ua) {
        		var info = {};
        		var core = rchrome.exec(ua) || 
        		rmsie.exec(ua);
        		var shell = rshell.exec(ua) || noneTriple, 
        		the360se = function() {
        			try {

        				var is360se = external.twGetRunPath.toLowerCase().indexOf('360se') > -1 ? true : false;
        				if (is360se) {
        					try {
        						var version = external.twGetRunVersion(external.twGetSecurityID(window));
        						return ['360se', version];
        					} 
        					catch (e) {
        						return ['360se', '-'];
        					}
        				}
        				return noneDouble;
        			} 
        			catch (e) {
        				return noneDouble;
        			}
        		}(), 
        		theMaxthon = function() {
        			try {

        				if (/(\d+\.\d)/.test(external.max_version)) {
        					return ["maxthon", parseFloat(RegExp['\x241'])];
        				}
        				return noneDouble;
        			} 
        			catch (e) {
        				return noneDouble;
        			}
        		}();

        		if(core !== null){
	        		info.core = [core[1], core[2]];
	        		info.shell = [shell[1], shell[2]];
        		}
        		if (the360se[0]) {
        			info.shell = the360se;
        		} 
        		else if (theMaxthon[0]) {
        			info.shell = theMaxthon;
        		}
        		return info
        	};

        	var ua = navigator.userAgent.toLowerCase();
        	var info = browserDetect(ua);
        	
        	if(info.core !== undefined){
	        	var core = info.core.join('/');
	        	var shell = info.shell.join('/');
	        	var versionIndex = core.indexOf('/');
	        	var versionIndex = core.indexOf('chrome/');
	        	if(versionIndex >= 0){
	        		core = core.replace('chrome/','');
	        		var version = core.substr(0,2);
	        		if(version < 32){

	        			document.body.innerHTML = $banHTML;
	        			document.getElementById('banText').innerHTML = '您的浏览器需要更新了TT';
	        		}
	        	}
	        	else if(versionIndex < 0 ){
	        		document.body.innerHTML = $banHTML;
	        			document.getElementById('banText').innerHTML = '只有Chrome才能看到我TT，<a target="_blank" href="https://www.google.com/intl/zh-CN/chrome/browser/thankyou.html?statcb=1&installdataindex=defaultbrowser#">马上去下载</a>';
	        	}
			}
			else{
				document.body.innerHTML = $banHTML;
	        			document.getElementById('banText').innerHTML = '只有Chrome才能看到我TT，<a target="_blank" href="https://www.google.com/intl/zh-CN/chrome/browser/thankyou.html?statcb=1&installdataindex=defaultbrowser#">马上去下载</a>';
			}
        
        }

    

    ban();