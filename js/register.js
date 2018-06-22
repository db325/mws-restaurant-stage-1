if('serviceworker' in navigator){
    
    navigator.serviceWorker.register('/sw.js').then(reg=>{
        console.log("SW registered"+reg.scope);
    }).catch (err=>{
                console.log("SW failed: "+err);

    });
    
    
}