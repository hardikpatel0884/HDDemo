var arrFriend=[];
var arrExpanseName=[];
var userExpanse=[];
var userSpend=[];
var userBalanse=[];
var spen=[];
var exp=[];
var arrResult=[];

// check textbox is empty or not
friendEnterCheck=(txt)=>{
    if(txt.value.length>0){
        document.getElementById('btnFriendAdd').style.visibility='visible';
    }else{
        document.getElementById('btnFriendAdd').style.visibility='hidden';
    }
};

// add new friend
addFriend=(friendName)=>{
    // check name is exist or not
    if(arrFriend.indexOf(friendName)<0){
        // add name
        arrFriend.push(friendName);
        userExpanse.push(friendName);
        userSpend.push(friendName);
        userBalanse.push(friendName);
        document.getElementById('txtFriendAdd').value='';
        document.getElementById('btnFriendAdd').style.visibility='hidden';
        console.log(arrFriend);
    }else{
        // alert
        alert('please try another name(to identify) this name is exist')
    }
};

// generate expanse form
generateExpanseForm=()=>{

    // check member list
    if(arrFriend.length>0){
        var formHtml="<br><input type='text' placeholder='expanse Name' id='txtExpanseName'/> &nbsp; <input type='number' min='1' placeholder='expanse amount' id='txtExpanseAmount'/> <br><br><table>";
        for(var i=0;i<arrFriend.length;i++){
            formHtml+=`<tr><td>${arrFriend[i]}:</td> <td>Join:<input type='checkbox' id='cbJ${arrFriend[i]}' value='name'/></td> &nbsp; <td>Spend:<input type='checkbox' id='cbS${arrFriend[i]}' value='name'/></td> &nbsp; <td><input type='text' placeholder='amount' id='txtAmount${arrFriend[i]}'/></td></tr> `
        }
        formHtml+="</table> <button onclick='addExpanse()'>Add Expanse</button>";
        document.getElementById('divAddExpanse').innerHTML=formHtml;
    }else{
        alert('add member first')
    }
};

addExpanse=()=>{
    var expanseName=document.getElementById('txtExpanseName').value;
    var expanseAmount=document.getElementById('txtExpanseAmount').value;
    var totalJoinUser=0;
    var join=[];
    var totalUserE=0;
    if(expanseName.length>0 && expanseAmount>0){
        if(arrExpanseName[expanseName]===undefined){
            // add user expanse detail
            for(var user=0;user<arrFriend.length;user++){
                var userName=arrFriend[user];
                var cbSId="cbS"+userName;
                var cbJId="cbJ"+userName;
                let txtA="txtAmount"+userName;

                if(document.getElementById(cbJId).checked){
                    totalJoinUser++;
                    join.push(arrFriend[user]);
                }
                if(document.getElementById(cbSId).checked){
                    var amo=document.getElementById(txtA).value;
                    if(amo>0){
                        var tmp=userSpend[userName];
                        if(tmp===undefined){
                            userSpend[userName]=amo;
                        }else{
                            userSpend[userName]= Number(tmp)+Number(amo);//tmp+amo;
                        }
                        console.log(userSpend);
                    }else{
                        alert('member must have to spend expanse more then 0rs');
                    }
                }
            }
            var amo=expanseAmount/totalJoinUser;
            for(var i=0;i<arrFriend.length;i++){
                let userName=arrFriend[i];
                let cbJId="cbJ"+userName;
                if(document.getElementById(cbJId).checked){
                    let exp=userExpanse[userName];
                    if(exp===undefined){
                        userExpanse[userName]=amo;
                    }else{
                        userExpanse[userName]=Number(amo)+Number(exp);
                    }
                }
            }


            //arrExpanseName[expanseName]=expanseAmount;
            //console.log(arrExpanseName);
        }else{
            alert('please try another name(to identify) this expanse is exist')
        }
    }else{
        alert('enter valid expanse data')
    }
    console.log(userExpanse);
    console.log(userSpend);
};

