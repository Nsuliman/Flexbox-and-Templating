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

Horns.prototype.render = function() { 
var source   = $("#entry-template").html();  
var template = Handlebars.compile(source);
var html;

Horns.all.forEach( thing =>
    {
         html = template(thing);
    });
    console.log('Horns.all new Array  : ', Horns.all);

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

  // console.log(seen);
}
var array = [];
$('select').on('change', function() {
  let selected = $(this).val();
  if (selected === 'default')
  {
    
    Horns.all.sort((obj1,obj2) => {return obj1.title < obj2.title ? -1 : 1;});

    // $('#photo-template').empty();
      // var source   = $("#entry-template").html();  
      // var template = Handlebars.compile(source);
      // var  x = $('#photo-template'); 
      // console.log('Horns.all Old Array  : ', Horns.all );
      $('#photo-template').html('');
      // Horns.all.forEach(animal => {
      //   // animal.render();
      //   // console.log(animal);
      // });


      var source   = $("#entry-template").html();  
var template = Handlebars.compile(source);
var html;

Horns.all.forEach( thing =>
    {
         html = template(thing);
         $('#photo-template').append(html);
    });
    // console.log('Horns.all new Array  : ', Horns.all);



      // Horns.all.forEach( thing =>
      //     {
      //          html = template(thing);
      //          array.push(html);
               
      //         });
      //         for (var i = 0 ; i < array.length ; i++){
      //           var y = array[i];
      //           console.log(y);
      //           x.append(y).show();
      //         }

    // $('div').show();
    // Horns.render();
    // $(`.${selected}`).fadeIn(800);
  }
  else {
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

  // $('button').on('click', function() {
  //   let selected = $(this).val();
  //   if (selected === 'default')
  //   {
  //     $('div').show();
  //     $(`.${selected}`).fadeIn(800);
  //   }
  //   else {
  //     $('div').hide();
  //     $(`.${selected}`).fadeIn(800);
  //   }
  // });
