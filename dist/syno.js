var mod=function(){};mod=function(){var a,b,c,d,e;return a={},d={},c={},b=function(b){var e;if(c[b])throw new Error("Cyclic dependency on module "+b);if(d.hasOwnProperty(b))return d[b];if(!a.hasOwnProperty(b))throw new Error("No module found for key "+b);return c[b]=!0,e=d[b]=a[b](),c[b]=!1,a[b]=null,e},e=function(b,e){if(a.hasOwnProperty(b)||d.hasOwnProperty(b))throw new Error("The module with key "+b+" already exists");return a[b]=e,c[b]=!1},function(a,c){return c?e(a,c):b(a)}}();var syno,__hasProp={}.hasOwnProperty,__extends=function(a,b){function c(){this.constructor=a}for(var d in b)__hasProp.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};syno={API:"syno.API",Auth:"syno.Auth",AuthenticatedAPI:"syno.AuthenticatedAPI",DownloadStation:"syno.DownloadStation",FileStation:"syno.FileStation",Syno:"syno.Syno",Utils:"syno.Utils"},mod(syno.API,function(){var a,b,c,d,e;return e=require("lodash"),d=e.extend,c=e.defaults,b=mod(syno.Utils),a=function(){function a(a){this.syno=a}var e;return e=function(){},a.prototype.request=function(a,b){var d,f,g,h,i,j,k,l,m,n,o;return null==a&&(a={}),null==b&&(b=e),o=this.syno,k=o.protocol,f=o.host,j=o.port,d=a.api,n=a.version,i=a.path,g=a.method,h=a.params,m=""+k+"://"+f+":"+j+"/webapi/"+i,l=c({api:d,version:n,method:g},h),this.syno.request({url:m,qs:l},function(a,c,d){return a?b(a):200!==c.statusCode?b(c.statusCode):d.success?b(null,d.data):b(JSON.stringify(d.error,null,4))})},a.prototype.requestAPI=function(a){var c,e,f,g,h,i;return c=a.apiInfos,h=a.requiredParams,g=a.params,e=a.done,i=b.optionalParamsAndDone({params:g,done:e}),g=i.params,e=i.done,b.checkRequiredParams(g,h),f=d({},c,{params:g}),this.request(f,e)},a}()}),mod(syno.Auth,function(){var a,b;return a=mod(syno.API),b=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}var c,d,e;return __extends(b,a),c="SYNO.API.Auth",e=3,d="auth.cgi",b.prototype.login=function(a){var b,f,g;return b="login",g="SYNO_SESSION_"+Date.now(),f={account:this.syno.account,passwd:this.syno.passwd,session:g},this.syno.session=g,this.request({api:c,version:e,path:d,method:b,params:f},a)},b.prototype.logout=function(a){var b,f;return this.syno.session?(b="logout",f={session:this.syno.session},this.syno.session=null,this.request({api:c,version:e,path:d,method:b,params:f},a)):null},b}(a)}),mod(syno.AuthenticatedAPI,function(){var a,b;return a=mod(syno.API),b=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}var c;return __extends(b,a),c=function(){},b.prototype.request=function(a,d){return null==d&&(d=c),this.syno.session?b.__super__.request.call(this,a,d):this.syno.auth.login(function(c){return function(e){return e?d(e):b.__super__.request.call(c,a,d)}}(this))},b}(a)}),mod(syno.DownloadStation,function(){var a,b;return a=mod(syno.AuthenticatedAPI),b=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return __extends(b,a),b.prototype.getDownloadStationInfo=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.Info",version:1,path:"DownloadStation/info.cgi",method:"getinfo"}})},b.prototype.getDownloadStationConfig=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.Info",version:1,path:"DownloadStation/info.cgi",method:"getconfig"}})},b.prototype.setDownloadStationConfig=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.Info",version:1,path:"DownloadStation/info.cgi",method:"setserverconfig"}})},b.prototype.getScheduleConfig=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.Schedule",version:1,path:"DownloadStation/schedule.cgi",method:"getconfig"}})},b.prototype.setScheduleConfig=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.Schedule",version:1,path:"DownloadStation/schedule.cgi",method:"setconfig"}})},b.prototype.listTasks=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.Task",version:1,path:"DownloadStation/task.cgi",method:"list"}})},b.prototype.getTasksInfo=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["id"],apiInfos:{api:"SYNO.DownloadStation.Task",version:1,path:"DownloadStation/task.cgi",method:"getinfo"}})},b.prototype.createTask=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.Task",version:3,path:"DownloadStation/task.cgi",method:"create"}})},b.prototype.deleteTasks=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["id"],apiInfos:{api:"SYNO.DownloadStation.Task",version:1,path:"DownloadStation/task.cgi",method:"delete"}})},b.prototype.pauseTasks=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["id"],apiInfos:{api:"SYNO.DownloadStation.Task",version:1,path:"DownloadStation/task.cgi",method:"pause"}})},b.prototype.resumeTasks=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["id"],apiInfos:{api:"SYNO.DownloadStation.Task",version:1,path:"DownloadStation/task.cgi",method:"resume"}})},b.prototype.editTasks=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["id"],apiInfos:{api:"SYNO.DownloadStation.Task",version:2,path:"DownloadStation/task.cgi",method:"edit"}})},b.prototype.getStats=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.Statistic",version:1,path:"DownloadStation/statistic.cgi",method:"getinfo"}})},b.prototype.listRSSSites=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.RSS.Site",version:1,path:"DownloadStation/RSSsite.cgi",method:"list"}})},b.prototype.refreshRSSSites=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["id"],apiInfos:{api:"SYNO.DownloadStation.RSS.Site",version:1,path:"DownloadStation/RSSsite.cgi",method:"refresh"}})},b.prototype.listRSSFeeds=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.RSS.Feed",version:1,path:"DownloadStation/RSSfeed.cgi",method:"list"}})},b.prototype.startBTSearch=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["keyword","module"],apiInfos:{api:"SYNO.DownloadStation.BTSearch",version:1,path:"DownloadStation/btsearch.cgi",method:"start"}})},b.prototype.listBTSearch=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.DownloadStation.BTSearch",version:1,path:"DownloadStation/btsearch.cgi",method:"start"}})},b.prototype.getBTSearchCategories=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.BTSearch",version:1,path:"DownloadStation/btsearch.cgi",method:"getCategory"}})},b.prototype.cleanBTSearch=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.DownloadStation.BTSearch",version:1,path:"DownloadStation/btsearch.cgi",method:"clean"}})},b.prototype.getBTSearchModules=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.DownloadStation.BTSearch",version:1,path:"DownloadStation/btsearch.cgi",method:"getModule"}})},b}(a)}),mod(syno.FileStation,function(){var a,b,c,d;return d=require("lodash").defaults,a=mod(syno.AuthenticatedAPI),c=mod(syno.Utils),b=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}var e,f;return __extends(b,a),b.prototype.getFileStationInfo=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.FileStation.Info",version:1,path:"FileStation/info.cgi",method:"getinfo"}})},b.prototype.listSharedFolders=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.FileStation.List",version:1,path:"FileStation/file_share.cgi",method:"list_share"}})},b.prototype.listFiles=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["folder_path"],apiInfos:{api:"SYNO.FileStation.List",version:1,path:"FileStation/file_share.cgi",method:"list"}})},b.prototype.getFilesInfo=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path"],apiInfos:{api:"SYNO.FileStation.List",version:1,path:"FileStation/file_share.cgi",method:"getinfo"}})},b.prototype.startSearch=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["folder_path"],apiInfos:{api:"SYNO.FileStation.Search",version:1,path:"FileStation/file_find.cgi",method:"start"}})},b.prototype.stopSearch=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.Search",version:1,path:"FileStation/file_find.cgi",method:"stop"}})},b.prototype.listSearch=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.Search",version:1,path:"FileStation/file_find.cgi",method:"list"}})},b.prototype.cleanSearches=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.Search",version:1,path:"FileStation/file_find.cgi",method:"clean"}})},b.prototype.listVirtualFolders=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["type"],apiInfos:{api:"SYNO.FileStation.VirtualFolder",version:1,path:"FileStation/file_virtual.cgi",method:"list"}})},b.prototype.listFavorites=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.FileStation.Favorite",version:1,path:"FileStation/file_favorite.cgi",method:"list"}})},b.prototype.addFavorite=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path","name"],apiInfos:{api:"SYNO.FileStation.Favorite",version:1,path:"FileStation/file_favorite.cgi",method:"list"}})},b.prototype.deleteFavorite=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path"],apiInfos:{api:"SYNO.FileStation.Favorite",version:1,path:"FileStation/file_favorite.cgi",method:"delete"}})},b.prototype.cleanBrokenFavorites=function(a,b){return this.requestAPI({params:a,done:b,options:{api:"SYNO.FileStation.Favorite",version:1,path:"FileStation/file_favorite.cgi",method:"delete"}})},b.prototype.editFavorite=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path","name"],apiInfos:{api:"SYNO.FileStation.Favorite",version:1,path:"FileStation/file_favorite.cgi",method:"edit"}})},b.prototype.replaceAllFavorites=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path","name"],apiInfos:{api:"SYNO.FileStation.Favorite",version:1,path:"FileStation/file_favorite.cgi",method:"replace_all"}})},b.prototype.getThumbnail=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path"],apiInfos:{api:"SYNO.FileStation.Thumb",version:1,path:"FileStation/file_thumb.cgi",method:"get"}})},b.prototype.startDirSize=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path"],apiInfos:{api:"SYNO.FileStation.DirSize",version:1,path:"FileStation/file_dirSize.cgi",method:"start"}})},b.prototype.statusDirSize=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.DirSize",version:1,path:"FileStation/file_dirSize.cgi",method:"status"}})},b.prototype.stopDirSize=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.DirSize",version:1,path:"FileStation/file_dirSize.cgi",method:"stop"}})},b.prototype.startMD5=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["file_path"],apiInfos:{api:"SYNO.FileStation.MD5",version:1,path:"FileStation/file_md5.cgi",method:"start"}})},b.prototype.statusMD5=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.MD5",version:1,path:"FileStation/file_md5.cgi",method:"status"}})},b.prototype.stopMD5=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.MD5",version:1,path:"FileStation/file_md5.cgi",method:"stop"}})},b.prototype.checkWritePermission=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path"],apiInfos:{api:"SYNO.FileStation.MD5",version:1,path:"FileStation/file_md5.cgi",method:"status"}})},b.prototype.getSharingLinkInfo=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["id"],apiInfos:{api:"SYNO.FileStation.Sharing",version:1,path:"FileStation/file_sharing.cgi",method:"getinfo"}})},b.prototype.listSharingLinks=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.FileStation.Sharing",version:1,path:"FileStation/file_sharing.cgi",method:"list"}})},b.prototype.createSharingLinks=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path"],apiInfos:{api:"SYNO.FileStation.Sharing",version:1,path:"FileStation/file_sharing.cgi",method:"create"}})},b.prototype.deleteSharingLinks=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["id"],apiInfos:{api:"SYNO.FileStation.Sharing",version:1,path:"FileStation/file_sharing.cgi",method:"delete"}})},b.prototype.clearInvalidSharingLinks=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.FileStation.Sharing",version:1,path:"FileStation/file_sharing.cgi",method:"clear_invalid"}})},b.prototype.editSharingLinks=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["id"],apiInfos:{api:"SYNO.FileStation.Sharing",version:1,path:"FileStation/file_sharing.cgi",method:"edit"}})},b.prototype.createFolder=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path","name"],apiInfos:{api:"SYNO.FileStation.CreateFolder",version:1,path:"FileStation/file_crtfdr.cgi",method:"create"}})},b.prototype.rename=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path","name"],apiInfos:{api:"SYNO.FileStation.Rename",version:1,path:"FileStation/file_rename.cgi",method:"rename"}})},b.prototype.startCopyMove=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path","dest_folder_path"],apiInfos:{api:"SYNO.FileStation.CopyMove",version:1,path:"FileStation/file_MVCP.cgi",method:"start"}})},b.prototype.statusCopyMove=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.CopyMove",version:1,path:"FileStation/file_MVCP.cgi",method:"status"}})},b.prototype.stopCopyMove=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.CopyMove",version:1,path:"FileStation/file_MVCP.cgi",method:"stop"}})},b.prototype.startDelete=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path"],apiInfos:{api:"SYNO.FileStation.Delete",version:1,path:"FileStation/file_delete.cgi",method:"start"}})},b.prototype.statusDelete=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.Delete",version:1,path:"FileStation/file_delete.cgi",method:"status"}})},b.prototype.stopDelete=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.Delete",version:1,path:"FileStation/file_delete.cgi",method:"stop"}})},b.prototype["delete"]=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path"],apiInfos:{api:"SYNO.FileStation.Delete",version:1,path:"FileStation/file_delete.cgi",method:"delete"}})},b.prototype.startExtract=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["file_path","dest_folder_path"],apiInfos:{api:"SYNO.FileStation.Extract",version:1,path:"FileStation/file_extract.cgi",method:"start"}})},b.prototype.statusExtract=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.Extract",version:1,path:"FileStation/file_extract.cgi",method:"status"}})},b.prototype.stopExtract=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.Extract",version:1,path:"FileStation/file_extract.cgi",method:"stop"}})},b.prototype.listArchiveFiles=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["file_path"],apiInfos:{api:"SYNO.FileStation.Extract",version:1,path:"FileStation/file_extract.cgi",method:"list"}})},b.prototype.startCompress=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["path","dest_file_path"],apiInfos:{api:"SYNO.FileStation.Compress",version:1,path:"FileStation/file_compress.cgi",method:"start"}})},b.prototype.statusCompress=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.Compress",version:1,path:"FileStation/file_compress.cgi",method:"status"}})},b.prototype.stopCompress=function(a,b){return this.requestAPI({params:a,done:b,requiredParams:["taskid"],apiInfos:{api:"SYNO.FileStation.Compress",version:1,path:"FileStation/file_compress.cgi",method:"stop"}})},b.prototype.listBackgroundTasks=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.FileStation.BackgroundTask",version:1,path:"FileStation/background_task.cgi",method:"list"}})},b.prototype.clearFinishedBackgroundTasks=function(a,b){return this.requestAPI({params:a,done:b,apiInfos:{api:"SYNO.FileStation.BackgroundTask",version:1,path:"FileStation/background_task.cgi",method:"clear_finished"}})},f=function(a,b,e){var f,g,h,i,j,k,l,m,n,o;return o=c.optionalParamsAndDone({params:b,done:e}),b=o.params,e=o.done,c.checkRequiredParams(b,["dest_folder_path","filename"]),l=a.protocol,h=a.host,k=a.port,f="SYNO.FileStation.Upload",n="1",j="FileStation/api_upload.cgi",i="upload",m=""+l+"://"+h+":"+k+"/webapi/"+j,g=d({api:f,version:n,method:i},b),a.request.post({url:m,formData:g},function(a,b,c){return e(a?a:200!==b.statusCode?b.statusCode:c.success?null:c.error)})},b.prototype.upload=function(a,b){return syno=this.syno,syno.session?f(syno,a,b):syno.auth.login(function(c){return c?b(c):f(syno,a,b)})},e=function(a,b,e){var f,g,h,i,j,k,l,m,n,o,p;return p=c.optionalParamsAndDone({params:b,done:e}),b=p.params,e=p.done,c.checkRequiredParams(b,["path","stream"]),m=b.stream,delete b.stream,k=a.protocol,g=a.host,j=a.port,f="SYNO.FileStation.Download",o=1,i="FileStation/file_download.cgi",h="download",n=""+k+"://"+g+":"+j+"/webapi/"+i,l=d({api:f,version:o,method:h},b),a.request({url:n,qs:l,json:!1}).on("error",function(a){return e(a)}).on("end",function(){return e(null)}).pipe(m)},b.prototype.download=function(a,b){return syno=this.syno,syno.session?e(syno,a,b):syno.auth.login(function(c){return c?b(c):e(syno,a,b)})},b}(a)}),mod(syno.Syno,function(){var a,b,c,d,e,f;return f=require("request"),e=require("lodash").defaults,a=mod(syno.Auth),c=mod(syno.FileStation),b=mod(syno.DownloadStation),d=function(){function d(d){if(e(this,d,g),!this.account)throw new Error("Did not specified `account` for syno");if(!this.passwd)throw new Error("Did not specified `passwd` for syno");this.request=f.defaults({jar:!0,json:!0}),this.session=null,this.auth=new a(this),this.fs=this.fileStation=new c(this),this.dl=this.downloadStation=new b(this)}var g;return g={protocol:"http",host:"localhost",port:5e3},d}()}),mod(syno.Utils,function(){var a,b,c,d,e;return e=require("lodash"),c=e.isFunction,d=e.isPlainObject,b=e.each,a=function(){function a(){}return a.optionalParamsAndDone=function(a){var b,e;return null==a&&(a={}),e=a.params,b=a.done,b||(a.done=c(e)?e:function(){}),d(e)||(a.params={}),a},a.checkRequiredParams=function(a,c){return null==c&&(c=[]),b(c,function(b){if(!a[b])throw new Error(""+b+" param is required")})},a}()}),module.exports=mod(syno.Syno);