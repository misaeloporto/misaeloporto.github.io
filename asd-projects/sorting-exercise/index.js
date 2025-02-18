/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
//sorts the array from smallest to largest 
async function bubbleSort(array){
    for(let i = 0; i < array.length-1; i++){//runs through the array 
        for(let j = array.length-1; j > 1;j--){//respsonsable for the actual sorting. also stars fromt the end of the array.
            if(array[j].value < array[j - 1].value){//if current index is less then the previous element then it swaps the bigger elemet to the end of the array.
                swap(array,j, j - 1);//swaps the value in the array
                updateCounter(bubbleCounter);//updates the counter so we can see how many swaps are actually happening
                await sleep();//paueses the program for a second so we can see what is happening
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    if(right - left < 0){//base case to stop an infinte call checks to see in the difference between left and right is less than 0
        return;
    }
    
    var indexx = await partition(array, left, right)
    if(left < indexx - 1){
        await quickSort(array , left, indexx -1)
    }
    if(right > indexx){
        await quickSort(array , indexx, right)
    }
}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    let pivot = array[Math.floor((right + left) / 2)].value;// creates a variable, pivot that selectes the middle index by dividing it by 2 and rounding using math floor
    while(left < right){//sets the condition for when do the inner for loops
        while(array[left].value < pivot){//chekcs if the value of the array[left] is less then pivot
            left++;//adds 1 to left if the above statement is true
        }
        while(array[right].value > pivot){// checks to see if array[right] is greater then pivot
            right--;//subtracts 1 to right if the avove statement is true
        }
        if(left < right){
            swap(array, left, right);
            updateCounter(quickCounter);
            await sleep();
        }
    }




    return left + 1;
}

// TODO 1: Implement swap
function swap(array, i, j){
    var tempp = array[i];//creates a variable to hold the value of array[i] 
    array[i]= array[j]// swaps array[j] with array[i]
    array[j] = tempp//stores tempp or the original i with array[j]
    drawSwap(array , i, j);//visually shows the swap instaed os showing it intantly
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}