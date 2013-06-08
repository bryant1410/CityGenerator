
// comments? bwahahahah.
// wait, you're serious? let me laugh harder- BWWWWWAAAAAAAAHAHAHAHAHAHA

function create_flag(seed) {
    var canvas=document.getElementById('flag');
    $.get(
        "http://devcitygenerator.morgajel.net/flaggenerator?type=json&seed="+seed,
        function(params) {
            var flag=canvas.getContext('2d');
            params.canvas=canvas;
            params.flag=flag;

            params.canvas.width=canvas.height*params.ratio;
            console.log(params);

            params.flag=set_shape( params );
            params.flag.clip();

            params.flag=select_division( params );
            //params.flag=select_overlay( params );
            //flag=select_symbol( params );
            //flag=select_border( params );
        }, "json"
    );
}

function set_shape(params){
    var width=params.canvas.width;
    var height=params.canvas.height;
    var flag=params.flag;
    flag.save();
    flag.fillStyle = "rgba(0, 0, 0, .0)"
    flag.lineWidth = 1
    switch(params.shape){
        case 'para':
            flag.moveTo(    0,        0);
            flag.lineTo(    width,    height/6);
            flag.lineTo(    width,    height-height/6);
            flag.lineTo(    0,        height);
            break;
        case 'tri':
            flag.moveTo(    0,        0);
            flag.lineTo(    width,    height/2);
            flag.lineTo(    0,        height);
            break;
        case 'pennant':
            flag.moveTo(    0,        0);
            flag.lineTo(    width,    height/5*2);
            flag.lineTo(    width,    height/5*3);
            flag.lineTo(    0,        height);
            break;
        case 'swallow':
            flag.moveTo(    0,                0);
            flag.lineTo(    width,            height/3*1);
            flag.lineTo(    width-width/5,    height/2);
            flag.lineTo(    width,            height/3*2);
            flag.lineTo(    0,                height);
            break;
        case 'tongued':
             flag.moveTo(    0,                0);
             flag.lineTo(    width,            0);
             flag.lineTo(    width,            height/11*1);
             flag.lineTo(    width-width/11,   height/11*1);
             flag.lineTo(    width-width/11,   height/11*2);

             flag.lineTo(    width,            height/11*2);
             flag.lineTo(    width,            height/11*3);
             flag.lineTo(    width-width/11,   height/11*3);
             flag.lineTo(    width-width/11,   height/11*4);

             flag.lineTo(    width,            height/11*4);
             flag.lineTo(    width,            height/11*5);
             flag.lineTo(    width-width/11,   height/11*5);
             flag.lineTo(    width-width/11,   height/11*6);

             flag.lineTo(    width,            height/11*6);
             flag.lineTo(    width,            height/11*7);
             flag.lineTo(    width-width/11,   height/11*7);
             flag.lineTo(    width-width/11,   height/11*8);

             flag.lineTo(    width,            height/11*8);
             flag.lineTo(    width,            height/11*9);
             flag.lineTo(    width-width/11,   height/11*9);
             flag.lineTo(    width-width/11,   height/11*10);

             flag.lineTo(    width,            height/11*10);
             flag.lineTo(    width,            height);
             flag.lineTo(    0,                height);
            break;
        default:
            flag.rect(0,0,width,height);
    }
    flag.fill();
    flag.save();
    return flag;
}

// Division should only use colors 0,1 and 2 at most.
function select_division( params){

    switch(params.division.name){
        case 'quads':
            params.flag = draw_quads( params );
            break;
        case 'diagquad':
            params.flag = draw_quaddiagonals( params );
            break;
        case 'diagonal':
            params.flag = draw_diagonals( params );
            break;
        case 'stripes':
            params.flag = draw_stripes( params );
            break;
        default:
            params.flag = draw_solid( params );
    }
    return params.flag;
}

