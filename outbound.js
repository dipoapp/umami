document.addEventListener('click', function (event) {
    var link = event.target;
    while(link && (typeof link.tagName == 'undefined' || link.tagName.toLowerCase() != 'a' || !link.href)) {
        link = link.parentNode
    }
    if (link && link.href && link.host && link.host !== location.host) {
        umami.track('Outbound Link', { link: link.href });
        // Allow event to be sent before the page is unloaded
        if(!link.target || link.target.match(/^_(self|parent|top)$/i)) {
            setTimeout(function() { location.href = link.href; }, 150);
            event.preventDefault();
        }
    }
});
