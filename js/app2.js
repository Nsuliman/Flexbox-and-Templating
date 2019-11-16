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
  Horns.all.forEach( thing =>  {
    html = template(thing);
  });
  $('#photo-template').append(html);
};

function populateSelectBox() {
  let seen = {};
  let select = $('select');
  Horns.all.forEach( (horn) => {
    if ( ! seen[horn.keyword] ) {
      let option = `<option value="${horn.keyword}">${horn.keyword}</option>`;
      select.append(option);
      seen[horn.keyword] = true;
    }
  });
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

$.get('../data/page-2.json')
  .then( data => {
    data.forEach( (thing) => {
      let horn = new Horns(thing);
      horn.render();
    });
  })
  .then( () => populateSelectBox() );

$('button').on('click', function() {
  Horns.all.sort((obj1,obj2) => {return obj1.title < obj2.title ? -1 : 1;});
  $('#photo-template').html('');
  var source   = $('#entry-template').html();
  var template = Handlebars.compile(source);
  var html = [];
  Horns.all.forEach( thing =>{
    html.push(template(thing));
  });
  // console.log('html : ', html);
  $('#photo-template').append(html);
});