//    // overlay should use colors 3 
//    function select_overlay(flag, params){
//    
//        switch(params.overlay){
//            case 'quaddiag':
//                flag= draw_quaddiagonal(params, 3);
//                break;
//            case 'quad':
//                flag= draw_quad(params, params.overlay, 3);
//                break;
//            case 'stripe':
//                flag= draw_stripe(flag, params, 3);
//                break;
//            case 'jack':
//                flag= draw_jack(flag,params, 3);
//                flag= draw_jack(flag,params, 2);
//                break;
//            case 'asterisk':
//                flag= draw_asterisk(flag,width,height,colorlist[3]);
//                flag= draw_asterisk(flag,width,height,colorlist[2]);
//                break;
//            case 'x':
//                flag= draw_x(flag,width,height, undefined,colorlist[3]);
//                flag= draw_x(flag,width,height, undefined,colorlist[2]);
//                break;
//            case 'cross':
//                flag= draw_cross(flag, width, height, undefined, undefined, undefined, undefined, colorlist[3]);
//                break;
//            case 'diamond':
//                flag= draw_diamond(flag,width,height,colorlist[3]);
//                break;
//            case 'circle':
//                flag=draw_circle(flag,  width, height, 1/2, 1/2, undefined, colorlist[3] );
//                break;
//            case  'rays':
//                flag = draw_rays( flag, width, height, undefined,undefined,undefined, undefined, colorlist[3] );
//                break;
//        }
//        return flag;
//    }
//    
//    function draw_asterisk(flag, width,height,color){
//            flag= draw_stripe(flag, width, height, undefined, 5, 3, color);
//            flag= draw_x(flag, width, height, undefined, color);
//            return flag;
//    }
//    function draw_jack(flag, width,height,color){
//            flag= draw_cross(flag, width, height, undefined, 1/2, undefined, 1/2, color);
//            flag= draw_x(flag,width,height,undefined,color);
//            return flag;
//    }
//    
//    function select_symbol(flag, width, height, letter, colorlist){
//        var symbol = getQueryString()['symbol'];
//        var chance= symbol || d( 60 )  ; 
//    
//        if (chance <10 || symbol=='circle'){
//            flag=draw_circle(flag,  width, height, undefined, undefined, undefined, colorlist[4] );
//        } else if (chance <20 || symbol=='star'){
//            flag= draw_star(flag, width, height, undefined, undefined, colorlist[4]);
//        } else if (chance <30 || symbol=='letter'){
//            flag= draw_letter(flag, width, height, undefined, letter, undefined, undefined, colorlist[4]);
//        }
//        return flag;
//    }
//    
//    function draw_letter(flag, width, height, axis, letter, font, size, color){
//        letter = getQueryString()['letter'] || letter || '#' ;
//        var axislist=Array(  1/4,1/2 );
//        axis = axis || axislist[ d( axislist.length ) ];
//        var sizelist=Array(  30,40,50,60,70,80);
//        size=size|| sizelist[ d(axislist.length)];
//        var fontlist=Array(
//                        "Arial Black", "Comic Sans MS Bold", "Courier New Bold", 
//                        "Courier New Bold Italic", "Impact", "Lucida Console", 
//                        "Trebuchet MS", "Trebuchet MS Bold", "Trebuchet MS Italic",
//                        "Trebuchet MS Bold Italic", "Verdana", "Verdana Bold", 
//                        "Verdana Bold Italic", "sans serif"
//                        );
//        font = font || fontlist[ d( fontlist.length ) ];
//    
//        flag.fillStyle=color||random_color();
//    
//        //c6_context.font = 'italic bold 30px sans-serif';
//        flag.textBaseline = 'middle';
//        flag.font=size+"px bold "+font;
//    //    flag.fillText("Hello World",10,50)
//    //    flag.font="normal 50px Verdana";
//        flag.fillText(letter, width*axis-size/2+size/10, height*axis);
//    
//        return flag;
//    
//    }
//    
//    function select_border(flag, width, height, colorlist){
//        var border=getQueryString()['border'];
//        var chance=border||  d( 30 )  ;
//     
//        if (chance < 10 || border == 'true'){
//            flag=draw_border( flag, width, height, undefined, colorlist  );
//        }
//        return flag;
//    }
function draw_solid( params){
        params.flag.fillStyle=params.colors[0].hex;
        params.flag.fillRect(0,0, params.canvas.width,params.canvas.height); 
        return params.flag;

}
//    
//    
//    function draw_slash(flag, width,height,linesize,direction,color){
//    
//        var linesizes=Array(1/6, 1/8, 1/9, 1/10, 1/12, 1/15, 1/20);
//        linesize =linesize||linesizes[ d( linesizes.length ) ] ;
//    
//        var directions=Array('left','right');
//        direction = direction||directions[ d( directions.length ) ] ;
//        flag.beginPath();
//    
//        var linewidth=linesize*width;
//        var lineheight=linesize*height;
//    
//        if (direction =='left'){
//            flag.moveTo(    0,                      0);
//            flag.lineTo(    linewidth,              0);
//            flag.lineTo(    width,                  height-lineheight);
//            flag.lineTo(    width,                  height);
//            flag.lineTo(    width-linewidth,        height);
//            flag.lineTo(    0,                      lineheight);
//        }else{
//            flag.moveTo(    width-linewidth,        0);
//            flag.lineTo(    width,                  0);
//            flag.lineTo(    width,                  lineheight);
//            flag.lineTo(    linewidth,              height);
//            flag.lineTo(    0,                      height);
//            flag.lineTo(    0,                      height-lineheight);
//        }
//        flag.fillStyle=color||random_color();
//        flag.fill();
//        return flag;
//    }
//    
//    
//    
//    function draw_x(flag, width, height, thickness, color){
//        var linewidths=Array( 1/6, 1/8, 1/9, 1/10, 1/12, 1/15, 1/20);
//        thickness = thickness|| linewidths[ d( linewidths.length ) ] ;
//        flag=draw_slash(flag,width,height,thickness,'left',color);
//        flag=draw_slash(flag,width,height,thickness,'right',color);
//        return flag;
//    }
//    function draw_cross(flag, width, height, vlinewidth, vlinecenter, hlinewidth, hlinecenter, color){
//        flag.fillStyle=color||random_color();
//    
//        //var linewidths=Array(1/6,1/4);
//        var linewidths=Array( 1/6, 1/8, 1/9, 1/10, 1/12, 1/15, 1/20);
//        var linecenters=Array(1/6, 1/4, 1/3, 1/2, 2/3, 3/4, 5/6  );
//    
//        vlinewidth  =(vlinewidth || linewidths[ d( linewidths.length )])*width ;
//        vlinecenter =(vlinecenter || linecenters[d( linecenters.length )])*width;
//        flag.fillRect( vlinecenter-(vlinewidth/2), 0 , vlinewidth,  height );
//    
//        hlinewidth  = (hlinewidth||  linewidths[ d(linewidths.length  )])*width ;
//        hlinecenter = (hlinecenter|| linecenters[d(linecenters.length )])*height;
//        flag.fillRect( 0,hlinecenter-(hlinewidth/2) , width,  hlinewidth );
//        return flag;
//    }
//    
//    
//    
//    function draw_border(flag, width, height, thickness,colorlist){
//        thickness=thickness|| d(10)+2 ;
//        var color=colorlist[2] ||random_color();
//        flag.beginPath();
//        flag.lineWidth=thickness;
//        flag.moveTo(0+thickness/2,0+thickness/2);
//        flag.lineTo(width-thickness/2,0+thickness/2);
//        flag.lineTo(width-thickness/2,height-thickness/2);
//        flag.lineTo(0+thickness/2,height-thickness/2);
//        flag.lineTo(0+thickness/2,0);
//        flag.strokeStyle=color;
//        flag.stroke();
//        return flag;
//    
//    }
//    
//    
//    function draw_rays(  flag, width, height, x, y, count, offset, color ){
//        var raycounts=Array(8,9,15 );
//        var offsets=Array(0, 1/8, 1/16, 1/4, 1/3, 1/2, 2/3  );
//        var axisoffsets=Array(0, 1/8, 1/16, 1/4, 1/3, 1/2, 2/3, 1  );
//    
//        // X and Y are the center of the burst
//        x=(x||axisoffsets[d(axisoffsets.length)]) * width;
//        y=(y||axisoffsets[d(axisoffsets.length)]) * height;
//    
//        //count is how many rays
//        count=count ||raycounts[d(raycounts.length)];
//        // how far from the center they start
//        offset=offset ||offsets[d(offsets.length)];
//    
//        var angle=360/count;
//    
//        flag.fillStyle=color||random_color();
//        flag.translate(x,y);
//        while (count-- >0){
//            flag.beginPath();
//            flag.moveTo(0,-offset*width/2);
//            flag.lineTo(0,-width*1.5);
//            flag.rotate(angle/2 * Math.PI/180);
//            flag.lineTo(0,-width*1.5);
//            flag.lineTo(0,-offset*width/2);
//    
//            flag.closePath();
//            flag.fill();
//            flag.rotate(angle/2 * Math.PI/180);
//        }
//        flag.translate(-x,-y);
//        return flag;
//    }
//    
//    
//    //canvas, x of center, y of center, radius, number of points, fraction of radius for inset).
//    function draw_star(flag, width, height, points,inset,color) {
//    
//        var pointcounts=Array( 4, 5, 6, 8, 12, 20 );
//        var insetlist=Array( 1/4, 1/3, 1/2 );
//    
//        points = points|| pointcounts[ d( pointcounts.length ) ] ;
//        inset  = inset || insetlist[   d( insetlist.length ) ];
//    
//    
//        var xaxis=Array( 1/4, 1/2, 3/4 );
//        var yaxis=Array( 1/4, 1/2  );
//        
//        xaxis = xaxis[d( xaxis.length )] ;
//        yaxis = yaxis[d( yaxis.length )] ;
//        var radius=Math.min( width*xaxis, width*(1-xaxis),height*yaxis, height*(1-yaxis) );
//    
//        flag.fillStyle=color||random_color();
//        flag.beginPath();
//        flag.translate(width*xaxis, height*yaxis);
//        flag.moveTo(0,0-radius);
//        for (var i = 0; i < points; i++) {
//            flag.rotate(Math.PI / points);
//            flag.lineTo(0, 0 - (radius*inset));
//            flag.rotate(Math.PI / points);
//            flag.lineTo(0, 0 - radius);
//        }
//        flag.fill();
//        flag.translate(-width*xaxis,- height*yaxis);
//        return flag;
//    }
//    
//    
//    function draw_diamond(flag, width, height, color){
//        flag.beginPath();
//        flag.moveTo(width/2,0);
//        flag.lineTo(width,height/2);
//        flag.lineTo(width/2,height);
//        flag.lineTo(0,height/2);
//        flag.fillStyle=color||random_color();
//        flag.fill();
//        return flag;
//    
//    }
//        //   condensed awesomeness  http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html
//        // allows for seeding of random. it's random enough, STFU. 
//        (function(j,i,g,m,k,n,o){function q(b){var e,f,a=this,c=b.length,d=0,h=a.i=a.j=a.m=0;a.S=[];a.c=[];for(c||(b=[c++]);d<g;)a.S[d]=d++;for(d=0;d<g;d++)e=a.S[d],h=h+e+b[d%c]&g-1,f=a.S[h],a.S[d]=f,a.S[h]=e;a.g=function(b){var c=a.S,d=a.i+1&g-1,e=c[d],f=a.j+e&g-1,h=c[f];c[d]=h;c[f]=e;for(var i=c[e+h&g-1];--b;)d=d+1&g-1,e=c[d],f=f+e&g-1,h=c[f],c[d]=h,c[f]=e,i=i*g+c[e+h&g-1];a.i=d;a.j=f;return i};a.g(g)}function p(b,e,f,a,c){f=[];c=typeof b;if(e&&c=="object")for(a in b)if(a.indexOf("S")<5)try{f.push(p(b[a],e-1))}catch(d){}return f.length?f:b+(c!="string"?"\0":"")}function l(b,e,f,a){b+="";for(a=f=0;a<b.length;a++){var c=e,d=a&g-1,h=(f^=e[a&g-1]*19)+b.charCodeAt(a);c[d]=h&g-1}b="";for(a in e)b+=String.fromCharCode(e[a]);return b}i.seedrandom=function(b,e){var f=[],a;b=l(p(e?[b,j]:arguments.length?b:[(new Date).getTime(),j,window],3),f);a=new q(f);l(a.S,j);i.random=function(){for(var c=a.g(m),d=o,b=0;c<k;)c=(c+b)*g,d*=g,b=a.g(1);for(;c>=n;)c/=2,d/=2,b>>>=1;return(c+b)/d};return b};o=i.pow(g,m);k=i.pow(2,k);n=k*2;l(i.random(),j)})([],Math,256,6,52);
//    //==================================================================
//    
//    
//    function draw_circle(flag, width, height,x, y, radius, color){
//        var xaxis=Array(  1/4, 1/2 );
//        var radiusmultipliers=Array( 1/2, 3/4, 1 );
//        var radiusmultiplier= radiusmultipliers[d( radiusmultipliers.length)];
//    
//        x= x || xaxis[d(xaxis.length)];
//    //    y= y || xaxis[d(xaxis.length)];
//    
//        radius=radius||(Math.min( width*(x) , height*(y), width*(1-x) , height*(1-y)  )-10)*radiusmultiplier;
//    
//        flag.beginPath(); // Start the path
//        flag.arc(width*x,height*y, radius, 0, Math.PI*2, false ); // Draw a circle
//        flag.closePath(); // Close the path
//        flag.fillStyle=color||random_color();
//        flag.fill(); // Fill the path
//        return flag;
//    
//    }
//    
    function draw_stripes(params){
        for (var i=0; i<=params.division.count; i++){
            flag=draw_stripe(params, i);
        }
        return flag;
    }
    
    
    function draw_stripe(params, id,color){
    
        if (! color){
            var colorid=id % params.division.color_count;
            color=params.colors[colorid].hex;
        }
        params.flag.fillStyle=color;
    
        if (params.division.side=="horizontal"){
            var thickness=Math.floor(params.canvas.height/params.division.count);
            params.flag.fillRect(0, (thickness*id)   ,params.canvas.width,thickness);
            
        }else {
            var thickness=Math.floor(params.canvas.width/params.division.count);
            params.flag.fillRect( (thickness*id),0 ,thickness  ,params.canvas.height);
        }
        return params.flag;
    }
    
    
