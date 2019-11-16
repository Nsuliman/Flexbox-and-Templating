'use strict';

function Horns(data) {
  this.image_url = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  Horns.all.push(this);
}
Horns.all = [];
// var html = [];

Horns.prototype.render = function() {
  var source   = $('#entry-template').html();
  var template = Handlebars.compile(source);
  var html;
  // Horns.all.forEach( thing => {
  html = template(this);
  // });
  $('#photo-template').append(html);
};

function populateSelectBox() {
  let seen = {};
  var source   = $('#options-template').html();
  var template = Handlebars.compile(source);
  var array = [];
  $('select').empty();
  $('select').html('<option value="default">Filter by Keyword</option>');
  Horns.all.forEach( (thing) => {
    if ( ! seen[thing.keyword] ) {
      array.push(template(thing));
      seen[thing.keyword] = true;
    }
  });
  $('select').append(array);
}

$('select').on('change', function() {
  let selected = $(this).val();
  if (selected === 'default') {
    $('div').show();
    $(`.${selected}`).fadeIn(800);
  }else {
    $('div').hide();
    $(`.${selected}`).fadeIn(800);
  }
});

$('#page2').on('click', function() {
  $('#photo-template').empty();
  Horns.all = [];
  $.get('../data/page-2.json')
    .then( data => {
      data.forEach( (thing) => {
        let horn = new Horns(thing);
        horn.render();
      });
    })
    .then( () => populateSelectBox() );
});

$('#page1').on('click', function() {
  $('#photo-template').empty();
  Horns.all = [];
  $.get('../data/page-1.json')
    .then( data => {
      data.forEach( (thing) => {
        let horn = new Horns(thing);
        horn.render();
      });
    })
    .then( () => populateSelectBox() );
});

$('button').on('click', function() {
  Horns.all.sort((obj1,obj2) => {return obj1.title < obj2.title ? -1 : 1;});
  $('#photo-template').html('');
  var source   = $('#entry-template').html();
  var template = Handlebars.compile(source);
  var html = [];
  Horns.all.forEach( thing =>{
    html.push(template(thing));
  });
  $('#photo-template').append(html);
});




function showData(pageNum) {
  $('#photo-template').html('');
  Horns.all = [];
  $.get(`../data/page-${pageNum}.json`)
    .then(data => {
      data.forEach(thing => {
        let horn = new Horns(thing);
        horn.render();
      });
    })
    .then(() => populateSelectBox());
}

$(document).ready(function () {
  showData(1);
});