manageExpanse=()=>{
    for(var i=0;i<arrFriend.length;i++){
        var user=arrFriend[i];
        if(userSpend[user]===undefined){
            userSpend[user]=0;
        }
        if(userExpanse[user]===undefined){
            userExpanse[user]=0;
        }
        console.log(user);
        userBalanse[user]=Number(userSpend[user])-Number(userExpanse[user]);
        if(userBalanse[user]<0){
            exp[user]=Math.abs(userBalanse[user]);
            // exp[user].push(Math.abs(userBalanse[user]));
        }else{
            spen[user]=userBalanse[user]
            // spen[user].push(userBalanse[user]);
        }
    }


    /** counting balance */
    console.log(userBalanse);
    console.log('manage',userBalanse.length);
    console.log('exp',exp.length+ " "+exp );
    console.log('spen',spen.length+ " "+spen );
    console.log(spen);
    console.log(exp);
    console.log("start counting message");
    console.log(spen.length);

    for(var i=0;i<arrFriend.length;i++){
        var name=userBalanse[i];
        var amount=userBalanse[name];
        console.log(name+" "+amount);
        if(amount>0){
            getData(name,amount,i);
            // for(var j=i+1;j<arrFriend.length;j++){
            //     var nm=userBalanse[j];
            //     var amt=userBalanse[nm];
            //     //arrResult.clear();// clean array
            //     var msg="<br><br>";
            //     if(amt<0){
            //         var tmp=0;
            //         amt=Math.abs(amt);
            //         if(amount<amt){
            //             console.log(`${name} have to collect ${amount} from ${nm}`);
            //             arrResult.push(`${name} have to collect ${amount} from ${nm} <br>`);
            //             userBalanse[name]=0;
            //             tmp=amt-amount;
            //             userBalanse[nm]=tmp;
            //         }else if(amount>amt){
            //             console.log(`${name} have to collect ${amt} from ${nm}`);
            //             arrResult.push(`${name} have to collect ${amt} from ${nm} <br>`);
            //             userBalanse[nm]=0;
            //             tmp=amount-amt;
            //             userBalanse[name]=tmp;
            //         }else{
            //             console.log(`${name} have to collect ${amt} from ${nm}`);
            //             arrResult.push(msg=`${name} have to collect ${amt} from ${nm} <br>`);
            //             userBalanse[nm]=0;
            //             userBalanse[name]=0;
            //         }
            //     }
            // }
        }
    }

    // print result
    console.log("result data ",arrResult.length);
    var msg="";
    for(let r=0;r<arrResult.length;r++){
        msg+=arrResult[r];
        console.log(arrResult[r]);
    }
    document.getElementById('result').innerHTML=msg;

};

getResult=()=>{
    manageExpanse();

};

getData=(name,amount,i)=>{
    // for(var j=0;j<arrFriend.length;j++){
    //     var nm=userBalanse[j];
    //     var amt=userBalanse[nm];
    //     //arrResult.clear();// clean array
    //     var msg="<br><br>";
    //     if(amt<0){
    //         var tmp=0;
    //         if(amount<amt){
    //             console.log(`${name} have to collect ${amount} from ${nm}`);
    //             arrResult.push(`${name} have to collect ${amount} from ${nm} <br>`);
    //             userBalanse[name]=0;
    //             tmp=amt-amount;
    //             userBalanse[nm]=tmp;
    //             return;
    //         }else if(amount>amt){
    //             console.log(`${name} have to collect ${amt} from ${nm}`);
    //             arrResult.push(`${name} have to collect ${amt} from ${nm} <br>`);
    //             userBalanse[nm]=0;
    //             tmp=amount+amt;
    //             userBalanse[name]=tmp;
    //             return;
    //         }else{
    //             console.log(`${name} have to collect ${amt} from ${nm}`);
    //             arrResult.push(msg=`${name} have to collect ${amt} from ${nm} <br>`);
    //             userBalanse[nm]=0;
    //             userBalanse[name]=0;
    //             return;
    //         }
    //     }
    // }

    for(var j=i+1;j<arrFriend.length;j++){
        var nm=userBalanse[j];
        var amt=userBalanse[nm];
        //arrResult.clear();// clean array
        var msg="<br><br>";
        if(amt<0){
            var tmp=0;
            amt=Math.abs(amt);
            if(amount<amt){
                console.log(`${name} have to collect ${amount} from ${nm}`);
                arrResult.push(`${name} have to collect ${amount} from ${nm} <br>`);
                userBalanse[name]=0;
                tmp=amt-amount;
                console.log("tmp amopunt 21 : ",tmp);
                userBalanse[nm]=(tmp-tmp-tmp);
                return;
            }else if(amount>amt){
                console.log(`${name} have to collect ${amt} from ${nm}`);
                arrResult.push(`${name} have to collect ${amt} from ${nm} <br>`);
                userBalanse[nm]=0;
                tmp=amount-amt;
                userBalanse[name]=tmp;
            }else{
                console.log(`${name} have to collect ${amt} from ${nm}`);
                arrResult.push(msg=`${name} have to collect ${amt} from ${nm} <br>`);
                userBalanse[nm]=0;
                userBalanse[name]=0;
                return;
            }
        }
    }
    console.log("fails")
    return;
};