function draw_quad(params, quadrant, color){
    var a=0,b=0,c=params.canvas.width/2, d=params.canvas.height/2;
    console.log("printing Quadrant "+quadrant);
    if (quadrant == "ne" || quadrant == "se" ){
        a=params.canvas.width/2;
    }
    if (quadrant == "se" || quadrant == "sw" ){
        b=params.canvas.height/2;
    }


    if ( color == undefined) {
        if (quadrant == "nw" || quadrant == "se" ){
            color=params.colors[0].hex;
        }else{
            color=params.colors[1].hex;
        }
    }

    console.log("which is  "+color);
    
    params.flag.fillStyle=color;
    console.log("and covers points  "+a+" "+b+" "+c+" "+d+"");

    params.flag.fillRect( a, b, c, d );
    return params.flag;
}


function draw_quads(params){

    params.flag=draw_quad( params, "nw" );
    params.flag=draw_quad( params, "ne" );
    params.flag=draw_quad( params, "sw" );
    params.flag=draw_quad( params, "se" );
    return params.flag
}


function draw_quaddiagonals(params){
     params.flag=draw_quaddiagonal( params, "north" );
     params.flag=draw_quaddiagonal( params, "south" );
     params.flag=draw_quaddiagonal( params, "east"  );
     params.flag=draw_quaddiagonal( params, "west"  );
     return params.flag;
}


