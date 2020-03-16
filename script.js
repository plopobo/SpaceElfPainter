(function( $ ) {
    // Toggle sidebar button
    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
        $('#btnReset').on('click', function() {
            $(svgColor).each(function(){
              TweenMax.to(this, fillSpeed, { fill: "#FFF" });
            });
        });
    });

    var svgObject, svgColor;
    var colorHolder, colourSet;
    var chosenColor = '#FFFFFF';
    var textCol = 'White';
    var colourObj = { '#FFFFFF':'White Scar', '#FFF200':'Flash Gitz Yellow', '#F46C2E':'Troll Slayer Orange', '#C21920':'Evil Sunz Scarlet', '#8C0A0C':'Wazdakka Red', '#471F5E':'Xereus Purple', '#7761AA':'Genestealer Purple', '#231F20':'Abaddon Black', '#3D4B4D':'Mechanicus Standard Grey', '#8E8C97':'Slaanesh Grey', '#1F56A8':'Altdorf Guard Blue', '#33A2CF':'Lothern Blue', '#52B246':'Moot Green', '#00401E':'Caliban Green', '#B94278':'Emperor’s Children' };
    var fillSpeed = .5;
      
      
    function colorMe() {
      TweenMax.to(this, fillSpeed, { fill: chosenColor });
    }
    function swatchClick(){
      chosenColor = $(this).data('color')
      var textCol = invertColor(chosenColor, true)
      $('#selectedColour').css('color', textCol);
      $('#selectedColour').text(colourObj[chosenColor]);
      $('#selectedColour').css('background-color', chosenColor);
      TweenMax.to(colorHolder, fillSpeed, { backgroundColor:chosenColor, color:textCol })
    }
    function colorRollover(e){
      var rollover = (e.type == 'mouseenter')? {scale:1.2}:{scale:1};
      TweenMax.to($(this), 0.05, rollover); 
    }
    function invertColor(hex, bw) {
      if (hex.indexOf('#') === 0) {
          hex = hex.slice(1);
      }
      var r = parseInt(hex.slice(0, 2), 16),
          g = parseInt(hex.slice(2, 4), 16),
          b = parseInt(hex.slice(4, 6), 16);
      if (bw) {
          // http://stackoverflow.com/a/3943023/112731
          return (r * 0.299 + g * 0.587 + b * 0.114) > 186
              ? '#000000'
              : '#FFFFFF';
      }
      // invert color components
      r = (255 - r).toString(16);
      g = (255 - g).toString(16);
      b = (255 - b).toString(16);
      // pad each with zeros and return
      return "#" + padZero(r) + padZero(g) + padZero(b);
    }

    function btnReset(){

    }
  
    $.fn.loadSwatches = function(colourSet) {
      
      var swatchHolder = $('<ol/>', {'class': 'swatchHolder'}).appendTo(this)
       
      for (let [hexC, colName] of Object.entries(colourObj)) {
        var swatch = $('<li>' + colName + '</li>').appendTo(swatchHolder)
        textCol = invertColor(hexC, true)
        $(swatch).css('background-color', hexC)
        $(swatch).css('color', textCol)
        $(swatch).data('color', hexC)
        $(swatch).on('click', swatchClick)
        $(swatch).on('mouseenter mouseleave', colorRollover)
      }
    } 

    $.fn.makeSVGcolor = function(svgURL) {
        $(this).load(svgURL, function() {
          svgObject  = $('svg', this)
          svgColor   = $('g:nth-child(2)', svgObject).children()
          svgOutline = $('g:nth-child(1)', svgObject).children()
          $(svgColor).on('click', colorMe)
        });
      }
}( jQuery ))

$('#ActivityDIV').makeSVGcolor('https://srv-file5.gofile.io/download/wcEcY4/GuardianV4.svg')
$('#swatchesIDbase').loadSwatches('base')