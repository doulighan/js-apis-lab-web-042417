const auth = "708dd358a9bbc9b22c62400940339601616d5824"

var createGist = function(username, file_name, content, 
  description, token){

  var file_obj = {}
  file_obj[file_name] = {content: content}

   var data = {
      description: description,
      public: true,
      files: file_obj
    }

  $.ajax({
    url: `https://api.github.com/gists`,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: `token ${token}`
    },
    data: JSON.stringify(data),
    
   }).success(console.log("Saved!"))
}

var myGists = function (username, token){
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      renderMyGists(data)
    }
  })
}

var renderMyGists = function (data) {
  $('#list').empty()
  var html = `<div class="col-md-4 car">` + data.map( g => {
    for (key in g.files) { var name = key }
    return (
    `<div>
      <a href="${g.html_url}">${name}</a>
      <p>${g.description}<p>
      <hr>
    </div>`
    )
  }).join('') + `</div>`
  $('#list').append(html)
}



var bindCreateButton = function() {
  $('#btn').on('click', (e) => {
    e.preventDefault()
    var username = $('#username').val()
    var token = $('#token').val()
    var filename = $('#filename').val()
    var description = $('#description').val()
    var content = $('#content').val()
    createGist(username, filename, content, description, token)
    })

  $('#view').on('click', (e) => {
    e.preventDefault()
    var username = $('#username').val()
    myGists(username)
  })
};

$(document).ready(function(){
  bindCreateButton()
});