function draw_quaddiagonal(params, side, color){
    var a=0, b=0, c=0,d=0;
    if (side=="east" ){a=params.canvas.width}
    if (side=="south" ){b=params.canvas.height}
    if (side=="north" || side=="east"  ||side=="south"){c=params.canvas.width}
    if (side=="east"  || side=="south" ||side=="west" ){d=params.canvas.height}
 
    if (!color ){
        if (side == "north" || side == "south"){
            color=params.colors[0].hex;
        }else{
            color=params.colors[1].hex;
        }
    }
    params.flag.save();
    params.flag.beginPath();
    params.flag.moveTo(a,b);
    params.flag.lineTo(c,d);
    params.flag.lineTo(params.canvas.width/2,params.canvas.height/2);
    params.flag.fillStyle=color;
    params.flag.fill();
    params.flag.restore();

    return params.flag;
 }
 
 
function draw_diagonal(params, side, color ){
    var start,mid,end;

    if (side == "north" && params.division.direction == "left-to-right"){
        start=[0,0];
        mid=[params.canvas.width,0];
        end=[params.canvas.width,params.canvas.height];

    }else if (side == "south" && params.division.direction == "left-to-right"){
        start=[0,0];
        mid=[0,params.canvas.height];
        end=[params.canvas.width,params.canvas.height];

    }else if (side == "north" && params.division.direction == "right-to-left"){
        start=[params.canvas.width,0];
        mid=[0,0];
        end=[0,params.canvas.height];

    }else if (side == "south" && params.division.direction == "right-to-left"){
        start=[params.canvas.width,0];
        mid=[params.canvas.width,params.canvas.height];
        end=[0,params.canvas.height];
    }
    if (! color){
        if (side == "north"){
            color=params.colors[0].hex;
        }else{
            color=params.colors[1].hex;
        }
    }

    params.flag.save(); 
    params.flag.beginPath();
    params.flag.moveTo(start[0],start[1]);
    params.flag.lineTo(mid[0],mid[1]);
    params.flag.lineTo(end[0],end[1]);
    params.flag.fillStyle=color;
    params.flag.fill();
    params.flag.restore(); 
    return params.flag;
}


