var cacheVer='v2';


self.addEventListener('install',event=>{
    event.waitUntil(
    caches.open(cacheVer).then(cache=>{
        return cache.addAll([
            '/',
            '/index.html',
            '/restaurant.html',
            '/css/styles.css',
            '/data/restaurants.json',
            '/js/',
            '/js/dbhelper.js',
            '/js/main.js',
            '/js/restaurant_info.js',
            '/js/register.js'
        ]).catch(err=>{
            console.log("Caches dint open"+err);
        });
    })
    );
});


self.addEventListener('fetch',event=>{
    let cacheReq= event.request;
    let cacheUrlObj= new Url(event.request.url);
    if(event.request.url.indexOf('restaurant.html')>-1){
        const cacheUrl= 'restaurant.html';
        event.request.node="NO CORS";
    }
    event.respondWith(
    caches.match(cacheReq).then(resp=>{
        return(
        res|| fetch(event.request).then(fetchResponse=>{
            return caches.open(cacheVer).then(cache=>{
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            });
        }).catch(err=>{
            
            if(event.request.url.indexOf('jpg')>-1){
                return caches.match('/img/na.png');
            }
            
            return new Response('Application is not connected to the internet.',{
                status:404,
                statusText:'Sorry 4 YA!';
            });
        })
        );
    })
    
    );
    
});