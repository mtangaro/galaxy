(function(c){jQuery.event.props.push("dataTransfer");var h={url:"",paramname:"content",maxfilesize:2048,dragover:function(){},dragleave:function(){},announce:function(){},initialize:function(){},progress:function(){},success:function(){},error:function(k,l,m){alert(m)},complete:function(){},error_filesize:"File exceeds 2GB. Please use an FTP client.",error_default:"Please make sure the file is available.",error_server:"Upload request failed.",error_login:"Uploads require you to log in.",error_missing:"No upload content available."};var a={};var e={};var f=0;var j=0;var d=false;var g=false;var b=null;var i=null;c.fn.uploadbox=function(A){a=c.extend({},h,A);b=this;b.append('<input id="uploadbox_input" type="file" style="display: none" multiple>');b.on("drop",o);b.on("dragover",p);b.on("dragleave",x);c("#uploadbox_input").change(function(B){z(B.target.files);c(this).val("")});function o(B){if(!B.dataTransfer){return}z(B.dataTransfer.files);B.preventDefault();return false}function p(B){B.preventDefault();a.dragover.call(B)}function x(B){B.stopPropagation();a.dragleave.call(B)}function k(B){if(B.lengthComputable){a.progress(this.index,this.file,Math.round((B.loaded*100)/B.total))}}function z(D){if(d){return}var E=f;for(var C=0;C<D.length;C++){var B=String(f++);e[B]=D[C];a.announce(B,e[B],"");j++}return E}function r(B){if(e[B]){delete e[B];j--}}function m(){if(j==0||g){g=false;d=false;a.complete();return}else{d=true}var D=-1;for(var F in e){D=F;break}var E=e[D];r(D);var C=E.size;var H=E.mode;var B=1048576*a.maxfilesize;if(C<B||E.mode=="ftp"){var G=a.initialize(D,E);if(G){q(D,E,G)}else{u(D,E,a.error_missing)}}else{u(D,E,a.error_filesize)}}function q(B,D,E){var F=new FormData();for(var C in E){F.append(C,E[C])}if(D.size>0&&a.paramname){F.append(a.paramname,D,D.name)}i=new XMLHttpRequest();i.open("POST",a.url,true);i.setRequestHeader("Accept","application/json");i.setRequestHeader("Cache-Control","no-cache");i.setRequestHeader("X-Requested-With","XMLHttpRequest");i.onreadystatechange=function(){if(i.readyState!=i.DONE){return}var G=null;if(i.responseText){try{G=jQuery.parseJSON(i.responseText)}catch(H){G=i.responseText}}if(i.status<200||i.status>299){var I=i.statusText;if(i.status==403){I=a.error_login}else{if(i.status==0){I=a.error_server}else{if(!I){I=a.error_default}}}u(B,D,I+" ("+i.status+")")}else{y(B,D,G)}};i.upload.index=B;i.upload.file=D;i.upload.addEventListener("progress",k,false);i.send(F)}function y(B,C,D){a.success(B,C,D);m()}function u(B,C,D){a.error(B,C,D);m()}function w(){c("#uploadbox_input").trigger("click")}function t(B){for(B in e){r(B)}}function l(){if(!d){d=true;m()}}function v(){g=true}function n(B){a=c.extend({},a,B);return a}function s(){return window.File&&window.FormData&&window.XMLHttpRequest&&window.FileList}return{select:w,add:z,remove:r,start:l,stop:v,reset:t,configure:n,compatible:s}}})(jQuery);