function draw_diagonals(params ){

    params.flag=draw_diagonal(params, "north") ;
    params.flag=draw_diagonal(params, "south") ;
    return flag;
}
//    
//    function getQueryString() {
//        var result = {}, queryString = location.search.substring(1),
//            re = /([^&=]+)=([^&]*)/g, m;
//        while (m = re.exec(queryString)) {
//            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
//        }
//        return result;
//    }
//    
//    /* ************************************************************* */
//    /*
//    /*  This is a quick and dirty function to select five
//    /*  non-repeating colors for the flag.
//    /*  colors[0] is the base
//    /*  colors[1] is the division secondary
//    /*  colors[2] is the division tertiary (optional)
//    /*  colors[3] is the overlay
//    /*  colors[4] is the symbol
//    /*
//    /* ************************************************************* */
//    function select_5_colors(){
//        var colors=Array();
//        while (colors.length < 5){
//            var newcolor=random_color();
//            if (colors.indexOf(newcolor)== -1){
//                colors.push(newcolor);
//            }
//        }
//        return colors;
//    }
//    
//    // yes, a single letter function. it stands for dice, as in "roll a d20"
//    // the only difference is this one rolls 0-19 rather than 1-20, but
//    // since it's only really used against arrays that's ok.
//    function d(num){
//        return Math.floor ( Math.random() * num ) ;
//    }
//    
