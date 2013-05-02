#Fileline
Add JavaScript or CSS files in the order you want and execute your own functions when they're done or something went wrong. The callbacks are optional, but the files are real. This is a standalone script, so it runs on its own.

##Usage examples
fl('url1, url2, url3');  
fl('url1, url2, url3', successCallback);  
fl('url1, url2, url3', successCallback, errorCallback);  
fl('url1, url2, url3', null, errorCallback);

##Details
'url1, url2, url3': string of URLs separated by commas;  
successCallback: name of the function you want to run after all the files are done loading (optional);  
errorCallback: name of the function you want to run if some file doesn't load as expected (optional);