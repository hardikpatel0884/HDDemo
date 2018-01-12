let arr={};

getString=(str)=>{
    let len=str.length;
    for(var i=0;i<len;i++){
        arr[str.substr(i,1)]=Math.pow(2,i);
    }

    console.log(arr);
}

sum=(str)=>{
    var tmp=0;
    for(var i=0;i<str.length;i++){
        tmp+=arr[str.substr(i,1)];
    }
    return tmp;
}

sub=(val1,val2)=>{
    if(val1>val2){
        return val1-val2;
    }else{"not possible"}
}

convertString=(st)=>{
    var s="";
    for(var a=0;a<st.length;a++){
        s+=arr.findIndex()
    }
}

getString("abcd");

var sum1=sum("abbc");
var sum2=sum("ab");

var subt=sub(sum1,sum2)
var st=convertString(subt);


console.log(`sub of ${sum1} and ${sum2} = ${sub(sum1,sum2)}`)

