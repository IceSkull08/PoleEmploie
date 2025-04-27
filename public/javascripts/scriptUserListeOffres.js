var index_actif=-1;
var previousItem=null;

function test(index){
    console.log("test");
    index_actif=index
    // alert("test"+index+"ia="+index_actif+"offres="+result)
    // alert("test"+index)
    if (previousItem){
        previousItem.hidden=true;
    }
    item=document.getElementById(index)
    previousItem=item;
    item.hidden=false;
    // console.log(item)
};

function postuler(){
    console.log("test postuler");
}

// test();