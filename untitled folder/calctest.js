
function weightedgrade() 
{
  
    var temptable = document.getElementById("tableofgrades");
    
    
    var tempgrade= 0;
    var temwg = 0;
    var weightedresults = 0;
    var checkweight= 0;

    for (var i = 1; i<temptable.rows.length; i++)
    {
        var newcellvalue= document.getElementById(`calcpercentage${i}`).innerHTML
        var tempweight= document.getElementById(`gradeweight${i}`).value;
        var row= temptable.rows[i];
        
        
        console.log(tempweight);            
        if (newcellvalue!="" && tempweight )
        {
            tempweight=parseFloat(tempweight);
            newcellvalue=parseFloat(newcellvalue);
            checkweight= checkweight+tempweight;
            temwg= (tempweight/100)*newcellvalue;
            weightedresults= weightedresults +temwg;
        }

    
    }
    console.log(checkweight); 
    if (checkweight>100){alert("The total weight can not be over 100 percent. Please re-enter the weight and check again.")}
    
    else{
    var numcheck = parseFloat(weightedresults).toFixed(2);
    document.getElementById(`results`).innerHTML = numcheck;
    }

}
function meangrade() 
{
    
    var temptable = document.getElementById("tableofgrades");
    
    var numberofgrades=0;
    var total=0;
    //iterate through rows.
    // and gets the value of the percent.
    

    for (var i = 1; i<temptable.rows.length; i++)
    {
        var newcellvalue= document.getElementById(`calcpercentage${i}`).innerHTML

        if (newcellvalue!="")
        {
            numberofgrades++;
            total= total+parseFloat(newcellvalue);
        }
       
        
    }  

    var mean= total/numberofgrades;

    if (mean>100)
    {
       alert("Please eneter correct number of grades");
    }

    else
    {
        document.getElementById(`results`).innerHTML = mean;
    }


}




function insert_Row()
{

var newtable=document.getElementById('tableofgrades')
var newrow= newtable.insertRow(-1);

var cell1 = newrow.insertCell(0);
var cell2 = newrow.insertCell(1);
var cell3 = newrow.insertCell(2);
var cell4 = newrow.insertCell(3);
var cell5 = newrow.insertCell(4); 
cell1.innerHTML="Activity "+newrow.rowIndex;
cell2.innerHTML="A"+newrow.rowIndex;
cell3.innerHTML=`<input type="text" inputmode=”numeric” id="gradeweight${newrow.rowIndex}" required minlength="0" maxlength="3" size="3" min="0" max="100" ">`;
cell4.innerHTML=`<input type="text" inputmode=”numeric” id="gradegotten${newrow.rowIndex}" onkeyup="percentcalc(${newrow.rowIndex})" required minlength="0" size="3">/<input type="text" inputmode=”numeric” id="graderecieved${newrow.rowIndex}" onkeyup="percentcalc(${newrow.rowIndex})" required minlength="0" size="3" >`;
cell5.innerHTML= `<div id="calcpercentage${newrow.rowIndex}"></div>`;

}

function percentcalc(row) 
{
  var num1 = parseFloat(document.getElementById(`gradegotten${row}`).value, 10);
  var num2 = parseFloat(document.getElementById(`graderecieved${row}`).value, 10);
  if (num1>num2) 
    {
        alert("please eneter you correct marks. the grade received is larger than the available marks")
    }

  else{
    
    
    var percnum= num1 / num2 * 100;
    var numcheck = parseFloat(percnum).toFixed(2);
    document.getElementById(`calcpercentage${row}`).innerHTML = numcheck;

  }
}

