/*Grab data*/
$.get('https://www.reddit.com/r/space.json')
.then(function(success){
    var posts = configureResponse(success);

    /*create variables for posts*/
   posts.forEach(function(post){
       var container = document.createElement('div');
       var heading = document.createElement('h3');
       var a = document.createElement('a');
       var image =  document.createElement('img');

        /*append data to page*/
       heading.innerText = post.title;
       a.setAttribute('href', 'single.html?url=' + post.permalink);
       image.setAttribute('src', formatSrc(post));
       a.appendChild(heading);
       container.appendChild(a);
       container.appendChild(image);
       document.body.appendChild(container);
   });
});

/*assign and return data*/
function configureResponse(data) {
    var children = data.data.children;

    return children.map(function(child, i){
        var post = {};
        post.thumbnail = child.data.thumbnail;
        post.title = child.data.title;
        post.url = child.data.url;
        post.permalink = child.data.permalink;

        return post;
    });
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


