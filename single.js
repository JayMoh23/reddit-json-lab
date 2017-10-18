var url = location.search.substring(1).split('=')[1];
/*grab data*/
$.get('https://www.reddit.com' + url + '.json')
.then(function(success){
    var data = success[0];
    var post = configureResponse(data);

    /*create variables for post*/
    var container = document.createElement('div');
    var heading = document.createElement('h3');
    var image = document.createElement('img');

    /*append data to page*/
    heading.innerText = post.title;
    image.setAttribute('src' ,formatSrc(post));
    container.appendChild(heading);
    container.appendChild(image);
    document.body.appendChild(container);

});

/*assign and return data*/
function configureResponse(data) {
    var children = data.data.children;

    var result = children.map(function(child,i){
        console.log(child);
        var post = {};
        post.thumbnail = child.data.thumbnail;
        post.title = child.data.title;
        post.url = child.data.url;
        post.permaLink = child.data.permaLink;

        return post;
    });

    if (result.length === 1) {
        return result [0];
    }

    return result;
}


function formatSrc(post) {
    if (/\.(gif|.gifv|jpg|jpeg|tiff|png)$/i.test(post.url)) {
        if (post.url.indexOf('.gifv') != -1) {
            return post.url.replace('.gifv', '.gif');
        }

        return post.url;
    }

    return post.thumbnail;
}